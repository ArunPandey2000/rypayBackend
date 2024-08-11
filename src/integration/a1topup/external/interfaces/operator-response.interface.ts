  export interface IOperatorApiResponse{
    status: "SUCCESS" | "FAILED"
    operatorList: IOperatorInfo[]
    resText: string
  }
  export interface ICircleApiResponse{
    status: "SUCCESS" | "FAILED"
    stateList: ICircleCode[]
    resText: string
  }
  
  export interface IOperatorInfo {
    name: string
    operatorId: string
    gstMode: string;
    serviceType: string;
  }

  export interface ICircleCode {
    name: string;
    stateId: string;
  }
  