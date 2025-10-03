"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

  const links = [
    { href: "/Account/Signin", label: "Signin", id: "wd-account-signin-link" },
    { href: "/Account/Signup", label: "Signup", id: "wd-account-signup-link" },
    { href: "/Account/Profile", label: "Profile", id: "wd-account-profile-link" },
  ];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            id={link.id}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}