export interface IRegisterOutletRequestPayload {
    token: string;              // Token for authentication
    outletMobile: string;       // Mobile number of the outlet
    aadhaarNumber: string;      // Aadhaar number of the shop owner
    pan: string;                // PAN of the shop owner
    shopName: string;           // Name of the shop
    shopAddress: string;        // Address of the shop
    shopPincode: string;        // Pincode of the shop's location
    email: string;              // Email address of the shop owner
    accountNumber: string;      // Bank account number
    ifscCode: string;           // IFSC code of the bank branch
    latitude: string;           // Latitude of the shop location
    longitude: string;          // Longitude of the shop location
  }
  