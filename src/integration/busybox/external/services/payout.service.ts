import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus, OrderType } from 'src/core/entities/order.entity';
import { TransactionStatus } from 'src/core/entities/transactions.entity';
import { User } from 'src/core/entities/user.entity';
import { generateRef, maskAccount } from 'src/core/utils/hash.util';
import { WalletService } from 'src/wallet/services/wallet.service';
import { Repository } from 'typeorm';
import { PayoutClientService } from '../../external-system-client/payout-client.service';
import { PayoutDescription } from '../constants/external.constant';
import { AccountPayoutPayload } from '../dto/payout-payload.dto';
import { IAccountPayoutRequestBody } from '../interfaces/payout/payout-request-body.interface';
import { VerifyAccountRequestDTO } from '../dto/verify-account-request.dto';
import { IVerifyAccountRequestDTO } from '../interfaces/validation/verify-account-request.interface';
import { VerifyAccountResponseDTO } from '../dto/verify-account-response.dto';
import { VerifyUpiRequestDTO } from '../dto/verify-upi-request.dto';
import { IVerifyUPIRequestDTO } from '../interfaces/validation/verify-upi-request.interface';
import { UPIPayoutPayload } from '../dto/upi-account-payload.dto';
import { IUPIPayoutRequestBody } from '../interfaces/payout/payout-upi-request-body.interface';
import { getIMPSCharges } from 'src/core/utils/payment.utils';

@Injectable()
export class PayoutService {
    private readonly logger: Logger
    constructor(
        private walletService: WalletService,
        private payloutClientService: PayoutClientService,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(User) private userRepository: Repository<User>,

    ) {
       this.logger =  new Logger(PayoutService.name)
    }

    async payoutAccount(userId: string, requestDto: AccountPayoutPayload) {
        debugger
        await this.validatePayout(userId, requestDto.amount);
        const requestBody: IAccountPayoutRequestBody = {
            account_number: requestDto.accountNumber,
            amount: requestDto.amount,
            ifsc_code: requestDto.ifsc,
            mobile: requestDto.mobile,
            mode: requestDto.mode
        }
        const response = (await this.payloutClientService.payoutUsingAccount(requestBody));

        if (response.status === 'FAILURE') {
            throw new BadRequestException(response.message)
        }
        const user = await this.userRepository.findOne({where: {id: userId}});
        const maskedAccount = maskAccount(requestBody.account_number);
        const description = requestDto.message ? requestDto.message : PayoutDescription.replace('{maskedAccount}', maskedAccount);
        const orderId = generateRef(6);
        const payoutCharges = requestDto.mode?.toLowerCase() === 'imps' ? getIMPSCharges(requestDto.amount) : 0;
        const order = {
            order_id: orderId,
            order_type: OrderType.PAYOUT,
            gateway_response: '',
            amount: requestDto.amount,
            status: OrderStatus.PENDING,
            transaction_id: response.stan?.toString(),
            user: user,
            description: description,
            payment_method: 'WALLET',
            paymentMode: requestDto.mode,
            charges: payoutCharges,
            respectiveUserName: requestDto.userName ?? "",
            ifscNumber: requestDto.ifsc,
            accountId: requestDto.accountNumber
        }
        const SavedOrder = this.orderRepository.create(order);
        this.orderRepository.save(SavedOrder);

        await this.walletService.processRechargePayment({amount: requestDto.amount,
             receiverId: requestDto.accountNumber,
             serviceUsed: 'Payout',
             charges: payoutCharges,
             description: description,
             status: TransactionStatus.PENDING,
             reference: orderId }, userId);

        return {
            referenceId: SavedOrder.order_id,
            amount: +response.amount,
            message: description
        }
    }

    async validatePayout(userId: string, amount: number) {
        const user = await this.userRepository.findOne({where: {id: userId}});
        const poolBalance = +(await this.payloutClientService.getPoolBalance()).balance;

        if (poolBalance < amount) {
            throw new BadRequestException('System Error');
        }
        if (!user) {
            throw new ForbiddenException('User does not exist')
        }
        const wallet = await this.walletService.getWallet({user: {id: userId}});
        if (wallet.balance < amount) {
            throw new BadRequestException('Insufficient Balance')
        }
    }

    async payoutUPI(userId: string, requestDto: UPIPayoutPayload) {
        await this.validatePayout(userId, requestDto.amount);
        const requestBody: IUPIPayoutRequestBody = {
            account_number: requestDto.upiId,
            amount: requestDto.amount,
            mobile: requestDto.mobile,
            mode: "UPI"
        }
        const response = (await this.payloutClientService.payoutUsingUPI(requestBody));

        if (response.status === 'FAILURE') {
            throw new BadRequestException(response.message)
        }
        const user = await this.userRepository.findOne({where: {id: userId}});
        const maskedAccount = maskAccount(requestBody.account_number);
        const description = requestDto.message ? requestDto.message : PayoutDescription.replace('{maskedAccount}', maskedAccount);
        const orderId = generateRef(6);
        const order = {
            order_id: orderId,
            order_type: OrderType.UPI_PAYOUT,
            gateway_response: '',
            amount: requestDto.amount,
            status: OrderStatus.PENDING,
            transaction_id: response.stan?.toString(),
            user: user,
            description: description,
            payment_method: 'WALLET',
            respectiveUserName: requestDto.upiUserName,
            ifscNumber: null,
            paymentMode: 'UPI',
            accountId: requestDto.upiId
        }
        const SavedOrder = this.orderRepository.create(order);
        this.orderRepository.save(SavedOrder);

        await this.walletService.processRechargePayment({amount: requestDto.amount,
             receiverId: requestDto.upiId,
             serviceUsed: 'UPI',
             description: description,
             status: TransactionStatus.PENDING,
             reference: orderId }, userId);

        return {
            referenceId: SavedOrder.order_id,
            amount: +response.amount,
            message: description
        }
    }

    async verifyAccount(verifyDto: VerifyAccountRequestDTO) {
        const payload: IVerifyAccountRequestDTO = {
            account_number: verifyDto.accountNumber,
            ifsc_code: verifyDto.ifscCode
        }
        const data = await this.payloutClientService.verifyAccount(payload)
        if (data.resp_code === "S0200") {
            return <VerifyAccountResponseDTO>{
                message: data.message,
                accountNumber: data.account_number,
                ifscCode: data.ifsc_code,
                nameInBank: data.NameInBank
            };
        }
        else if(data.resp_code === "E0404") {
            throw new NotFoundException(data.message);
        }
        throw new BadRequestException(data.message);
    }

    async verifyUpi(verifyDto: VerifyUpiRequestDTO) {
        const payload: IVerifyUPIRequestDTO = {
            upi_vpa: verifyDto.upiId
        }
        const data = await this.payloutClientService.verifyUpi(payload)
        if (data.resp_code === "S0200") {
            return <VerifyAccountResponseDTO>{
                message: data.message,
                accountNumber: data.account_number,
                ifscCode: data.ifsc_code,
                nameInBank: data.NameInBank
            };
        } else if(data.resp_code === "E0404") {
            throw new NotFoundException(data.message);
        }
        throw new BadRequestException(data.message);
    }
}
