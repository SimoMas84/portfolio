"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, MouseEvent } from "react";
import { useTransition } from "@/app/context/TransitionContext";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function TransitionLink({
  href,
  children,
  className,
}: TransitionLinkProps) {
  const pathname = usePathname();
  const { startTransition, isTransitioning } = useTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Non fare nulla se siamo già sulla stessa pagina o se c'è una transizione in corso
    if (href === pathname || isTransitioning) return;

    e.preventDefault();
    startTransition(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
