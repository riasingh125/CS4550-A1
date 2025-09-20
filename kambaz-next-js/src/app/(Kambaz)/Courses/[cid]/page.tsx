import { redirect } from "next/navigation";

export default async function Courses({
  params,
}: {
  params: { cid: string };
}) {
  // params is NOT a Promise — you can just destructure it directly
  const { cid } = params;

  // Redirect to that course's Home page
  redirect(`/Courses/${cid}/Home`);
}
