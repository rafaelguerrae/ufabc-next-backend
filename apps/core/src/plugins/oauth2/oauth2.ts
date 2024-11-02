import { type OAuth2Namespace, fastifyOauth2 } from '@fastify/oauth2';
import { fastifyPlugin as fp } from 'fastify-plugin';
import { Config } from '@/config/config.js';
import { objectKeys } from './utils/objectKeys.js';
import { type Querystring, handleOauth } from './handler.js';
import { supportedProviders } from './supportedProviders.js';
import type { FastifyInstance, FastifyRequest } from 'fastify';

export type NextOauthOptions = {
  googleId: Config['OAUTH_GOOGLE_CLIENT_ID'];
  googleSecret: Config['OAUTH_GOOGLE_SECRET'];
  facebookId?: string;
  facebookSecret?: string;
};

async function oauth2(app: FastifyInstance, opts: NextOauthOptions) {
  const providers = supportedProviders(opts, fastifyOauth2);

  for (const provider of objectKeys(providers)) {
    await app.register(fastifyOauth2, {
      name: provider,
      credentials: {
        client: {
          id: providers[provider].credentials.client.id,
          secret: providers[provider].credentials.client.secret,
        },
        auth: providers[provider].config,
      },
      scope: providers[provider].scope,
      callbackUri: (req) => {
        return `${Config.PROTOCOL}://${req.hostname}/login/${provider}/callback`;
      },
    });

    app.log.warn(provider);

    app.get(`/login/${provider}`, async function (request, reply) {
      try {
        const validatedURI = await this[provider].generateAuthorizationUri(
          request,
          reply,
        );
        request.log.warn(validatedURI, 'redirecting to');
        return reply.redirect(validatedURI);
      } catch (error) {
        request.log.warn(error);
      }
    });

    app.get(
      `/login/${provider}/callback`,
      async function (
        request: FastifyRequest<{ Querystring: Querystring }>,
        reply,
      ) {
        try {
          await handleOauth.call(this, provider, request, reply, providers);
        } catch (error: any) {
          if (error?.data?.payload) {
            reply.log.error({ error: error.data.payload }, 'Error in oauth2');
            return error.data.payload;
          }

          // Unknwon (probably db) error
          request.log.warn(error, 'deu merda severa');
          return reply.internalServerError(
            'Algo de errado aconteceu no seu login, tente novamente',
          );
        }
      },
    );
  }
}

export default fp(oauth2, { name: 'NextOauth2' });

declare module 'fastify' {
  export interface FastifyInstance {
    google: OAuth2Namespace;
    facebook: OAuth2Namespace;
  }
}
