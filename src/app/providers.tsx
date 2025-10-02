"use client";

import { Toaster } from "react-hot-toast";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      {children}
    </>
  );
}
