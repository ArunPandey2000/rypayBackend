import { ApiProperty } from "@nestjs/swagger";
import { IBillData } from "src/integration/a1topup/external/interfaces/fetch-bill-response.interface";

export class FetchBillResponse {
    @ApiProperty()
    billAmount: string;
    @ApiProperty()
    dueDate: string;
    @ApiProperty()
    remarks: string;
    @ApiProperty()
    customerName: string;
    @ApiProperty()
    billNumber: string;
    @ApiProperty()
    providerName: string;
    @ApiProperty()
    billPeriod: string;
    @ApiProperty()
    billName: string;
    @ApiProperty()
    message: string;
    constructor(billResponse: IBillData) {
        this.billAmount = billResponse.billAmount;
        this.billNumber = billResponse.billNumber;
        this.billPeriod = billResponse.billPeriod;
        this.customerName = billResponse.billName;
        this.remarks = billResponse.billRemark;
        this.dueDate = billResponse.dueDate;
        this.billName = billResponse.billName;
        this.providerName = billResponse.bbpsName;
        this.message = billResponse.resText;
    }
}