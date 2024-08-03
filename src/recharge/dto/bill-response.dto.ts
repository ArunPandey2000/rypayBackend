import { ApiProperty } from "@nestjs/swagger";
import { IFetchBillResponse } from "src/integration/a1topup/external/interfaces/fetch-bill-response.interface";

export class FetchBillResponse {
    @ApiProperty()
    provider: string
    @ApiProperty()
    message: string;
    @ApiProperty()
    dueAmount: string;
    @ApiProperty()
    dueDate: string;
    @ApiProperty()
    customerName: string;
    @ApiProperty()
    billNumber: string;
    @ApiProperty()
    billDate: string;
    @ApiProperty()
    billPeriod: string;
    @ApiProperty()
    refIid: string;
    @ApiProperty()
    service: string;
    constructor(billResponse: IFetchBillResponse) {
        this.provider = billResponse.provider;
        this.dueAmount = billResponse.due_amount;
        this.billNumber = billResponse.bill_number;
        this.billPeriod = billResponse.bill_period;
        this.billDate = billResponse.bill_date;
        this.customerName = billResponse.customer_name;
        this.refIid = billResponse.ref_id;
        this.service = billResponse.service;
        this.message = billResponse.message;
        this.dueDate = billResponse.bill_date;
    }
}