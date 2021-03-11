import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Problem02 } from './entities/problem02.entity';

export const AuthProblem02 = createParamDecorator(
  (data: unknown, context: ExecutionContext): Problem02 => {
    console.log(
      'createParamDecorator check in contextType',
      context['contextType'],
    );

    if (
      context['contextType'] &&
      String(context['contextType']).startsWith('graphql')
    ) {
      const gqlContext = GqlExecutionContext.create(context).getContext();
      const problem02 = gqlContext['problem02'];
      return problem02;
    }
    if (
      context['contextType'] &&
      String(context['contextType']).startsWith('http')
    ) {
      const request = context.switchToHttp().getRequest();
      return request.problem02;
    }
  },
);

`
console.log('createParamDecorator check in', context);
>
createParamDecorator check in ExecutionContextHost {
    args: [
      undefined,
      {},
      {
        problem02: [Problem02],
        req: [IncomingMessage],
        _extensionStack: [GraphQLExtensionStack]
      },
      {
        fieldName: 'getProblems02',
        fieldNodes: [Array],
        returnType: Problems02Output!,
        parentType: Query,
        path: [Object],
        schema: [GraphQLSchema],
        fragments: [Object: null prototype] {},
        rootValue: undefined,
        operation: [Object],
        variableValues: {},
        cacheControl: [Object]
      }
    ],
    constructorRef: [class Problem02Resolver],
    handler: [Function: getProblems02],
    contextType: 'graphql'
  }
`;

`
console.log('context', context);
>
context ExecutionContextHost {
    args: [
      IncomingMessage {
        next: [Function: next],
        baseUrl: '',
        originalUrl: '/problems02',
        params: {},
        query: {},
        res: [ServerResponse],
        body: {},
        route: [Route],
        ...
      },
      ServerResponse {
        ...
      },
      [Function: next]
    ],
    constructorRef: [class Problem02Controller],
    handler: [Function: getProblems02],
    contextType: 'http'
  }
`;
