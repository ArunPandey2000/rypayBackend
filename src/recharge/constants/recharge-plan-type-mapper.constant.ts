import { RechargeServiceTypes } from "./recharge-metadata.constant";

const RechargeTypeMapper: { [key: string]: string } = {
    SPL: "Special",
    DATA: "Data",
    RMG: "Roaming",
    TUP: "Top-Up",
    OTR: "Other",
    FTT: "Full Talk Time",
  };
  
  export function getRechargeFullForm(type: string): string {
    return RechargeTypeMapper[type] || type;
  }

export const gstMapper: { [key: string]: string } =  {
    [RechargeServiceTypes.Mobile]: 'P2P',
    [RechargeServiceTypes.DTH]: 'P2P',
    [RechargeServiceTypes.Electricity]: 'P2A'
}