import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Suspense } from "react";
import Loading from "./loading";
import AOSProvider from "@/Components/AOS/AOS";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/jpg" href="/favicon.jpg" />
      </head>
      <body dir={locale == "ar" ? "rtl" : "ltr"}>
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={<Loading />}>
            <AOSProvider>{children}</AOSProvider>
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
