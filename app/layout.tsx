/* eslint-disable react/jsx-no-undef */
// app/layout.tsx
"use client";
import axiosClient from "@/api-client/axiosClient";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import useSWR, { SWRConfig } from "swr";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>GUI Data Sample</title>
      </head>
      <body>
        <SWRConfig
          value={{
            fetcher: (url) => axiosClient.get(url),
            shouldRetryOnError: false,
          }}
        >
          <CacheProvider>
            <ChakraProvider>{children}</ChakraProvider>
          </CacheProvider>
        </SWRConfig>
      </body>
    </html>
  );
}
