import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../prisma/prisma"
import { formatISO } from "date-fns"

// a next.js handler function that removes all expired shortlinks
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;

      console.log('cleaning up expired shortlinks...');

      if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
        res.status(401).json({
          error: 'Unauthorized',
          success: false
        })
      } else {        
        const data = await prisma.shortLink.deleteMany({
          where: {
            expiresAt: {
              lte: formatISO(new Date())
            }
          }
        })

        console.log('shortlinks have been cleaned up');
      
        return res.status(200).json({
          message: "All expired shortlinks have been deleted",
          data
        })
      }

    } catch (error: any) {
      res.status(500).json({statusCode: 500, message: error.message})
    }
  
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}