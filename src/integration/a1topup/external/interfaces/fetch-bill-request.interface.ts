export interface FetchBillRequestPayload {
    bbpsId: string,
    mobile: string, // pass account id
    customerMobile: string, // user mobile number 
    opvalue1: string, // user mobile number
    transType: 'billFetch',
    urid: string
}