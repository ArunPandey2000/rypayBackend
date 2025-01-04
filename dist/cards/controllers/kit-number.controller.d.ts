import { KitNumberService } from '../services/kit-number.service';
import { CreateKitNumbersDto } from '../dto/kit-number.dto';
import { KitNumber } from 'src/core/entities/kit-number.entity';
export declare class KitNumberController {
    private readonly kitNumberService;
    constructor(kitNumberService: KitNumberService);
    create(createKitNumberDto: CreateKitNumbersDto): Promise<KitNumber>;
    findAll(): Promise<KitNumber[]>;
    findOne(id: string): Promise<KitNumber>;
    uploadCSV(file: Express.Multer.File): Promise<{
        message: string;
    }>;
    uploadJSON(body: CreateKitNumbersDto[]): Promise<{
        message: string;
    }>;
}
