"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFakeIssueCardResponse = void 0;
const getFakeIssueCardResponse = () => ({
    "statusCode": "S0200",
    "status": "SUCCESS",
    "data": {
        "message": "Card creation is in progress",
        "cardHolderId": `221117123231408ID1CUSTID${Math.floor(Math.random() * 10000000)}`
    },
    "sessionId": "YES"
});
exports.getFakeIssueCardResponse = getFakeIssueCardResponse;
//# sourceMappingURL=issue-card-fake-response.constant.js.map