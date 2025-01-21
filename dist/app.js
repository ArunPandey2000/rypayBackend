"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInstance = void 0;
const admin = require("firebase-admin");
class AppInstance {
    static getFirbaseInstance() {
        if (this.firbaseInstance) {
            return this.firbaseInstance;
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
exports.AppInstance = AppInstance;
AppInstance.firbaseInstance = null;
//# sourceMappingURL=app.js.map