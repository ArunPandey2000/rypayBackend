import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { NotificationType } from "src/core/entities/notification.entity";

export class AnnouncementNotification {
    @ApiProperty()
    @IsNotEmpty()
    message: string;
}

export class GeneralNotification extends AnnouncementNotification {
    type: NotificationType
}