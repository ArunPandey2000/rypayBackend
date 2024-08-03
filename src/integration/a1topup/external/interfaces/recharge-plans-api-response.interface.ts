export interface IRechargePlanApiResponse {
    success: boolean;
    hit_credit: string;
    api_started: string;
    api_expiry: string;
    operator: string;
    circle: string;
    message: string;
    plans: Record<string, Plan[]>;
  }
  
export interface Plan {
    rs: number;
    validity: string;
    desc: string;
    Type: string;
  }
  