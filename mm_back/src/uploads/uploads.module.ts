import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadService } from './uploads.service';

// static file에 대한 Service 제공

@Module({
  providers: [UploadService],
  controllers: [UploadsController],
  exports: [UploadService],
})
export class UploadsModule {}
