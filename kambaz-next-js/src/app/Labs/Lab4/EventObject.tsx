"use client";
import { useState } from "react";

export default function EventObject() {
  const [eventInfo, setEventInfo] = useState<Record<string, unknown> | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const extracted = {
      type: e.type,
      target: (e.target as HTMLElement).outerHTML,
      currentTarget: (e.currentTarget as HTMLElement).outerHTML,
      timeStamp: e.timeStamp,
      bubbles: e.bubbles,
      cancelable: e.cancelable,
      defaultPrevented: e.defaultPrevented,
    };
    setEventInfo(extracted);
  };

  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(eventInfo, null, 2)}</pre>
      <hr />
    </div>
  );
}
