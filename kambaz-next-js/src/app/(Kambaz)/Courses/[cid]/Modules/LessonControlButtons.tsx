"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function LessonControlButtons() {
  return (
    <div className="float-end">
      {/* Green checkmark + ellipsis */}
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4 ms-2" />
    </div>
  );
}
