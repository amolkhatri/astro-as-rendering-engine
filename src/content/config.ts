import { defineCollection, z } from 'astro:content';

const slides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(),
    icon: z.string().optional(),
    sections: z.array(z.object({
      id: z.string(),
      title: z.string(),
      icon: z.string().optional(),
    })).optional(),
  }),
});

export const collections = { slides };



