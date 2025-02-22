"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderIdLength = void 0;
class UpdateOrderIdLength {
    constructor() {
        this.name = 'UpdateOrderIdLength';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_id" TYPE VARCHAR(20)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_id" TYPE VARCHAR(10)`);
    }
}
exports.UpdateOrderIdLength = UpdateOrderIdLength;
//# sourceMappingURL=1740234114915-schema-update.js.map