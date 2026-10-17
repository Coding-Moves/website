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
    const phone = form.elements.namedItem("phone");
    const phoneHint = document.getElementById(`${formId}-phone-hint`);

    const updateSubject = () => {
      if (!subjectRef.current) return;
      const selectedTopic = topic.value.trim() || "New message";
      const sender = name.value.trim().replace(/\s+/g, " ");
      subjectRef.current.value = `[${brandShort}] ${selectedTopic}${sender ? ` from ${sender}` : ""}`;
    };

    const updatePhoneRequirement = () => {
      if (!(phone instanceof HTMLInputElement)) return;
      const method = form.querySelector<HTMLInputElement>('input[name="contact_method"]:checked')?.value;
      const needsPhone = method === "WhatsApp" || method === "Call";
      phone.required = needsPhone;
      phone.setCustomValidity(needsPhone && !phone.value.trim() ? "Please add your number so we can reach you" : "");
      if (phoneHint) phoneHint.hidden = !needsPhone || Boolean(phone.value.trim());
    };

    const update = () => {
      updateSubject();
      updatePhoneRequirement();
    };

    form.addEventListener("input", update);
    form.addEventListener("change", update);
    update();
    return () => {
      form.removeEventListener("input", update);
      form.removeEventListener("change", update);
    };
  }, [formId, brandShort]);

  return <input ref={subjectRef} type="hidden" name="subject" defaultValue={`[${brandShort}] New message`} data-remove-prefix />;
}
