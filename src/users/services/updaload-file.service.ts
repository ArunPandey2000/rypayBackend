import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class UploadFileService {
  private client: S3Client;
  private bucketName: string;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.bucketName = this.configService.get('S3_BUCKET_NAME');
    const s3_region = this.configService.get('S3_BUCKET_REGION');
    if (!s3_region) {
      throw new Error('S3_REGION not found or set');
    }
    this.client = new S3Client({
      region: s3_region,
      credentials: {
        accessKeyId: this.configService.get('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
      },
      forcePathStyle: true,
    });
  }
  async uploadSingleFile( file: Express.Multer.File ) {
    try {
      const key = `${uuidv4()}`;
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'private',
        Metadata: {
          originalName: file.originalname,
        },
      });
      await this.client.send(command);
      return {
        url: (await this.getPresignedSignedUrl(key)).url,
        key
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async getPresignedSignedUrl(key: string) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const url = await getSignedUrl(this.client, command, {
        expiresIn: 60 * 60, // 1 hours
      });
      return { url };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
