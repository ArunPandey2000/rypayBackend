import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

export class NotificationBridge {
    constructor(@InjectQueue('notification') private notificationQueue: Queue) {

    }

    async add(processName: string, opt: unknown) {
        return this.notificationQueue.add(processName, opt);
    }
    
}