// src/sse/sse.controller.ts
import { Controller, Get, Post, Req, Res, UseGuards, Body, Sse, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { filter, fromEvent, map, Observable, Subject } from 'rxjs';
import { SseService } from '../services/sse-service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

class WebhookRequest {
    @ApiProperty()
    userId: string;
    @ApiProperty()
    rechargeId: string;
    @ApiProperty()
    status: string
}
@ApiTags('SSE')
@Controller()
export class SseController {
  constructor(private readonly sseService: SseService) {}
  private sseSubject = new Subject<any>();

  @Sse('/sse/:id')
  sse(@Req() req: any, @Param('id') id: string): Observable<any> {
    
    const userId = id;

    return this.sseSubject.pipe(
        filter((data) => data.userId === userId),
        map((data) => {
          return new MessageEvent('recharge', { data });
        }),
      );
  }

  @Post('webhook')
  handleWebhook(@Body() body:  WebhookRequest) {
    const { userId, rechargeId, status } = body;

    console.log(`Received webhook for userId ${userId}, rechargeId ${rechargeId} with status ${status}`);

    // Notify the specific user about the update
    // this.sseService.sendToUser(userId, { rechargeId, status });
    this.sseSubject.next(body)

    return 'Received';
  }
}
