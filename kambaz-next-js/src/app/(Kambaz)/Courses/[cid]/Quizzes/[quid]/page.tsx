import { findQuizById } from "../client";
import QuizDetailsClient from "./QuizDetailsClient";

export default async function QuizDetailsPage({
  params,
}: {
  params: { cid: string; quid: string };
}) {
  const quiz = await findQuizById(params.quid);

  return <QuizDetailsClient cid={params.cid} quiz={quiz} />;
}