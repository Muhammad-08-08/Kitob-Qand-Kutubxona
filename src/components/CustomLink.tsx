"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import NProgress from "../lib/nprogress";

type Props = LinkProps & {
  children: ReactNode;
  className?: string;
};

export default function CustomLink({
  href,
  children,
  className,
  ...props
}: Props) {
  const handleClick = () => {
    NProgress.start();
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
