export type DatabaseConfig = {
  type: string;
  host: string;
  port: number;
  password: string;
  name: string;
  username: string;
  logging: boolean;
  synchronize: boolean;
  maxConnections: number;
  sslEnabled: boolean;
  rejectUnauthorized: boolean;
  ca?: string;
  key?: string;
  cert?: string;
};
