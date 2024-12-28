import * as admin from 'firebase-admin';
export class AppInstance {
    private static firbaseInstance: admin.app.App = null;

    static getFirbaseInstance() {
        if (this.firbaseInstance) {
            return this.firbaseInstance
        }
        this.firbaseInstance = admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                privateKey: process.env.FIREBASE_PRIVATE_KEY,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL
            }),
        });
        return this.firbaseInstance;
    }
}