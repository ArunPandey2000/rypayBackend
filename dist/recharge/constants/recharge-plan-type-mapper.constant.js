"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gstMapper = void 0;
exports.getRechargeFullForm = getRechargeFullForm;
const recharge_metadata_constant_1 = require("./recharge-metadata.constant");
const RechargeTypeMapper = {
    SPL: "Special",
    DATA: "Data",
    RMG: "Roaming",
    TUP: "Top-Up",
    OTR: "Other",
    FTT: "Full Talk Time",
};
function getRechargeFullForm(type) {
    return RechargeTypeMapper[type] || type;
}
exports.gstMapper = {
    [recharge_metadata_constant_1.RechargeServiceTypes.Mobile]: 'P2P',
    [recharge_metadata_constant_1.RechargeServiceTypes.DTH]: 'P2P',
    [recharge_metadata_constant_1.RechargeServiceTypes.Electricity]: 'P2A'
};
//# sourceMappingURL=recharge-plan-type-mapper.constant.js.map