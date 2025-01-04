export declare const getFakeCardStatusResponse: () => {
    statusCode: string;
    status: string;
    data: {
        cardHolderId: string;
        name: string;
        nameOnCard: string;
        mobile: string;
        status: string;
        createdAt: string;
        kycStatus: {
            issuerCode: string;
            kycStatus: string;
            kycType: string;
        }[];
        card_details: {
            cardId: string;
            last_4_digit: string;
            cardMode: string;
            createdAt: string;
            status: string;
        };
        address: {
            addressType: string;
            status: string;
            address1: string;
            address2: string;
            landmark: any;
            city: string;
            countryISOCode: string;
            pincode: string;
            state: string;
        }[];
    };
};
