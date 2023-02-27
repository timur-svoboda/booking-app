import { z } from 'zod';

const HasResponseSchema = z.object({
  response: z.unknown(),
});

type HasResponse = z.infer<typeof HasResponseSchema>;

export const hasResponse = (value: unknown): value is HasResponse => {
  return HasResponseSchema.safeParse(value).success;
};
