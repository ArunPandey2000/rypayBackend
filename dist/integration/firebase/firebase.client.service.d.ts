import * as admin from 'firebase-admin';
export declare class FirebaseClientService {
    fireBaseInstance: admin.app.App;
    constructor();
    sendNotification({ token, title, body, icon }: {
        token: any;
        title: any;
        body: any;
        icon: any;
    }): Promise<string>;
    sendNotificationToMultipleTokens({ tokens, title, body, icon, }: {
        tokens: any;
        title: any;
        body: any;
        icon: any;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    sendTopicNotification({ topic, title, body, icon, }: {
        topic: any;
        title: any;
        body: any;
        icon: any;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
