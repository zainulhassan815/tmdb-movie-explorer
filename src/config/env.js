import { z } from "zod";

const schema = z.object({
  VITE_API_BASE_URL: z.url(),
  VITE_API_ACCESS_TOKEN: z.string(),
});

const env = schema.parse(import.meta.env);

export const appConfig = {
  api: {
    baseUrl: env.VITE_API_BASE_URL,
    accessToken: env.VITE_API_ACCESS_TOKEN,
  },
};
