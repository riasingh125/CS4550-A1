"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();

  const links = [
    { href: "/Account", label: "Account", icon: FaRegCircleUser, id: "wd-account-link", iconColor: "white" },
    { href: "/Dashboard", label: "Dashboard", icon: AiOutlineDashboard, id: "wd-dashboard-link", iconColor: "danger" },
    {  href: "/Courses/1234/Home", label: "Courses", icon: LiaBookSolid, id: "wd-course-link", iconColor: "danger" ,},
    { href: "/Calendar", label: "Calendar", icon: IoCalendarOutline, id: "wd-calendar-link", iconColor: "danger" },
    { href: "/Inbox", label: "Inbox", icon: FaInbox, id: "wd-inbox-link", iconColor: "danger" },
    { href: "/Labs", label: "Labs", icon: LiaCogSolid, id: "wd-labs-link", iconColor: "danger" },
  ];

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 bg-black z-2"
      style={{ width: 110 }}
      id="wd-kambaz-navigation"
    >
      {/* Northeastern Link */}
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <Image
          src="/images/NEU.png"
          width={75}
          height={75}
          alt="Northeastern University"
        />
      </ListGroupItem>

      {/* Navigation Links */}
      {links.map((link) => {
        const isActive = pathname?.startsWith(link.href);
        const IconComponent = link.icon;
        
        return (
          <ListGroupItem
            key={link.href}
            className={`border-0 text-center ${isActive ? "bg-white" : "bg-black"}`}
          >
            <Link
              href={link.href}
              id={link.id}
              className={`text-decoration-none ${
                isActive ? "text-danger" : "text-white"
              }`}
            >
              <IconComponent
                className={`fs-1 ${
                  isActive 
                    ? "text-danger" 
                    : link.iconColor === "white" 
                    ? "text-white" 
                    : "text-danger"
                }`}
              />
              <br />
              {link.label}
            </Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}