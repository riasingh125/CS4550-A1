"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function EditorNavigation() {
  const { cid, quid } = useParams();
  const pathname = usePathname();
// deploy
  return (
    <Nav variant="pills">
      <NavItem>
        <NavLink
          href={`/Courses/${cid}/Quizzes/${quid}/Editor/QuizDetailsEditor`}
          as={Link}
          className={`nav-link ${
            pathname.endsWith("QuizDetailsEditor") ? "text-black fw-bold border-bottom border-2 border-black"
              : "text-danger"
          }`}
          style={{ background: "transparent" }}
        >
          Details
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          href={`/Courses/${cid}/Quizzes/${quid}/Editor/QuizQuestionsEditor`}
          as={Link}
          className={`nav-link ${
            pathname.endsWith("QuizQuestionsEditor")? "text-black fw-bold border-bottom border-2 border-black"
              : "text-danger"
          }`}
          style={{ background: "transparent" }}
        >
          Questions
        </NavLink>
      </NavItem>
    </Nav>
  );
}
