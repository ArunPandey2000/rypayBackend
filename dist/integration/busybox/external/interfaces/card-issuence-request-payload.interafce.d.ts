interface IAddress {
    addressType: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    pincode: string;
}
interface CardIssuanceDto {
    orgId: string;
    customer_name: string;
    mobile_number: string;
    email: string;
    date_of_birth: string;
    gender: string;
    doc_name: string;
    doc_number: string;
    addresses: IAddress[];
}
