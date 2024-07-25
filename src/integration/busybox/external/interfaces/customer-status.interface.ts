export interface KycStatus {
  issuerCode: string;
  kycStatus: string;
  kycType: string;
}

export interface CardDetails {
  cardId: string;
  last_4_digit: string;
  cardMode: string;
  createdAt: string;
  status: string;
}

export interface Address {
  addressType: string;
  status: string;
  address1: string;
  address2: string;
  landmark: string | null;
  city: string;
  countryISOCode: string;
  pincode: string;
  state: string;
}

export interface CustomerStatusResponse {
  statusCode: string;
  status: string;
  data: {
    cardHolderId: string;
    name: string;
    nameOnCard: string;
    mobile: string;
    status: string;
    createdAt: string;
    kycStatus: KycStatus[];
    card_details: CardDetails;
    address: Address[];
  };
}
