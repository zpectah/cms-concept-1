import z from 'zod';

export const GpsLocationSchema = z.tuple([z.number(), z.number()]);
