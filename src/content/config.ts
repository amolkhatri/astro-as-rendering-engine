import { defineCollection, z } from 'astro:content';

const slides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(),
    icon: z.string().optional(),
  }),
});

export const collections = { slides };



