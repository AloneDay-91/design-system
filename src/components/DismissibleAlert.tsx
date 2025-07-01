"use client";
import { useState } from "react";
import { Alert, AlertProps } from "./Alert";

export function DismissibleAlert(props: AlertProps) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return <Alert {...props} onClose={() => setOpen(false)} />;
} 