import { AllConfigType } from '@/config/config.type';
import { ConfigService } from '@nestjs/config';
import { type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
const PinoLevelToSeverityLookup = Object.freeze({
  trace: 'DEBUG',
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARNING',
  error: 'ERROR',
  fatal: 'CRITICAL',
});

const redactPaths = [
  'req.headers.authorization',
  'req.body.email',
  'req.body.password',
  'req.body.oldPassword',
  'req.body.newPassword',
];

function genReqId(req: Request, res: Response) {
  const id = req.headers['x-request-id'] || uuidv4();
  res.setHeader('X-Request-Id', id);
  return id;
}

function gcpLoggingConfig() {
  return {
    messageKey: 'message',
    formatters: {
      level(label, number) {
        return {
          severity:
            PinoLevelToSeverityLookup[label] ||
            PinoLevelToSeverityLookup['info'],
          level: number,
        };
      },
    },
  };
}

function localLoggingConfig() {
  return {
    messageKey: 'msg',
    transport: { target: 'pino-pretty' },
  };
}

async function loggerFactory(configService: ConfigService<AllConfigType>) {
  const logLevel = configService.get('app.logLevel', { infer: true });
  const isPretty = configService.get('app.logPretty', { infer: true });
  const isDebug = configService.get('app.debug', { infer: true });

  return {
    pinoHttp: {
      level: logLevel,
      genReqId: isDebug ? genReqId : undefined,
      serializers: isDebug
        ? {
            req(req) {
              req.body = req.raw.body;
              return req;
            },
          }
        : undefined,
      redact: {
        paths: redactPaths,
        censor: '**GDPR COMPLIANT**',
      }, // Redact sensitive information
      ...(isPretty ? localLoggingConfig() : gcpLoggingConfig()),
    },
  };
}

export default loggerFactory;
