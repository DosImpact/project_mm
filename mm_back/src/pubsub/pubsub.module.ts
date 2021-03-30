import { DynamicModule, Global, Module } from '@nestjs/common';
import { PubsubModuleOptions, PUB_SUB } from './pubsub.interface';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSub } from 'graphql-subscriptions';

@Module({})
@Global()
export class PubsubModule {
  static forRoot(pubsubModuleOptions: PubsubModuleOptions): DynamicModule {
    return {
      module: PubsubModule,
      imports: [],
      providers: [{ provide: PUB_SUB, useValue: new PubSub() }],
      exports: [],
    };
  }
}
