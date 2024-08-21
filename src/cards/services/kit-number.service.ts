import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as csvParser from 'csv-parser';
import { KitNumber } from 'src/core/entities/kit-number.entity';
import * as stream from 'stream';
import { Repository } from 'typeorm';
import { CreateKitNumbersDto } from '../dto/kit-number.dto';

@Injectable()
export class KitNumberService {
    private logger: Logger;
  constructor(
    @InjectRepository(KitNumber)
    private readonly kitNumberRepository: Repository<KitNumber>
  ) {
    this.logger = new Logger(KitNumberService.name)
  }

  // Method to populate kit numbers from a CSV buffer
  async populateKitNumbersFromCSV(fileBuffer: Buffer): Promise<void> {
    const kitNumbers = [];
    const readableStream = new stream.PassThrough();
    readableStream.end(fileBuffer);
    readableStream
      .pipe(csvParser())
      .on('data', (row) => {
        kitNumbers.push(<CreateKitNumbersDto>{kitNumber: row.kitNumber, lastFourDigits: row.lastFourDigits});
      })
      .on('end', async () => {
        this.populateKitNumbersFromJSON(kitNumbers);
      });
  }

  // Method to populate kit numbers from JSON
  async populateKitNumbersFromJSON(kitNumbers: { kitNumber: string; lastFourDigits: string }[]): Promise<void> {
    for (const kitNumber of kitNumbers) {
        const existingKitNumber = await this.findOne(kitNumber.kitNumber);
        
        if (!existingKitNumber) {
          await this.kitNumberRepository.save(kitNumber);
        } else {
            this.logger.log(`kit Number already exists: ${kitNumber.kitNumber}`)
        }
      }
  }

  async create(createKitNumberDto: CreateKitNumbersDto): Promise<KitNumber> {
    const kitNumber = this.kitNumberRepository.create(createKitNumberDto);
    return this.kitNumberRepository.save(kitNumber);
  }

  // Method to retrieve all kit numbers
  async findAll(): Promise<KitNumber[]> {
    return this.kitNumberRepository.find();
  }

  // Method to retrieve a specific kit number by ID
  async findOne(id: string): Promise<KitNumber> {
    return this.kitNumberRepository.findOne({
        where: {
            kitNumber: id
        }
    });
  }
}
