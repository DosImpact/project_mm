import { UploadService } from '@/uploads/uploads.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannersController } from './banners.controller';
import { BannersResolver } from './banners.resolver';
import { BannersService } from './banners.service';
import { Banner } from './entities/banner.entity';

/**
 베너 모듈 
 *베너 아이디, 배너 이름(유일 - 홈베너,광고배너?)
 *CRUD + AWS S3에도 적용 
 *관리자용 API 별도로

 -✅ 모델링
 -추가 API
 -읽기 API
 -업데이트 API
 -삭제 API
 
 */
@Module({
  imports: [TypeOrmModule.forFeature([Banner])],
  controllers: [BannersController],
  providers: [BannersService, BannersResolver, UploadService],
})
export class BannersModule {}
