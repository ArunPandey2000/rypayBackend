  export interface IClientApiGenericResponse<T> {
    response: T;
  }
  
  export interface IOperatorInfo {
    operator_name: string;
    operator_id: string;
    service_type: string;
    status: string;
    bill_fetch: string;
    bbps_enabled: string;
    message: string;
    description: string;
    amount_minimum: string;
    amount_maximum: string;
  }

  export interface ICircleCode {
    circle_name: string;
    circle_code: string;
  }
  