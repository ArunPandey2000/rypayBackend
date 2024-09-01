// src/sse/sse.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SseService {
  private userClients: Map<string, any[]> = new Map();

  addClient(userId: string, res: any) {
    if (!this.userClients.has(userId)) {
      this.userClients.set(userId, []);
    }
    this.userClients.get(userId).push(res);
  }

  removeClient(userId: string, res: any) {
    if (this.userClients.has(userId)) {
      const clients = this.userClients.get(userId);
      this.userClients.set(userId, clients.filter(client => client !== res));
    }
  }

  sendToUser(userId: string, update: any) {
    if (this.userClients.has(userId)) {
      this.userClients.get(userId).forEach(client =>
        client.write(`data: ${JSON.stringify(update)}\n\n`)
      );
    }
  }
}
