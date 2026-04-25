"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-bold text-navy-700">
            Something went wrong
          </h2>
          <button
            onClick={reset}
            className="mt-4 rounded bg-navy-500 px-4 py-2 text-white hover:bg-navy-600"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
