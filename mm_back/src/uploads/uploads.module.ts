import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadService } from './uploads.service';
@Module({
  providers: [UploadService],
  controllers: [UploadsController],
})
export class UploadsModule {}
