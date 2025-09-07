import Link from "next/link";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Lab Exercises – Ria Singh, Section 01</h1>

      <h2>Lab Assignments</h2>
      <ul>
        <li><Link href="/Labs/Lab1">Lab 1: HTML Examples</Link></li>
        <li><Link href="/Labs/Lab2">Lab 2: CSS Basics</Link></li>
        <li><Link href="/Labs/Lab3">Lab 3: JavaScript Fundamentals</Link></li>
      </ul>

      <h2>Other Links</h2>
      <ul>
        {/* Link to your Kambaz app, now at the root */}
        <li>
          <Link href="/">Kambaz Application</Link>
        </li>

        {/* Add your GitHub repo link */}
        <li>
          <a
            href="https://github.com/yourusername/kambaz-next-js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source Code Repository
          </a>
        </li>
      </ul>
    </div>
  );
}
