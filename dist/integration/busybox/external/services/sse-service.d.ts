export declare class SseService {
    private userClients;
    addClient(userId: string, res: any): void;
    removeClient(userId: string, res: any): void;
    sendToUser(userId: string, update: any): void;
}
