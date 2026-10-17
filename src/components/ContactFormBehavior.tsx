"use client";

import { useEffect, useRef } from "react";

const NAME_PATTERN = /^[\p{L} .'-]+$/u;
const EMAIL_PATTERN = /^[^\s@]+@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
const EMAIL_DOMAIN_FIXES: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmail.co": "gmail.com",
  "hotmial.com": "hotmail.com",
  "yaho.com": "yahoo.com",
  "outlok.com": "outlook.com",
};

function normalizePhone(value: string): string | null {
  if (!/^\+?[\d -]+$/.test(value)) return null;
  const compact = value.replace(/[ -]/g, "");
  const digits = compact.startsWith("+") ? compact.slice(1) : compact;
  let mobile: string | null = null;

  if (/^03\d{9}$/.test(digits) && !compact.startsWith("+")) mobile = digits.slice(1);
  else if (/^3\d{9}$/.test(digits) && !compact.startsWith("+")) mobile = digits;
  else if (/^923\d{9}$/.test(digits)) mobile = digits.slice(2);

  if (mobile) return `+92 ${mobile.slice(0, 3)} ${mobile.slice(3)}`;
  if (/^\+[1-9]\d{7,14}$/.test(compact) && !digits.startsWith("92")) return compact;
  return null;
}

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

    const phoneElement = form.elements.namedItem("phone");
    const phone = phoneElement instanceof HTMLInputElement ? phoneElement : null;
    const phoneHint = document.getElementById(`${formId}-phone-hint`);
    const emailTypo = document.getElementById(`${formId}-email-typo`);
    const emailFix = form.querySelector<HTMLButtonElement>(`#${formId}-email-fix`);
    const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const fields = [name, email, ...(phone ? [phone] : []), topic, message];
    const touched = new Set<string>();
    let submitted = false;
    let suggestedEmail = "";
    const originalNoValidate = form.noValidate;
    form.noValidate = true;

    const updateSubject = () => {
      if (!subjectRef.current) return;
      const selectedTopic = topic.value.trim() || "New message";
      const sender = name.value.trim().replace(/\s+/g, " ");
      subjectRef.current.value = `[${brandShort}] ${selectedTopic}${sender ? ` from ${sender}` : ""}`;
    };

    const needsPhone = () => {
      const method = form.querySelector<HTMLInputElement>('input[name="contact_method"]:checked')?.value;
      return method === "WhatsApp" || method === "Call";
    };

    const setError = (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, error: string) => {
      const errorElement = document.getElementById(`${formId}-${field.name}-error`);
      if (errorElement && errorElement.textContent !== error) errorElement.textContent = error;
      field.setAttribute("aria-invalid", error ? "true" : "false");
    };

    const validateField = (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
      const value = field.value.trim();
      let error = "";
      switch (field.name) {
        case "name":
          if (Array.from(value).length < 2 || Array.from(value).length > 60 || !NAME_PATTERN.test(value)) error = "Please enter your name.";
          break;
        case "email":
          if (!EMAIL_PATTERN.test(value) || email.validity.typeMismatch) error = "Please enter a valid email, like name@gmail.com.";
          break;
        case "phone":
          if ((needsPhone() || value) && !normalizePhone(value)) error = "Please enter a valid number, like +92 329 7316882.";
          break;
        case "topic":
          if (!value) error = "Please choose a topic.";
          break;
        case "message":
          if (Array.from(value).length < 10) error = "Please tell us a little more (at least 10 characters).";
          break;
      }
      setError(field, error);
      return !error;
    };

    const updatePhoneRequirement = () => {
      if (!phone) return;
      phone.required = needsPhone();
      if (phoneHint) phoneHint.hidden = !phone.required || Boolean(phone.value.trim()) || phone.getAttribute("aria-invalid") === "true";
    };

    const updateEmailTypo = () => {
      if (!emailTypo || !emailFix) return;
      const match = /^([^\s@]+)@([^\s@]+)$/.exec(email.value.trim());
      const correctedDomain = match && EMAIL_DOMAIN_FIXES[match[2].toLowerCase()];
      suggestedEmail = correctedDomain ? `${match[1]}@${correctedDomain}` : "";
      emailFix.textContent = suggestedEmail;
      emailTypo.hidden = !suggestedEmail;
    };

    const handleInput = (event: Event) => {
      const target = event.target;
      updateSubject();
      if (target === email) updateEmailTypo();
      if (target instanceof HTMLInputElement && target.name === "contact_method") {
        if (phone && (submitted || touched.has("phone"))) validateField(phone);
      } else if (fields.includes(target as HTMLInputElement) && (submitted || touched.has((target as HTMLInputElement).name))) {
        validateField(target as HTMLInputElement);
      }
      updatePhoneRequirement();
    };

    const handleBlur = (event: FocusEvent) => {
      const target = event.target;
      if (!fields.includes(target as HTMLInputElement)) return;
      const field = target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      if (field === phone && phone?.value.trim()) {
        const normalized = normalizePhone(phone.value.trim());
        if (normalized) phone.value = normalized;
      }
      touched.add(field.name);
      validateField(field);
      updatePhoneRequirement();
    };

    const handleSubmit = (event: SubmitEvent) => {
      submitted = true;
      updateSubject();
      if (phone?.value.trim()) {
        const normalized = normalizePhone(phone.value.trim());
        if (normalized) phone.value = normalized;
      }
      let firstInvalid: (typeof fields)[number] | undefined;
      for (const field of fields) {
        if (!validateField(field) && !firstInvalid) firstInvalid = field;
      }
      updatePhoneRequirement();
      if (firstInvalid) {
        event.preventDefault();
        firstInvalid.focus();
        return;
      }
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending…";
      }
    };

    const handleEmailFix = () => {
      if (!suggestedEmail) return;
      email.value = suggestedEmail;
      touched.add("email");
      updateEmailTypo();
      validateField(email);
      email.focus();
    };

    const resetButton = () => {
      if (!submitButton) return;
      submitButton.disabled = false;
      submitButton.textContent = "Send message →";
    };

    form.addEventListener("input", handleInput);
    form.addEventListener("change", handleInput);
    form.addEventListener("focusout", handleBlur);
    form.addEventListener("submit", handleSubmit);
    emailFix?.addEventListener("click", handleEmailFix);
    window.addEventListener("pageshow", resetButton);
    updateSubject();
    updatePhoneRequirement();
    return () => {
      form.noValidate = originalNoValidate;
      form.removeEventListener("input", handleInput);
      form.removeEventListener("change", handleInput);
      form.removeEventListener("focusout", handleBlur);
      form.removeEventListener("submit", handleSubmit);
      emailFix?.removeEventListener("click", handleEmailFix);
      window.removeEventListener("pageshow", resetButton);
    };
  }, [formId, brandShort]);

  return <input ref={subjectRef} type="hidden" name="subject" defaultValue={`[${brandShort}] New message`} data-remove-prefix />;
}
