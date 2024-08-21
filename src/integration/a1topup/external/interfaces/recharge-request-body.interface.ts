
export interface IPrepaidOrDTHRechargeRequest extends IBaseRechargeRequest {
  operatorId: string;
}

export interface IElectricityRechargeRequest extends IBaseRechargeRequest {
  bbpsId: string;
  opValue1: string; // pass customer mobile number
}

export interface IBaseRechargeRequest {
  urid: string;
  mobile: string;
  amount: number;
}

export type RechargeRequest = IPrepaidOrDTHRechargeRequest | IElectricityRechargeRequest;
