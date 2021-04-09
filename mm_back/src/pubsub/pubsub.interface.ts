export interface PubsubModuleOptions {
  redis_port: number;
  redis_host: string;
  redis_password?: string;
}

export const PUB_SUB = 'PUB_SUB';
