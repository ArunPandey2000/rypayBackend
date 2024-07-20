import { Test, TestingModule } from '@nestjs/testing';
import { OtpFlowService } from './otp-flow.service';

describe('OtpFlowService', () => {
  let service: OtpFlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtpFlowService],
    }).compile();

    service = module.get<OtpFlowService>(OtpFlowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
