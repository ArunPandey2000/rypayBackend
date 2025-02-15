export interface OutletLoginRequestModel {
    outletMobile: string;       // Mobile number of the outlet
    agentAadhaar: string;       // Aadhaar number of the agent
    latitude: string;           // Latitude of the outlet
    longitude: string;          // Longitude of the outlet
    authType: string;           // Authentication type, e.g., 'LOGIN'
    deviceResponse: string;     // Device response (e.g., encrypted data or some form of authentication response)
  }
  
  // Example Response Model Interface for Outlet Login
export interface OutletLoginResponseModel {
    orderId: string;            // The order ID returned by the API
    status: string;             // Status of the request (e.g., 'SUCCESS')
    outletData: {
      status: string;           // Outlet-specific status (e.g., 'SUCCESS')
      transSessionId: string;   // Transaction session ID (can be empty if not provided)
    };
    resText: string;            // Response text (e.g., 'Login Successful')
    pointUsed: string;          // Points used in the transaction (if applicable)
    resCode: string;            // Response code (e.g., '200')
}