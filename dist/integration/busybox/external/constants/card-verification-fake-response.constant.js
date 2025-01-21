"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFakeCardVerificationResponse = void 0;
const getFakeCardVerificationResponse = () => ({
    "statusCode": "S0200",
    "message": "Registration Verified Successfully",
    "data": {
        "mobileNumber": "918638707921",
        "name": "Faruque Ahmed",
        "code": "M09",
        "fullKYCCompleted": false,
        "kycCompleted": false,
        "docUploaded": true
    }
});
exports.getFakeCardVerificationResponse = getFakeCardVerificationResponse;
//# sourceMappingURL=card-verification-fake-response.constant.js.map