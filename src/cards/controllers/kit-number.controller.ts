import { Controller, Post, UploadedFile, UseInterceptors, Body, UseGuards, Get, NotFoundException, Param, ValidationPipe, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { KitNumberService } from '../services/kit-number.service';
import { CreateKitNumbersDto } from '../dto/kit-number.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { KitNumber } from 'src/core/entities/kit-number.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Kit-numbers')
@Controller('kit-numbers')
export class KitNumberController {
  constructor(private readonly kitNumberService: KitNumberService) {}


  @Post()
  @ApiOperation({ summary: 'Create a new kit number' })
  @ApiResponse({ status: 201, description: 'The kit number has been successfully created.', type: KitNumber })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createKitNumberDto: CreateKitNumbersDto): Promise<KitNumber> {
    return this.kitNumberService.create(createKitNumberDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all kit numbers' })
  @ApiResponse({ status: 200, description: 'List of all kit numbers.', type: [KitNumber] })
  async findAll(): Promise<KitNumber[]> {
    return this.kitNumberService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a kit number by ID' })
  @ApiResponse({ status: 200, description: 'The kit number found by ID.', type: KitNumber })
  @ApiResponse({ status: 404, description: 'Kit number not found' })
  async findOne(@Param('id') id: string): Promise<KitNumber> {
    const kitNumber = await this.kitNumberService.findOne(id);
    if (!kitNumber) {
      throw new NotFoundException('Kit number not found');
    }
    return kitNumber;
  }


  @Post('upload-csv')
  @UseGuards(JwtAuthGuard,AdminGuard) 
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a file',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Endpoint to upload kit number data using csv file' })
  @ApiResponse({ status: 200, description: 'Kit numbers have been successfully populated from CSV.' })
  @ApiResponse({ status: 400, description: 'Invalid file format' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadCSV(@UploadedFile() file: Express.Multer.File): Promise<{ message: string }> {
    if (!file || file.mimetype !== 'text/csv') {
        throw new BadRequestException('Invalid file type');
    }
    await this.kitNumberService.populateKitNumbersFromCSV(file.buffer);
    return { message: 'Kit numbers have been successfully populated from CSV.' };
  }

  @Post('/bulk')
  @ApiBearerAuth()
  @ApiBody({
    description: 'JSON data containing an array of kit numbers',
    type: [CreateKitNumbersDto],
  })
  @ApiOperation({ summary: 'Endpoint to upload kit numbers' })
  @UseGuards(JwtAuthGuard, AdminGuard) // Ensure only admins can access this endpoint
  async uploadJSON(@Body(new ValidationPipe({ transform: true })) body: CreateKitNumbersDto[]): Promise<{ message: string }> {
    await this.kitNumberService.populateKitNumbersFromJSON(body);
    return { message: 'Kit numbers have been successfully populated from JSON.' };
  }
}
