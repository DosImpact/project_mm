import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      credentials: {
        accessKeyId: configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: configService.get('AWS_S3_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadS3(file: Express.Multer.File) {
    try {
      // const upload = await new AWS.S3()
      //   .createBucket({
      //     Bucket: 'mmbackdosimpact',
      //   })
      //   .promise();

      const BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME'); //'mmbackdosimpact';
      const objectName = `${Date.now() + file.originalname}`;
      await new AWS.S3()
        .putObject({
          Body: file.buffer,
          Bucket: BUCKET_NAME,
          Key: objectName,
          ACL: 'public-read',
        })
        .promise();

      const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
      return { url };
    } catch (error) {}

    console.log(file);
  }
}
