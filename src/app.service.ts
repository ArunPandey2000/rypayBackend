import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerStatus() {
    return {
      mesage: 'service is up and running!!!',
    };
  }
}
