import Link from 'next/link'

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1 className="text-2xl font-bold mb-4">Lab Exercises</h1>

      <p><strong>Name:</strong> Ria Singh</p>
      <p><strong>Section:</strong> 01</p>

      <h2 className="text-xl mt-4">Lab Assignments:</h2>
      <ul className="list-disc ml-6">
        <li>
          <Link href="/Labs/Lab1" className="text-blue-500 underline">Lab 1: HTML Examples</Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" className="text-blue-500 underline">Lab 2: CSS Basics</Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" className="text-blue-500 underline">Lab 3: JavaScript Fundamentals</Link>
        </li>
      </ul>

      <h2 className="text-xl mt-4">Navigation:</h2>
      <Link href="/" className="text-blue-500 underline">Back to Kambaz App</Link>

      <h2 className="text-xl mt-4">Source Code:</h2>
      <ul className="list-disc ml-6">
        <li>
          <a href="https://github.com/YOUR_USERNAME/kambaz-next-js" target="_blank" className="text-blue-500 underline">GitHub Repo</a>
        </li>
      </ul>
    </div>
  )
}
