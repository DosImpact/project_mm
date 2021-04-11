import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { date } from 'joi';
/**
listBuckets
createBucket
listObjects
upload
deleteBucket
*/
@Injectable()
export class UploadService {
  private readonly S3: AWS.S3;
  private readonly REGION: string;
  private readonly BUCKET_NAME: string;
  private readonly ACL: string;

  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      credentials: {
        accessKeyId: configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: configService.get('AWS_S3_SECRET_ACCESS_KEY'),
      },
      region: configService.get('AWS_CONFIG_REGION'),
    });
    this.BUCKET_NAME = configService.get('AWS_S3_BUCKET_NAME');
    this.REGION = configService.get('AWS_CONFIG_REGION');
    this.S3 = new AWS.S3();
    this.ACL = 'public-read';
  }
  // return public url
  makePublicUrl(folder: string, objectName: string) {
    return `https://\
${this.BUCKET_NAME}.s3\
${this.REGION && '.' + this.REGION}.amazonaws.com/\
${folder && folder + '/'}${objectName}`;
  }
  // upload to (assigned bucket + path + filename)
  async uploadS3(file: Express.Multer.File, folder: string) {
    folder = folder.startsWith('/') ? folder.replace('/', '') : folder;
    try {
      const objectName = `${Date.now()}${file.originalname}`;
      // bucket , ACL, key object
      const ETag = await this.S3.putObject({
        Bucket: `${this.BUCKET_NAME}/${folder}`,
        ACL: this.ACL,
        Key: objectName,
        Body: file.buffer,
      }).promise();
      const url = this.makePublicUrl(folder, objectName);
      return { ok: true, ETag, url };
    } catch (error) {
      return { ok: false };
    }
  }

  // deprecated
  // makeUrl(folder: string, objectName: string) {
  //   const url = `https://${this.BUCKET_NAME}.s3${
  //     this.REGION && '.' + this.REGION
  //   }.amazonaws.com/${folder && folder + '/'}${objectName}`;
  //   return url;
  // }

  // // deprecated
  // async uploadBanners(files: Express.Multer.File) {
  //   try {
  //     // // body, bucket, key, ACL,
  //     for (const key in files) {
  //       const file: Express.Multer.File = files[key];
  //       const objectName = `${Date.now() + file.filename}`;
  //       await this.S3.putObject({
  //         Bucket: this.BUCKET_NAME,
  //         ACL: this.ACL,
  //         Key: objectName,
  //         Body: file.buffer,
  //       }).promise();
  //       // await new AWS.S3()
  //       //   .putObject({
  //       //     Bucket: this.BUCKET_NAME,
  //       //     ACL: this.ACL,
  //       //     Key: objectName,
  //       //     Body: file.buffer,
  //       //   })
  //       //   .promise();
  //     }

  //     return {
  //       ok: true,
  //     };
  //   } catch (error) {
  //     return {
  //       ok: false,
  //     };
  //   }
  // }

  // // deprecated
  // async uploadBanner(file: Express.Multer.File, folder: string) {
  //   try {
  //     const BUCKET_NAME = `${'mmuzawyho6ib'}`;
  //     const objectName = `${Date.now() + file.originalname}`;
  //     const region = 'ap-northeast-2';
  //     const res = await new AWS.S3()
  //       .putObject({
  //         Body: file.buffer,
  //         Bucket: `${BUCKET_NAME}/${folder}`,
  //         Key: objectName,
  //         ACL: 'public-read',
  //       })
  //       .promise();
  //     // console.log(res);//{ ETag: '"df6c176d21b8da8d01771461621f8b66"' }

  //     // const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
  //     const url = `https://${BUCKET_NAME}.s3${
  //       '.' + region
  //     }.amazonaws.com/${folder}/${objectName}`;
  //     //https://mmuzawyho6ib.s3.ap-northeast-2.amazonaws.com/banner/home/1618027943896Layer-1704-1200x630.jpeg
  //     return { url };
  //   } catch (error) {}
  // }
  // // deprecated
  // async uploadS3(file: Express.Multer.File) {
  //   try {
  //     const BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME'); //'mmbackdosimpact';
  //     const objectName = `${Date.now() + file.originalname}`;
  //     await new AWS.S3()
  //       .putObject({
  //         Body: file.buffer,
  //         Bucket: BUCKET_NAME,
  //         Key: objectName,
  //         ACL: 'public-read',
  //       })
  //       .promise();

  //     const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
  //     return { url };
  //   } catch (error) {}

  //   console.log(file);
  // }
}
