import { redirect } from "next/navigation";

export default async function Courses({
  params,
}: {
  params: { cid: string };
}) {
  const { cid } = params;


  redirect(`/Courses/${cid}/Home`);
}
