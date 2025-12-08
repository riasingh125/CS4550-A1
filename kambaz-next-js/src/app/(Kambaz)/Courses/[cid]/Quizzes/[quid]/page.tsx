import { findQuizById } from "../client";
import QuizDetailsClient from "./QuizDetailsClient";

export default async function QuizDetailsPage({
  params,
}: {
  params: Promise<{ cid: string; quid: string }>;
}) {
  const { cid, quid } = await params;
  const quiz = await findQuizById(quid);

  return <QuizDetailsClient cid={cid} quiz={quiz} />;
}