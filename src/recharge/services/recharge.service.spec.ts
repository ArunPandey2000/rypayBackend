import { Test, TestingModule } from '@nestjs/testing';
import { RechargeService } from './recharge.service';

describe('RechargeService', () => {
  let service: RechargeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RechargeService],
    }).compile();

    service = module.get<RechargeService>(RechargeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
