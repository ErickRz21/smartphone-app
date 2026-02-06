"use client";

import clsx from "clsx";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function SidebarLink({ href, children }: Props) {
  const pathname = usePathname();

  return (
    <Link href={href}>
      <div
        className={clsx("flex items-center mx-2 my-1 rounded-xl px-4 py-3 text-base text-black hover:bg-neutral-100 duration-100", {
          "text-black bg-neutral-100 duration-100 border border-neutral-300": pathname === href,
        })}
      >
        {children}
      </div>
    </Link>
  );
}
