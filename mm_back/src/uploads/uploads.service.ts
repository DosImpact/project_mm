import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
/**
listBuckets
createBucket
listObjects
upload
deleteBucket
*/
@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      credentials: {
        accessKeyId: configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: configService.get('AWS_S3_SECRET_ACCESS_KEY'),
      },
      region: 'ap-northeast-2',
    });
    const test = async () => {
      // read bucket list
      // const res1 = await new AWS.S3().listBuckets().promise();
      // console.log(res1);
      // create bucket
      // const res2 = await new AWS.S3()
      //   .createBucket({
      //     Bucket: 'mmdelmebucket',
      //   })
      //   .promise();
      //   //{ Location: 'http://mmdelmebucket.s3.amazonaws.com/' }
      // console.log(res2);
      // read object list
      // const res3 = await new AWS.S3()
      //   .listObjects({
      //     Bucket: 'mmuzawyho6ib',
      //   })
      //   .promise();
      // console.log(res3);
      // del object - key 필요
      //* key는
      // const res4 = await new AWS.S3()
      //   .deleteObject({
      //     Bucket: 'mmuzawyho6ib',
      //     Key: 'banner/home/1618028266591Layer-1704-1200x630.jpeg',
      //   })
      //   .promise();
      // console.log(res4);
    };

    test();
  }

  // ? 배너라는 버킷 / 홈배너 버킷을 만들고 / 이 아래 파일들을 저장하고 싶다.
  // ? 배너/홈배너 버킷의 내용들을 싹다 읽고싶다. , 혹은 하나만
  // ? 배너/홈내버 버킷 내용중 특정 key값에 대한 value(파일) 을 update , delete하고 싶다.
  async createBucket() {}
  async readBucket() {}
  async updateFile() {}
  async deleteFile() {}

  async uploadBanner(file: Express.Multer.File, folder: string) {
    try {
      const BUCKET_NAME = `${'mmuzawyho6ib'}`;
      const objectName = `${Date.now() + file.originalname}`;
      const region = 'ap-northeast-2';
      const res = await new AWS.S3()
        .putObject({
          Body: file.buffer,
          Bucket: `${BUCKET_NAME}/${folder}`,
          Key: objectName,
          ACL: 'public-read',
        })
        .promise();
      // console.log(res);//{ ETag: '"df6c176d21b8da8d01771461621f8b66"' }

      // const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
      const url = `https://${BUCKET_NAME}.s3${
        '.' + region
      }.amazonaws.com/${folder}/${objectName}`;
      //https://mmuzawyho6ib.s3.ap-northeast-2.amazonaws.com/banner/home/1618027943896Layer-1704-1200x630.jpeg
      return { url };
    } catch (error) {}
  }
  async uploadS3(file: Express.Multer.File) {
    try {
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
