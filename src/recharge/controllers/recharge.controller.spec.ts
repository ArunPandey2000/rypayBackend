import { Test, TestingModule } from '@nestjs/testing';
import { RechargeController } from '../recharge.controller';

describe('RechargeController', () => {
  let controller: RechargeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RechargeController],
    }).compile();

    controller = module.get<RechargeController>(RechargeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
