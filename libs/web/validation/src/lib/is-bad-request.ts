import { z } from 'zod';

const BadRequestSchema = z.object({
  statusCode: z.literal(400),
  message: z.string(),
  error: z.literal('Bad Request'),
});

type BadRequest = z.infer<typeof BadRequestSchema>;

export const isBadRequest = (value: unknown): value is BadRequest => {
  return BadRequestSchema.safeParse(value).success;
};
