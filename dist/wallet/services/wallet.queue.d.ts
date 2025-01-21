import { Queue } from "bull";
export declare class WalletBridge {
    private walletQueue;
    constructor(walletQueue: Queue);
    add(processName: string, opt: unknown): Promise<import("bull").Job<any>>;
}
