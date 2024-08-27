export const getFakeIssueCardResponse = () => ({
    "statusCode": "S0200",
    "status": "SUCCESS",
    "data": {
      "message": "Card creation is in progress",
      "cardHolderId": `221117123231408ID1CUSTID${Math.floor(Math.random() * 10000000)}`
    },
    "sessionId": "YES"
  });