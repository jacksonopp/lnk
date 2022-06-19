import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import prisma from "../../../../prisma/prisma";

export const appRouter = trpc.router()
.mutation("create-url", {
  input: z.object({
    url: z.string()
  }),
  resolve: async ({input}) => {
    const abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    
    // create a 7 character random string
    const slug = Array.from(Array(7).keys()).map(() => abc[Math.floor(Math.random() * abc.length)]).join('')

    try {
      await prisma.shortLink.create({
        data: {
          url: input.url,
          slug
        }
      })
  
      return {slug, fullUrl: `https://localhost:3000/lnk/${slug}`}
    } catch (e) {
      console.error(e)
      throw e
    }
  }
})

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null
})