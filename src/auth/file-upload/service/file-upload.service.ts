import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class FileUploadService {
    private s3Client: S3Client;
    private bucketName: string;
    private minioEndpoint: string;

    constructor(private readonly configService: ConfigService) {
        this.minioEndpoint = this.configService.get('MINIO_ENDPOINT');
        this.bucketName = this.configService.get('MINIO_BUCKET');

        this.s3Client = new S3Client({

            endpoint: this.configService.get('MINIO_ENDPOINT'),
            credentials: {
                accessKeyId: this.configService.get('MINIO_ACCESS_KEY'),
                secretAccessKey: this.configService.get('MINIO_SECRET_KEY'),
            },
            forcePathStyle: true, // Required for MinIO
        });

    }
    async uploadFile(file: Express.Multer.File): Promise<{ message: string; fileUrl: string }> {
        const fileName = `${randomUUID()}-${file.originalname}`;

        const uploadParams = {
            Bucket: this.bucketName,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        try {
            await this.s3Client.send(new PutObjectCommand(uploadParams));

            const fileUrl = `${this.minioEndpoint}/${this.bucketName}/${fileName}`;

            return { message: 'File uploaded successfully', fileUrl };
        } catch (error) {
            console.error('Error uploading file:', error);
            throw new InternalServerErrorException('File upload failed');
        }
    }
}
