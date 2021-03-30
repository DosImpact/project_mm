import { PUB_SUB } from '@/pubsub/pubsub.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class PyShellResolver {
  constructor(
    @Inject(PUB_SUB)
    private readonly pubsub: PubSub,
  ) {}
}
