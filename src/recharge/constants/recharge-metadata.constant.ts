export const RechargeServiceTypes = {
    Mobile: "prepaidMobileRecharge",
    DTH: "dthRecharge",
    Landline: 'bbpsLandlinePostpaid',
    PostPaid: "bbpsPostpaidMobileRecharge",
    Electricity: "bbpsElectricity",
    Insuarance: 'bbpsInsurance',
    Water: 'bbpsWater',
    BroadBandPostPaid: 'bbpsBroadbandPostpaid',
    Gas: "bbpsGasBillPayment"
}

export const currentRechargeSupported = [RechargeServiceTypes.Mobile, RechargeServiceTypes.DTH, RechargeServiceTypes.Electricity]
  