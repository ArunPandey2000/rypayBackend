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
exports.PlanLimit = void 0;
const typeorm_1 = require("typeorm");
const plans_entity_1 = require("./plans.entity");
let PlanLimit = class PlanLimit {
};
exports.PlanLimit = PlanLimit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PlanLimit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plans_entity_1.Plan, (plan) => plan.limits, { onDelete: 'CASCADE' }),
    __metadata("design:type", plans_entity_1.Plan)
], PlanLimit.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], PlanLimit.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true, transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value),
        } }),
    __metadata("design:type", Number)
], PlanLimit.prototype, "perTransactionLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value),
        } }),
    __metadata("design:type", Number)
], PlanLimit.prototype, "dailyLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value),
        } }),
    __metadata("design:type", Number)
], PlanLimit.prototype, "monthlyLimit", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], PlanLimit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], PlanLimit.prototype, "updatedAt", void 0);
exports.PlanLimit = PlanLimit = __decorate([
    (0, typeorm_1.Entity)('plan_limits')
], PlanLimit);
//# sourceMappingURL=plan-limit.entity.js.map