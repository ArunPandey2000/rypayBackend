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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var KitNumberService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KitNumberService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const csvParser = require("csv-parser");
const kit_number_entity_1 = require("../../core/entities/kit-number.entity");
const stream = require("stream");
const typeorm_2 = require("typeorm");
let KitNumberService = KitNumberService_1 = class KitNumberService {
    constructor(kitNumberRepository) {
        this.kitNumberRepository = kitNumberRepository;
        this.logger = new common_1.Logger(KitNumberService_1.name);
    }
    async populateKitNumbersFromCSV(fileBuffer) {
        const kitNumbers = [];
        const readableStream = new stream.PassThrough();
        readableStream.end(fileBuffer);
        readableStream
            .pipe(csvParser())
            .on('data', (row) => {
            kitNumbers.push({ kitNumber: row.kitNumber, lastFourDigits: row.lastFourDigits });
        })
            .on('end', async () => {
            this.populateKitNumbersFromJSON(kitNumbers);
        });
    }
    async populateKitNumbersFromJSON(kitNumbers) {
        for (const kitNumber of kitNumbers) {
            const existingKitNumber = await this.findOne(kitNumber.kitNumber);
            if (!existingKitNumber) {
                await this.kitNumberRepository.save(kitNumber);
            }
            else {
                this.logger.log(`kit Number already exists: ${kitNumber.kitNumber}`);
            }
        }
    }
    async create(createKitNumberDto) {
        const kitNumber = this.kitNumberRepository.create(createKitNumberDto);
        return this.kitNumberRepository.save(kitNumber);
    }
    async findAll() {
        return this.kitNumberRepository.find();
    }
    async findOne(id) {
        return this.kitNumberRepository.findOne({
            where: {
                kitNumber: id
            }
        });
    }
};
exports.KitNumberService = KitNumberService;
exports.KitNumberService = KitNumberService = KitNumberService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(kit_number_entity_1.KitNumber)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], KitNumberService);
//# sourceMappingURL=kit-number.service.js.map