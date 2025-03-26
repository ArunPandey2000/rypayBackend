import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus, OrderType } from 'src/core/entities/order.entity';
import { TransactionStatus } from 'src/core/entities/transactions.entity';
import { User } from 'src/core/entities/user.entity';
import { generateRef } from 'src/core/utils/hash.util';
import { PaymentGatewayDescription } from 'src/integration/busybox/external/constants/external.constant';
import { WalletService } from 'src/wallet/services/wallet.service';
import { Repository } from 'typeorm';
import { PaymentRequestDto } from '../dto/payment-request.dto';
import { WebhookPaymentRequestDto } from '../dto/webhook-payload.dto';
import { BusyBoxWebhookResponse, Webhook_Type } from 'src/core/entities/busybox_webhook_logs.entity';
@Injectable()
export class PaymentExternalService {
    private readonly logger: Logger;
    constructor(
        private walletService: WalletService,
        @InjectRepository(BusyBoxWebhookResponse) private webHookRepo: Repository<BusyBoxWebhookResponse>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(User) private userRepository: Repository<User>

    ) {
       this.logger =  new Logger(PaymentExternalService.name)
    }

    async handlePaymentCallback(requestDto: WebhookPaymentRequestDto) {

        const webHookResponse = this.webHookRepo.create(<BusyBoxWebhookResponse>{
            type: Webhook_Type.QRPayment,
            additionalData: requestDto as any
        })
        await this.webHookRepo.save(webHookResponse);
        const serviceUsed = 'PaymentGateway';

        const orderId = requestDto.data.orderId;
        const order = await this.orderRepository.findOne({where: {order_id: orderId}, relations: ['user']});
        if(!order) {
            throw new BadRequestException('order not found');
        }
        const amount = Number.parseFloat(requestDto.data.amount);
        if (requestDto.txnStatus === 'SUCCESS') {
            const user = order.user;
            await this.walletService.processPaymentGatewaySuccess({amount: amount,
                receiverId: user.id,
                serviceUsed: serviceUsed,
                description: PaymentGatewayDescription,
                status: TransactionStatus.SUCCESS,
                reference: orderId }, user.id);
            order.status = OrderStatus.SUCCESS;
            order.transaction_id = requestDto.data.UTR;
        } else {
            order.status = OrderStatus.FAILED
        }
        await this.orderRepository.save(order);

        return {
            referenceId: orderId,
            amount: amount,
            message: PaymentGatewayDescription
        }
    }

    async createPaymentRequestOrder(userId: string, payload: PaymentRequestDto){
        const user = await this.userRepository.findOne({where: {id: userId}});
        if (!user) {
            throw new UnauthorizedException('user does not have enough permission');
        }
        const description = payload.message ? payload.message : PaymentGatewayDescription;
        const orderId = generateRef(12);
        const order = {
            order_id: orderId,
            order_type: OrderType.PAYMENT_GATEWAY,
            gateway_response: '',
            amount: payload.amount,
            status: OrderStatus.PENDING,
            transaction_id: '',
            user: user,
            description: description,
            payment_method: '',
            paymentMode: 'UPI',
            charges: 0,
            respectiveUserName: `${user.firstName} ${user.lastName}`,
            ifscNumber: "",
            accountId: ""
        }
        const SavedOrder = this.orderRepository.create(order);
        await this.orderRepository.save(SavedOrder);
        return {
            referenceId: SavedOrder.order_id,
            amount: payload.amount,
            message: description
        }
    }
}
