export interface AEPSMiniStatementRequestModel {
    operatorId: string;      // Operator ID (e.g., '742')
    amount: string;          // Amount (e.g., '0')
    mobile: string;          // Mobile number of the customer
    urid: string;            // Unique reference ID
    outletMobile: string;    // Mobile number of the outlet
    deviceResponse: string;  // Device response (e.g., encrypted data or base64)
    bankId: string;          // Bank ID (e.g., '607094')
    aadhaarNumber: string;   // Aadhaar number of the customer
    customerMobile: string;  // Customer mobile number
    latitude: string;        // Latitude of the location
    longitude: string;       // Longitude of the location
  }
  
export interface AEPSMiniStatementResponseModel {
    orderId: string;          // Unique order ID returned by the API (e.g., '2406122020xxxxxx')
    status: string;           // Status of the request (e.g., 'PENDING')
    mobile: string;           // Mobile number (e.g., 'xxxxxx')
    amount: string;           // Amount associated with the request (e.g., '0')
    transId: string;          // Transaction ID (if any, otherwise an empty string)
    resCode: string;          // Response code (if any, otherwise an empty string)
    p2pBuyerBal: string;      // Peer-to-peer buyer balance (e.g., 'xxxxx.75')
    p2aBuyerBal: string;      // Peer-to-agent buyer balance (e.g., 'xxxxxx.33')
    totalBuyerBal: string;    // Total buyer balance (e.g., 'xxxx.08')
    creditUsed: string;       // Credit used (e.g., '0')
    beneficiaryName: string;  // Beneficiary name (if applicable, otherwise an empty string)
    resText: string;          // Response text (e.g., 'Transaction Pending', or an empty string)
  }
  
  