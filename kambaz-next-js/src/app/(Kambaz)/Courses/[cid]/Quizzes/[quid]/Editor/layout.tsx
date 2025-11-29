"use client";
import EditorNavigation from "./EditorNavigation";

export default function EditorLayout({ children }: { children: React.ReactNode }) {
     
  return (
    <div className="container mt-3">
      <EditorNavigation />
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}