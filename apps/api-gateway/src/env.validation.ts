import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  JWT_SECRET: z.string(),
  MONOLITH_URL: z.url(),
  AUTH_SERVICE_HOST: z.string(),
  AUTH_SERVICE_PORT: z.coerce.number().default(3003),
  HERO_SERVICE_HOST: z.string(),
  HERO_SERVICE_PORT: z.coerce.number().default(3002),
});

export function validateGatewayEnv(config: Record<string, unknown>) {
  return envSchema.parse(config);
}
