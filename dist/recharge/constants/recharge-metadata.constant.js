"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentRechargeSupported = exports.RechargeServiceTypes = void 0;
exports.RechargeServiceTypes = {
    Mobile: "prepaidMobileRecharge",
    DTH: "dthRecharge",
    Landline: 'bbpsLandlinePostpaid',
    PostPaid: "bbpsPostpaidMobileRecharge",
    Electricity: "bbpsElectricity",
    Insuarance: 'bbpsInsurance',
    Water: 'bbpsWater',
    BroadBandPostPaid: 'bbpsBroadbandPostpaid',
    Gas: "bbpsGasBillPayment"
};
exports.currentRechargeSupported = [exports.RechargeServiceTypes.Mobile, exports.RechargeServiceTypes.DTH, exports.RechargeServiceTypes.Electricity];
//# sourceMappingURL=recharge-metadata.constant.js.map