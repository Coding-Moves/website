"use client";

import { useEffect, useRef } from "react";

export default function ContactFormBehavior({ formId, brandShort }: { formId: string; brandShort: string }) {
  const subjectRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const form = document.getElementById(formId);
    if (!(form instanceof HTMLFormElement)) return;
    const name = form.elements.namedItem("name");
    const topic = form.elements.namedItem("topic");
    if (!(name instanceof HTMLInputElement) || !(topic instanceof HTMLSelectElement)) return;

    const updateSubject = () => {
      if (!subjectRef.current) return;
      const selectedTopic = topic.value.trim() || "New message";
      const sender = name.value.trim().replace(/\s+/g, " ");
      subjectRef.current.value = `[${brandShort}] ${selectedTopic}${sender ? ` from ${sender}` : ""}`;
    };

    form.addEventListener("input", updateSubject);
    form.addEventListener("change", updateSubject);
    updateSubject();
    return () => {
      form.removeEventListener("input", updateSubject);
      form.removeEventListener("change", updateSubject);
    };
  }, [formId, brandShort]);

  return <input ref={subjectRef} type="hidden" name="subject" defaultValue={`[${brandShort}] New message`} data-remove-prefix />;
}
