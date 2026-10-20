"use client";

import { useEffect } from "react";

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

export default function ContactFormBehavior({ formId, queryTopics }: { formId: string; queryTopics?: Record<string, string> }) {
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
    const emailTypo = document.getElementById(`${formId}-email-typo`);
    const emailFix = form.querySelector<HTMLButtonElement>(`#${formId}-email-fix`);
    const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const fields = [name, email, ...(phone ? [phone] : []), message];
    const touched = new Set<string>();
    let submitted = false;
    let suggestedEmail = "";
    const originalNoValidate = form.noValidate;
    form.noValidate = true;

    const queryTopic = new URLSearchParams(window.location.search).get("topic");
    const selectedTopic = queryTopic && queryTopics?.[queryTopic];
    if (selectedTopic && Array.from(topic.options).some((option) => option.value === selectedTopic)) {
      topic.value = selectedTopic;
    }

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
          if (Array.from(value).length < 2 || Array.from(value).length > 60) error = "Please enter your name.";
          break;
        case "email":
          if (!EMAIL_PATTERN.test(value) || email.validity.typeMismatch) error = "Please enter a valid email, like name@gmail.com.";
          break;
        case "phone":
          if (value && (!/^\+?[\d() .-]+$/.test(value) || !/^\d{7,15}$/.test(value.replace(/\D/g, "")))) {
            error = "Please enter a phone number with 7–15 digits, or leave it blank.";
          }
          break;
        case "message":
          if (Array.from(value).length < 10) error = "Please tell us a little more (at least 10 characters).";
          break;
      }
      setError(field, error);
      return !error;
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
      if (target === email) updateEmailTypo();
      if (fields.includes(target as HTMLInputElement) && (submitted || touched.has((target as HTMLInputElement).name))) {
        validateField(target as HTMLInputElement);
      }
    };

    const handleBlur = (event: FocusEvent) => {
      const target = event.target;
      if (!fields.includes(target as HTMLInputElement)) return;
      const field = target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      touched.add(field.name);
      validateField(field);
    };

    const handleSubmit = (event: SubmitEvent) => {
      submitted = true;
      let firstInvalid: (typeof fields)[number] | undefined;
      for (const field of fields) {
        if (!validateField(field) && !firstInvalid) firstInvalid = field;
      }
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
    return () => {
      form.noValidate = originalNoValidate;
      form.removeEventListener("input", handleInput);
      form.removeEventListener("change", handleInput);
      form.removeEventListener("focusout", handleBlur);
      form.removeEventListener("submit", handleSubmit);
      emailFix?.removeEventListener("click", handleEmailFix);
      window.removeEventListener("pageshow", resetButton);
    };
  }, [formId, queryTopics]);

  return null;
}
