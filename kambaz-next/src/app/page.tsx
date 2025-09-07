import Link from 'next/link';

export default function Kambaz() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Kambaz</h1>
      <p className="mb-6">Your learning management system prototype built with Next.js</p>
      <Link href="/Labs" className="text-blue-600 underline text-lg">
        Go to Lab Exercises
      </Link>
    </div>
  );
}
