import { z } from 'zod';

const HasDataSchema = z.object({
  data: z.unknown(),
});

type HasData = z.infer<typeof HasDataSchema>;

export const hasData = (value: unknown): value is HasData => {
  return HasDataSchema.safeParse(value).success;
};
