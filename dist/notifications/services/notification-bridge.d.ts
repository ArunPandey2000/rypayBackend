import { Queue } from "bull";
export declare class NotificationBridge {
    private notificationQueue;
    constructor(notificationQueue: Queue);
    add(processName: string, opt: unknown): Promise<import("bull").Job<any>>;
}
