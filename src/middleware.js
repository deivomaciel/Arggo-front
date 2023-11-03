import { NextResponse } from 'next/server'
 
export function middleware(request) {
    const cookie = request.cookies.has('destiny')
    
    if(!cookie) {
      if(request.nextUrl.pathname === '/') return NextResponse.next()
      return NextResponse.redirect(new URL('/', request.url))
    }

    if(request.nextUrl.pathname === '/') return NextResponse.redirect(new URL('/chat', request.url))
}
 
export const config = {
  matcher: ['/', '/chat/:path*'],
}