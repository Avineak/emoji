"use client";
import React from "react";

import { useRouter } from "next/navigation";

function GoBackButton({
  className,
  children,
}: React.PropsWithChildren<{
  className?: string;
}>) {
  const router = useRouter();
  return (
    <button className={className} onClick={router.back}>
      {children}
    </button>
  );
}

export default GoBackButton;
