import { Repository } from 'typeorm';
import { CoinTransaction } from 'src/core/entities/coins.entity';
import { NotificationBridge } from 'src/notifications/services/notification-bridge';
export declare class CoinCronService {
    private readonly coinTransactionRepository;
    private notificationBridge;
    private readonly logger;
    constructor(coinTransactionRepository: Repository<CoinTransaction>, notificationBridge: NotificationBridge);
    expireOldCoins(): Promise<void>;
}
