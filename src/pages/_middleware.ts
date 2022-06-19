import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const {pathname, origin} = req.nextUrl;
  // get the slug from the pathname
  const slug = pathname.split("/").pop();
  // if the pathname starts with /api/get-url, then return early
  if (pathname.startsWith("/api/get-url")) {
    console.log('returning early');
    return NextResponse.redirect(origin)
  }

  if (pathname.startsWith("/lnk")) {
    console.log('making an http request');
    const res = await (await fetch(`${origin}/api/get-url/${slug}`)).json();
    return NextResponse.redirect(res.data.url);
  }
}