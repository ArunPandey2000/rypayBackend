import { Test, TestingModule } from '@nestjs/testing';
import { MoneyRequestService } from './money-request.service';

describe('MoneyRequestService', () => {
  let service: MoneyRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoneyRequestService],
    }).compile();

    service = module.get<MoneyRequestService>(MoneyRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
