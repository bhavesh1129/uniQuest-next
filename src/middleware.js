import { NextResponse } from 'next/server'

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/signin' || path === '/signup' || path === '/verifyEmail';
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }
}

export const config = {
    matcher: [
        '/',
        '/about',
        '/contact',
        '/admin',
        '/signin',
        '/signup',
        '/questions',
        '/questions/:id',
        '/verifyEmail'
    ],
}