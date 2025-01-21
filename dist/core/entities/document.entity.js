"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDocument = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserDocument = class UserDocument {
    addCreatedDate() {
        this.createdDate = new Date();
    }
};
exports.UserDocument = UserDocument;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], UserDocument.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_type', type: 'varchar' }),
    __metadata("design:type", String)
], UserDocument.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_path', type: 'varchar' }),
    __metadata("design:type", String)
], UserDocument.prototype, "documentUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text' }),
    __metadata("design:type", String)
], UserDocument.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'created_date',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], UserDocument.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.documents),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserDocument.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserDocument.prototype, "addCreatedDate", null);
exports.UserDocument = UserDocument = __decorate([
    (0, typeorm_1.Entity)({ name: 'user_doc_record' })
], UserDocument);
//# sourceMappingURL=document.entity.js.map