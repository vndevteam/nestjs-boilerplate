export interface IEmailJob {
  email: string;
}

export interface IVerifyEmailJob extends IEmailJob {
  token: string;
}
