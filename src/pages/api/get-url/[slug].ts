// a nextjs request handler
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/prisma'
import { millisecondsToSeconds } from "date-fns";

// export a default async function for the nextjs request handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // get the slug from the url
  const {slug} = req.query;

  if (!slug || typeof slug !== "string") {
    // return a 404 if the slug is not provided
    res.status(404).json({
      error: "slug is required"
    });
    return
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug
      },
      expiresAt: {
        gte: new Date()
      }
    }
  })

  console.log("data from endpoint:", data);

  // if no result, return a 404 slug not found
  if (!data) {
    res.status(404).json({
      error: "slug not found"
    });
    return
  }

  // return a hello world response
  res.status(200).json({
    data
  })
}
