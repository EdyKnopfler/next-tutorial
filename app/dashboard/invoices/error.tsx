'use client';

import { useEffect } from "react";

export default function InvoiceErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string },
  reset: () => void;
}) {
  useEffect(() => {
    // Aqui podemos enviar o erro para algum serviço externo
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <p>{error.message || error.toString()}</p>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  )
}