export interface AEPSWithdrawalRequestModel {
    operatorId: string;      // Operator ID (e.g., '741')
    amount: string;          // Amount for withdrawal (e.g., '1200')
    mobile: string;          // Mobile number of the customer
    urid: string;            // Unique reference ID
    outletMobile: string;    // Mobile number of the outlet
    agentAadhaar: string;    // Aadhaar number of the agent
    deviceResponse: string;  // Device response (base64 or encrypted response)
    bankId: string;          // Bank ID (e.g., '607094')
    aadhaarNumber: string;   // Aadhaar number of the customer
    customerMobile: string;  // Customer's mobile number
    latitude: string;        // Latitude of the location
    longitude: string;       // Longitude of the location
  }
  
  // Define the Response Model Interface for AEPS Withdrawal
export interface AEPSWithdrawalResponseModel {
    data: {
      orderId: string;           // Unique order ID returned by the API
      status: string;            // Status of the request (e.g., 'PENDING')
      mobile: string;            // Mobile number associated with the request
      amount: string;            // Amount for withdrawal
      transId: string;           // Transaction ID (if applicable)
      resCode: string;           // Response code (if available)
      p2pBuyerBal: string;       // Peer-to-peer buyer balance
      p2aBuyerBal: string;       // Peer-to-agent buyer balance
      totalBuyerBal: string;     // Total buyer balance
      creditUsed: string;        // Credit used
      beneficiaryName: string;   // Beneficiary name (if applicable)
      resText: string;           // Response text (additional info)
    };
  }