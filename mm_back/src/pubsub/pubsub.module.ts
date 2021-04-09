import { DynamicModule, Global, Module } from '@nestjs/common';
import { PubsubModuleOptions, PUB_SUB } from './pubsub.interface';
import { RedisPubSub } from 'graphql-redis-subscriptions';
// import { PubSub } from 'graphql-subscriptions';

@Module({})
@Global()
export class PubsubModule {
  static forRoot({
    redis_host,
    redis_port,
    redis_password,
  }: PubsubModuleOptions): DynamicModule {
    return {
      module: PubsubModule,
      imports: [],
      providers: [
        {
          provide: PUB_SUB,
          useValue: new RedisPubSub({
            connection: {
              host: redis_host,
              port: redis_port,
              ...(redis_password && { password: redis_password }),
            },
          }), //useValue: new PubSub()
        },
      ],
      exports: [],
    };
  }
}
