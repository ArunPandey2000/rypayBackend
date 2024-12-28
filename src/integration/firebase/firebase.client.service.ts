import { Injectable } from "@nestjs/common";
import * as admin from 'firebase-admin';
import { AppInstance } from "src/app"
@Injectable()
export class FirebaseClientService {
    fireBaseInstance: admin.app.App;
    constructor() {
        this.fireBaseInstance = AppInstance.getFirbaseInstance();
    }
    async sendNotification({ token, title, body, icon }) {
        try {
          const response = await this.fireBaseInstance.messaging().send({
            token,
            notification: {
                title,
                body,
                imageUrl : icon ? icon : undefined
            }
          });
          return response;
        } catch (error) {
          throw error;
        }
      }
    
      async sendNotificationToMultipleTokens({
        tokens,
        title,
        body,
        icon,
      }) {
        const message = {
          notification: {
            title,
            body,
            icon,
          },
          tokens,
        };
    
        try {
          const response = await this.fireBaseInstance.messaging().sendEachForMulticast(message);
          console.log("Successfully sent messages:", response);
          return {
            success: true,
            message: `Successfully sent ${response.successCount} messages; ${response.failureCount} failed.`,
          };
        } catch (error) {
          console.log("Error sending messages:", error);
          return { success: false, message: "Failed to send notifications" };
        }
      }
    
      async sendTopicNotification({
        topic,
        title,
        body,
        icon,
      }) {
        const message = {
          notification: {
            title,
            body,
            icon,
          },
          topic,
        };
    
        try {
          const response = await this.fireBaseInstance.messaging().send(message);
          console.log("Successfully sent message:", response);
          return { success: true, message: "Topic notification sent successfully" };
        } catch (error) {
          console.log("Error sending message:", error);
          return { success: false, message: "Failed to send topic notification" };
        }
      }
}