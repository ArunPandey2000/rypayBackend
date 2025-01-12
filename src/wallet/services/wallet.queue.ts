import { InjectQueue } from "@nestjs/bull";
import { Global, Injectable } from "@nestjs/common";
import { Queue } from "bull";

@Global()
@Injectable()
export class WalletBridge {
    constructor(@InjectQueue('wallet') private walletQueue: Queue) {

    }

    async add(processName: string, opt: unknown) {
        return this.walletQueue.add(processName, opt);
    }
    
}