"use client";

import { useEffect, useRef } from "react";

export default function ContactFormBehavior({ formId, brandShort }: { formId: string; brandShort: string }) {
  const subjectRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const form = document.getElementById(formId);
    if (!(form instanceof HTMLFormElement)) return;
    const name = form.elements.namedItem("name");
    const email = form.elements.namedItem("email");
    const topic = form.elements.namedItem("topic");
    const message = form.elements.namedItem("message");
    if (!(name instanceof HTMLInputElement) || !(email instanceof HTMLInputElement) || !(topic instanceof HTMLSelectElement) || !(message instanceof HTMLTextAreaElement)) return;
    const phone = form.elements.namedItem("phone");
    const phoneHint = document.getElementById(`${formId}-phone-hint`);
    const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');

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

    const updateValidation = () => {
      name.setCustomValidity(name.value.trim() ? "" : "Please enter your name.");
      email.setCustomValidity(!email.value.trim() ? "Please enter your email address." : email.validity.typeMismatch ? "Please enter a valid email address." : "");
      topic.setCustomValidity(topic.value ? "" : "Please choose a topic.");
      message.setCustomValidity(message.value.trim() ? "" : "Please write a short message.");
    };

    const update = () => {
      updateSubject();
      updatePhoneRequirement();
      updateValidation();
    };

    const showSending = () => {
      if (!submitButton) return;
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";
    };

    const resetButton = () => {
      if (!submitButton) return;
      submitButton.disabled = false;
      submitButton.textContent = "Send message →";
    };

    form.addEventListener("input", update);
    form.addEventListener("change", update);
    form.addEventListener("submit", showSending);
    window.addEventListener("pageshow", resetButton);
    update();
    return () => {
      form.removeEventListener("input", update);
      form.removeEventListener("change", update);
      form.removeEventListener("submit", showSending);
      window.removeEventListener("pageshow", resetButton);
    };
  }, [formId, brandShort]);

  return <input ref={subjectRef} type="hidden" name="subject" defaultValue={`[${brandShort}] New message`} data-remove-prefix />;
}
