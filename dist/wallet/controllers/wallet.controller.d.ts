import { AddMoneyToWalletDto, TransferMoneyDto } from '../dto/transfer-money.dto';
import { WalletService } from '../services/wallet.service';
import { Request, Response } from 'express';
export declare class WalletController {
    private walletService;
    constructor(walletService: WalletService);
    getWalletQr(req: any, res: Response): Promise<void>;
    getWalletDetailsByWalletId(walletId: string): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        id: number;
        balance: number;
        status: string;
        walletAccountNo: string;
    }>;
    getWalletDetailsByPhone(phoneNumber: string): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        id: number;
        balance: number;
        status: string;
        walletAccountNo: string;
    }>;
    getWallet(req: any): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        id: number;
        balance: number;
        status: string;
        walletAccountNo: string;
    }>;
    addMoneyToWallet(req: Request, fundMyAccountDto: AddMoneyToWalletDto): Promise<{
        transaction: import("../../core/entities/wallet.entity").Wallet;
    }>;
    transferToUserByPhone(req: Request, transferAccountDto: TransferMoneyDto): Promise<{
        message: string;
        isSuccess: boolean;
    }>;
    getDetails(req: Request): Promise<{
        data: {
            accountName: string;
            accountNumber: string;
        };
        message: string;
    }>;
}
