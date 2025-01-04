import { NotificationType } from "src/core/entities/notification.entity";
export declare class AnnouncementNotification {
    message: string;
}
export declare class GeneralNotification extends AnnouncementNotification {
    type: NotificationType;
}
