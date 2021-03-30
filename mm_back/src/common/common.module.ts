import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from './common.interface';

@Global()
@Module({
  providers: [
    {
      provide: PUB_SUB,
      useValue: new PubSub(),
      // useValue: new RedisPubSub({
      //   connection: {
      //     port: +process.env.REDIS_PORT,
      //     host: process.env.REDIS_HOST,
      //   },
      // }),
    },
  ],
})
export class CommonModule {}
