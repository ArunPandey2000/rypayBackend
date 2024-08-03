export interface IMobileProviderResponse {
    success: boolean;
    hit_credit: string;
    api_started: string;
    api_expiry: string;
    message: string;
    details: {
      operator: string;
      Circle: string;
    };
  }