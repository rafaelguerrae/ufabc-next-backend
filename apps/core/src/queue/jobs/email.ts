import { createCipheriv, randomBytes } from 'node:crypto';
import { Buffer } from 'node:buffer';
import { logger } from '@next/common';
import { sesSendEmail } from '@/services/ses.js';
import { Config } from '@/config/config.js';

type User = {
  email: string;
  ra: number;
};

function createToken(text: string) {
  const ALGORITHM = 'aes-256-ctr';
  const ENCRYPTION_KEY = Buffer.from(Config.JWT_SECRET, 'hex');
  const IV_LENGTH = 16;
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(
    ALGORITHM,
    Buffer.concat([Buffer.from(ENCRYPTION_KEY), Buffer.alloc(32)], 32),
    iv,
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

type Result = {
  sentTo: string;
  messageId?: string;
};

export async function sendConfirmationEmail(data: User): Promise<Result> {
  const emailTemplate = Config.MAILER_CONFIG.EMAIL_CONFIRMATION_TEMPLATE;

  if (!data.email) {
    throw new Error('Email not found');
  }

  const token = createToken(JSON.stringify({ email: data.email }));
  const emailRequest = {
    recipient: data?.email,
    body: {
      url: `${Config.WEB_URL}/confirm?token=${token}`,
    },
  };

  try {
    const response = await sesSendEmail(data, emailTemplate, emailRequest);
    return {
      sentTo: `Returned value ${data.ra}`,
      messageId: response?.MessageId,
    };
  } catch (error) {
    logger.error({ error }, 'Error Sending email');
    throw error;
  }
}
