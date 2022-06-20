import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../prisma/prisma"

// a next.js handler function that removes all expired shortlinks
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await prisma.shortLink.deleteMany({
    where: {
      expiresAt: {
        lte: new Date()
      }
    }
  })

  return res.status(200).json({
    message: "All expired shortlinks have been deleted"
  })
}