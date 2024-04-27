"use client";

import { useState } from "react";
import Input from "./Input";
import { useRouter } from "../../node_modules/next/navigation";

export default function ServerSearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  function onSubmit(e: any) {
    e.preventDefault();
    router.push(`/search?q=${searchTerm}`);
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}
