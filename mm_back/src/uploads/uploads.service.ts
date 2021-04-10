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

  // ? 배너라는 버킷 / 홈배너 버킷을 만들고 / 이 아래 파일들을 저장하고 싶다.
  // ? 배너/홈배너 버킷의 내용들을 싹다 읽고싶다. , 혹은 하나만
  // ? 배너/홈내버 버킷 내용중 특정 key값에 대한 value(파일) 을 update , delete하고 싶다.
  async createBucket() {}
  async readBucket() {}
  async updateFile() {}
  async deleteFile() {}

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
