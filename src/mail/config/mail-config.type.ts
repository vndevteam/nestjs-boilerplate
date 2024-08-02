export type MailConfig = {
  host?: string;
  port: number;
  user?: string;
  password?: string;
  ignoreTLS: boolean;
  secure: boolean;
  requireTLS: boolean;
  defaultEmail?: string;
  defaultName?: string;
};
