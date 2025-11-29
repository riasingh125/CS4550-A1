import { redirect } from "next/navigation";
import { findQuizById } from "../../client";
import QuizDetailsEditor from "./QuizDetailsEditor/page";

export default async function QuizEditorPage({
  params,
}: {
  params: { cid: string; quid: string };
}) {
   redirect(
    `/Courses/${params.cid}/Quizzes/${params.quid}/Editor/QuizDetailsEditor`
  );
 
}
