import { Test, TestingModule } from '@nestjs/testing';
import { ExternalController } from './external.controller';

describe('ExternalController', () => {
  let controller: ExternalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalController],
    }).compile();

    controller = module.get<ExternalController>(ExternalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
