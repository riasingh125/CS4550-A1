"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import * as client from "../../../client";
import { Quiz } from "../../../reducer";

export default function QuizDetailsEditorClient({
    cid,
    quiz,
}: {
    cid: string;
    quiz: Quiz;
}) {
    const router = useRouter();

    if (!quiz) {
        return <div>Quiz not found.</div>;
    }

    const [form, setForm] = useState({
        title: quiz.title || "",
        description: quiz.description || "",
        quizType: quiz.quizType || "Graded Quiz",
        points: quiz.points ?? 0,
        assignmentGroup: quiz.assignmentGroup || "Quizzes",
        shuffleAnswers: quiz.shuffleAnswers ?? true,
        timeLimit: quiz.timeLimit ?? 20,
        multipleAttempts: quiz.multipleAttempts ?? false,
        howManyAttempts: quiz.howManyAttempts ?? 1,
        showCorrectAnswers: quiz.showCorrectAnswers || "After submission",
        accessCode: quiz.accessCode || "",
        oneQuestionAtATime: quiz.oneQuestionAtATime ?? true,
        webcamRequired: quiz.webcamRequired ?? false,
        lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering ?? false,
        dueDate: quiz.dueDate || "",
        availableDate: quiz.availableDate || "",
        untilDate: quiz.untilDate || "",
    });

    const update = (field: keyof typeof form, value: any) => {
        setForm({ ...form, [field]: value });
    };

    const saveQuiz = async () => {
        await client.updateQuiz(quiz._id, form);
        router.push(`/Courses/${cid}/Quizzes/${quiz._id}`);
    };

    return (
        <div className="container mt-4">
            <h2>Edit Quiz Details</h2>

            <Form className="mt-3">

                <Form.Group className="mb-3">
                    <Form.Label>Quiz Title</Form.Label>
                    <Form.Control
                        value={form.title}
                        onChange={(e) => update("title", e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        value={form.description}
                        onChange={(e) => update("description", e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Quiz Type</Form.Label>
                    <Form.Select
                        value={form.quizType}
                        onChange={(e) => update("quizType", e.target.value)}
                    >
                        <option value="Graded Quiz">Graded Quiz</option>
                        <option value="Practice Quiz">Practice Quiz</option>
                        <option value="Graded Survey">Graded Survey</option>
                        <option value="Ungraded Survey">Ungraded Survey</option>
                    </Form.Select>
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Points</Form.Label>
                    <Form.Control
                        type="number"
                        value={form.points}
                        onChange={(e) => update("points", Number(e.target.value))}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Assignment Group</Form.Label>
                    <Form.Select
                        value={form.assignmentGroup}
                        onChange={(e) => update("assignmentGroup", e.target.value)}
                    >
                        <option value="Quizzes">Quizzes</option>
                        <option value="Exams">Exams</option>
                        <option value="Assignments">Assignments</option>
                        <option value="Project">Project</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        id="wd-shuffle-answers"
                        label="Shuffle Answers"
                        checked={form.shuffleAnswers}
                        onChange={(e) => update("shuffleAnswers", e.target.checked)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Time Limit</Form.Label>
                    <Form.Control
                        type="number"
                        value={form.timeLimit}
                        onChange={(e) => update("timeLimit", Number(e.target.value))}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" id="multiple-attempts-checkbox" label="Allow Multiple Attempts"
                        checked={form.multipleAttempts}
                        onChange={(e) => {
                            const checked = e.target.checked;
                            if (!checked) {
                                setForm({
                                    ...form,
                                    multipleAttempts: false,
                                    howManyAttempts: 1,
                                });
                            } else {
                                setForm({
                                    ...form,
                                    multipleAttempts: true,
                                });
                            }
                        }}
                    />
                </Form.Group>

                {form.multipleAttempts && (
                    <Form.Group className="mb-3 ms-4">
                        <Form.Label>How Many Attempts</Form.Label>
                        <Form.Control type="number" min={1} value={form.howManyAttempts}
                            onChange={(e) =>
                                update("howManyAttempts", Number(e.target.value))
                            }
                        />
                    </Form.Group>
                )}

                <Form.Group className="mb-3">
                    <Form.Label>Show Correct Answers</Form.Label>
                    <Form.Control
                        value={form.showCorrectAnswers}
                        onChange={(e) => update("showCorrectAnswers", e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Access Code</Form.Label>
                    <Form.Control
                        value={form.accessCode}
                        onChange={(e) => update("accessCode", e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" id="wd-one-at-a-time" label="One Question at a Time"
                        checked={form.oneQuestionAtATime}
                        onChange={(e) => update("oneQuestionAtATime", e.target.checked)}
                    />
                </Form.Group>

                 <Form.Group className="mb-3">
                    <Form.Check type="checkbox" id="wd-webcam-required" label="Webcam Required"
                        checked={form.webcamRequired}
                        onChange={(e) => update("webcamRequired", e.target.checked)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" id="wd-lock-questions" label="Lock Questions After Answering"
                        checked={form.lockQuestionsAfterAnswering}
                        onChange={(e) => update("lockQuestionsAfterAnswering", e.target.checked)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={form.dueDate}
                        onChange={(e) => update("dueDate", e.target.value)}
                    />
                </Form.Group>

                 <Form.Group className="mb-3">
                    <Form.Label>Available Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={form.availableDate}
                        onChange={(e) => update("availableDate", e.target.value)}
                    />
                </Form.Group>

                 <Form.Group className="mb-3">
                    <Form.Label>Until Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={form.untilDate}
                        onChange={(e) => update("untilDate", e.target.value)}
                    />
                </Form.Group>



                <div className="d-flex justify-content-end gap-2 mt-3">
                    <Button
                        variant="secondary"
                        onClick={() => router.push(`/Courses/${cid}/Quizzes/${quiz._id}`)}
                    >
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={saveQuiz}>
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
}
