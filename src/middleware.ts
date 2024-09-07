import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

const handleI18nRouting = createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "ar",
});

export function middleware(request: NextRequest) {
  const [, locale, ...segments] = request.nextUrl.pathname.split("/");
  const JoinedSegments = segments.join("/");
  request.nextUrl.pathname = `/${locale}/${JoinedSegments}`;

  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
