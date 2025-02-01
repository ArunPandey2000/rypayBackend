import { ConfigService } from '@nestjs/config';
export declare class UploadFileService {
    private readonly configService;
    private client;
    private bucketName;
    constructor(configService: ConfigService);
    uploadSingleFile(file: Express.Multer.File): Promise<{
        url: string;
        key: string;
    }>;
    getPresignedSignedUrl(key: string): Promise<{
        url: string;
    }>;
}
