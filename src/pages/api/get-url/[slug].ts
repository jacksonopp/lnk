// a nextjs request handler
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/prisma'

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

  const result = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug
      }
    }
  })

  // if no result, return a 404 slug not found
  if (!result) {
    res.status(404).json({
      error: "slug not found"
    });
    return
  }

  // return a hello world response
  res.status(200).json({
    message: `Hello world from ${slug}`,
    result
  })
}
