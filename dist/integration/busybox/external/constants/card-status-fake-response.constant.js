"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFakeCardStatusResponse = void 0;
const getFakeCardStatusResponse = () => ({
    "statusCode": "S0200",
    "status": "SUCCESS",
    "data": {
        "cardHolderId": "221117123231408ID1CUSTID9622353",
        "name": "Faruque Ahmed",
        "nameOnCard": "Faruque Ahmed",
        "mobile": "918638707921",
        "status": "ACTIVE",
        "createdAt": "2022-11-17T12:32:31.000+00:00",
        "kycStatus": [
            {
                "issuerCode": "YES",
                "kycStatus": "COMPLETED",
                "kycType": "AADHAAR_DOC"
            }
        ],
        "card_details": {
            "cardId": `221117123231461ID1CARD${Math.floor(Math.random() * 10000000)}`,
            "last_4_digit": "8116",
            "cardMode": "PHYSICAL_NO_NAMED_CARD",
            "createdAt": "2022-11-17T19:32:52.000+00:00",
            "status": "ACTIVE"
        },
        "address": [
            {
                "addressType": "DELIVERY_ADDRESS",
                "status": "PENDING",
                "address1": "Gangati, Sohai Kumarpur",
                "address2": "Deganga, N 24 Parganas",
                "landmark": null,
                "city": "Kolkata",
                "countryISOCode": "IND",
                "pincode": "743423",
                "state": "West Bengal"
            }
        ]
    }
});
exports.getFakeCardStatusResponse = getFakeCardStatusResponse;
//# sourceMappingURL=card-status-fake-response.constant.js.map