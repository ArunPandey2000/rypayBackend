import * as admin from 'firebase-admin';
export declare class AppInstance {
    private static firbaseInstance;
    static getFirbaseInstance(): admin.app.App;
}
