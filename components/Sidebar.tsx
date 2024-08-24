"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import path from "path";
import { buttonVariants } from "./ui/button";
import { useState } from "react";

const items = [
  {
    title: "Main",
    //icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },
  {
    title: "Pomodoro",
    //icon: BookOpenCheck,
    href: "/pomodoro",
    color: "text-orange-500",
    isChidren: true,
  },
];

export default function SidebarPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [status, setStatus] = useState(false);

  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r pt-20 md:block`,
        status && "duration-500",
        isOpen ? "w-72" : "w-[78px]"
      )}
    >
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => {}}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "group relative flex h-12 justify-start"
            )}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
