export interface TransactionResponse {
    order_id: string;
    operator_ref: string;
    status: string;
    number: string;
    amount: string;
    service: string;
    charged_amount: string;
    closing_balance: string;
    available_balance: string;
    pid: string;
    date: string;
}
export interface IRechargeData {
    orderId: string;
    status: string;
    mobile: string;
    amount: string;
    transId: string;
    resCode: string;
    p2pBuyerBal: string;
    p2aBuyerBal: string;
    creditUsed: string;
    resText: string;
}
export interface IRechargeResponse {
    data: IRechargeData;
}
