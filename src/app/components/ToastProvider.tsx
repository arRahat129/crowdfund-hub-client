"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return <Toaster position="top-right" toastOptions={{ className: "bg-slate-900 text-slate-100" }} />;
}
