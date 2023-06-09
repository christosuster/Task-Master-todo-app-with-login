import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Task Master</title>
        <meta name="description" content="Task Master" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <body
        className="rounded-2xl
               text-[#1A2421]
               backdrop-blur-md
               [ bg-gradient-to-b from-white/30 to-white/0 ]
               [ shadow-black/70 shadow-2xl ] h-[90vh] max-w-[95vw]"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
