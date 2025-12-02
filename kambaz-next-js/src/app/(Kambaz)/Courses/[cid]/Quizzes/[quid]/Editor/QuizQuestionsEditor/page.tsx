import { findQuizById } from "../../../client";
import QuizQuestionsEditorClient from "./QuizQuestionsEditorClient";

export default async function QuizQuestionsEditorPage({
  params,
}: {
  params: { cid: string; quid: string };
}) {
  const quiz = await findQuizById(params.quid);

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  return <QuizQuestionsEditorClient cid={params.cid} quiz={quiz} />;
}
