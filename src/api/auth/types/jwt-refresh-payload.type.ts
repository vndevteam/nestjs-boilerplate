export type JwtRefreshPayloadType = {
  sessionId: string;
  hash: string;
  iat: number;
  exp: number;
};
