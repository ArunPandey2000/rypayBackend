export interface FetchBillRequestPayload {
    bbpsId: string;
    mobile: string;
    customerMobile: string;
    opvalue1: string;
    transType: 'billFetch';
    urid: string;
}
