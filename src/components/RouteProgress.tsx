"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NProgress from "../lib/nprogress";

export default function RouteProgress() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  return null;
}
