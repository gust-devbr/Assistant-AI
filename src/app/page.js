"use client"

/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => router.replace(`/chat/${null}`), []);
};