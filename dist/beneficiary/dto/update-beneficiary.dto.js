"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBeneficiaryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_beneficiary_dto_1 = require("./create-beneficiary.dto");
class UpdateBeneficiaryDto extends (0, swagger_1.PartialType)(create_beneficiary_dto_1.CreateBeneficiaryDto) {
}
exports.UpdateBeneficiaryDto = UpdateBeneficiaryDto;
//# sourceMappingURL=update-beneficiary.dto.js.map