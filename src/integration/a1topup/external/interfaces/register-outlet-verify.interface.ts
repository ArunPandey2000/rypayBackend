export interface RegisterOutletOtpRequestModel {
    outletMobile: string;
    aadhaarNumber: string;
    otp: string;
    latitude: string;
    longitude: string;
  }

  interface OutletData {
    status: string;  // OTP verification status, e.g., 'SUCCESS'
  }
  
export interface OtpVerificationResponse {
    orderId: string;        // Order ID generated by the API
    status: string;         // Status of the verification (e.g., 'SUCCESS')
    outletData: OutletData; // Outlet-related data
    resText: string;        // Response text (e.g., 'Otp successfully verified')
    pointUsed: string;      // Points used in the transaction (if applicable)
    resCode: string;        // Response code (e.g., '200')
  }
  