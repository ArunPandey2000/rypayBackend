"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentExternalClientService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment-timezone");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let PaymentExternalClientService = class PaymentExternalClientService {
    constructor(httpService) {
        this.httpService = httpService;
        this.transactionApiUrl = ' https://api.upitranzact.com/v1/reseller/fetchTransactions';
        this.settlementApiUrl = 'https://api.upitranzact.com/v1/reseller/fetchSettlements';
        this.authHeader = '';
        const publicKey = process.env.RESELLER_PUBLIC_KEY;
        const privateKey = process.env.RESELLER_PRIVATE_KEY;
        this.authHeader = this.generateAuthHeader(publicKey, privateKey);
    }
    getPayloadBody(merchantId, startDate, endDate) {
        return {
            rid: process.env.RESELLER_ID,
            mid: merchantId,
            s_date: startDate,
            e_date: endDate,
        };
    }
    generateAuthHeader(publicKey, privateKey) {
        const credentials = `${publicKey}:${privateKey}`;
        const base64Credentials = Buffer.from(credentials).toString('base64');
        return `Basic ${base64Credentials}`;
    }
    async getMergedData(startDate, endDate, merchantId) {
        try {
            const todayIST = moment().tz('Asia/Kolkata').format('DD-MM-YYYY');
            const transactionRequest = this.httpService.post(this.transactionApiUrl, this.getPayloadBody(merchantId, todayIST, todayIST), {
                headers: { Authorization: this.authHeader, 'Content-Type': 'application/json' }
            }).pipe((0, rxjs_1.catchError)((error) => this.handleHttpError(error, 'transactions')));
            const settlementRequest = this.httpService.post(this.settlementApiUrl, this.getPayloadBody(merchantId, startDate, endDate), {
                headers: { Authorization: this.authHeader, 'Content-Type': 'application/json' }
            }).pipe((0, rxjs_1.catchError)((error) => this.handleHttpError(error, 'settlements')));
            const [transactionResponse, settlementResponse] = await Promise.all([
                (0, rxjs_1.firstValueFrom)(transactionRequest).catch(() => ({ data: { data: [] } })),
                (0, rxjs_1.firstValueFrom)(settlementRequest).catch(() => ({ data: { data: [] } }))
            ]);
            const transactions = transactionResponse?.data?.data || [];
            const settlements = settlementResponse?.data?.data || [];
            const todayTotalCollection = transactions.reduce((sum, t) => sum + t.amount, 0);
            const settlementHistory = settlements.map((settlement) => ({
                date: settlement.created_at,
                totalAmountSettled: parseFloat(settlement.amount),
                status: settlement.status,
                bankReferenceNumber: settlement.bankReferenceNumber,
                UTR: settlement.UTR,
            }))?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            return {
                todayTotalCollection,
                todayTotalPayments: transactions?.length,
                todayTotalSettlementForTomorrow: todayTotalCollection,
                settlementHistory,
            };
        }
        catch (error) {
            throw new Error(`Failed to fetch merged data: ${error.message}`);
        }
    }
    async getTransactionsData(startDate, endDate, merchantId) {
        try {
            const transactionRequest = this.httpService.post(this.transactionApiUrl, this.getPayloadBody(merchantId, startDate, endDate), {
                headers: { Authorization: this.authHeader, 'Content-Type': 'application/json' }
            }).pipe((0, rxjs_1.catchError)((error) => this.handleHttpError(error, 'transactions')));
            const transactionResponse = await (0, rxjs_1.firstValueFrom)(transactionRequest).catch(() => ({ data: { data: [] } }));
            const transactions = transactionResponse?.data?.data || [];
            const transactionHistory = transactions.map((transaction) => ({
                date: transaction.created_at,
                amount: parseFloat(transaction.amount),
                status: transaction.status,
                merchantId: transaction.merchant_id,
                payeeName: transaction.payerName,
                UTR: transaction.UTR,
            }));
            return transactionHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        catch (error) {
            throw new Error(`Failed to fetch transaction data: ${error.message}`);
        }
    }
    handleHttpError(error, source) {
        if (error.response && error.response.status === 404) {
            console.warn(`[Warning] ${source} API returned 404, treating as empty data.`);
            return [];
        }
        throw new common_1.HttpException(`Failed to fetch ${source}: ${error.message}`, error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
exports.PaymentExternalClientService = PaymentExternalClientService;
exports.PaymentExternalClientService = PaymentExternalClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], PaymentExternalClientService);
//# sourceMappingURL=payment-external-client.service.js.map