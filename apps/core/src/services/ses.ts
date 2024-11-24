import {
  SESClient,
  SendTemplatedEmailCommand,
  type SendTemplatedEmailCommandInput,
} from '@aws-sdk/client-ses';
import { logger } from '@next/common';
import { FastifyInstance } from 'fastify';

type User = {
  email: string;
  ra: number;
};
type Email = {
  recipient: string;
  body: {
    url: string;
    recovery_facebook?: string;
    recovery_google?: string;
  };
};

export async function sesSendEmail(
  user: User,
  templateId: 'Confirmation' | 'Recover',
  email: Email,
  config: FastifyInstance['config']
) {
  const sesClient = new SESClient({
    region: config.AWS_REGION,
    credentials: {
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    },
  });
  let templateData: string;
  if (templateId === 'Confirmation') {
    templateData = JSON.stringify({ url: email.body.url });
  } else {
    templateData = JSON.stringify({
      recovery_facebook: email.body.recovery_facebook,
      recovery_google: email.body.recovery_google,
    });
  }

  try {
    if (!user.email) {
      throw new Error('Email not found, the email must be provided');
    }

    const sendTemplatedEmailCommand = {
      Source: 'UFABC next <contato@ufabcnext.com>',
      Destination: {
        ToAddresses: [user.email],
      },
      TemplateData: templateData,
      Template: templateId,
    } satisfies SendTemplatedEmailCommandInput;
    const command = new SendTemplatedEmailCommand(sendTemplatedEmailCommand);
    const data = await sesClient.send(command);
    return data;
  } catch (error) {
    logger.error({ error }, 'Unknown error sending email');
  } finally {
    sesClient.destroy();
  }
}
