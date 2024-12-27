import { Test, TestingModule } from '@nestjs/testing';
import { MoneyRequestController } from './money-request.controller';
import { MoneyRequestService } from './money-request.service';

describe('MoneyRequestController', () => {
  let controller: MoneyRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoneyRequestController],
      providers: [MoneyRequestService],
    }).compile();

    controller = module.get<MoneyRequestController>(MoneyRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
