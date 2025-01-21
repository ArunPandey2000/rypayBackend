import { KitNumber } from 'src/core/entities/kit-number.entity';
import { Repository } from 'typeorm';
import { CreateKitNumbersDto } from '../dto/kit-number.dto';
export declare class KitNumberService {
    private readonly kitNumberRepository;
    private logger;
    constructor(kitNumberRepository: Repository<KitNumber>);
    populateKitNumbersFromCSV(fileBuffer: Buffer): Promise<void>;
    populateKitNumbersFromJSON(kitNumbers: {
        kitNumber: string;
        lastFourDigits: string;
    }[]): Promise<void>;
    create(createKitNumberDto: CreateKitNumbersDto): Promise<KitNumber>;
    findAll(): Promise<KitNumber[]>;
    findOne(id: string): Promise<KitNumber>;
}
