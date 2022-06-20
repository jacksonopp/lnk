import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../prisma/prisma"
import { formatISO } from "date-fns"

// a next.js handler function that removes all expired shortlinks
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await prisma.shortLink.deleteMany({
    where: {
      expiresAt: {
        lte: formatISO(new Date())
      }
    }
  })

  return res.status(200).json({
    message: "All expired shortlinks have been deleted",
    data
  })
}