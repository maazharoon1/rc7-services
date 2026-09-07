"use client";
import { useId, useRef, useState } from "react";
import { business, emailDraft, services } from "../lib/site";
import { Icon } from "./site-icon";
export function EstimateForm({
  initialService = "",
}: {
  initialService?: string;
}) {
  const id = useId();
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState("");
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(
      [...new FormData(event.currentTarget).entries()].map(([key, value]) => [
        key,
        String(value).trim(),
      ]),
    );
    const next: Record<string, string> = {};
    if (!values.name) next.name = "Please enter your name.";
    if (!values.phone || values.phone.replace(/\D/g, "").length < 7)
      next.phone = "Please enter a valid phone number.";
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Please enter a valid email address.";
    if (!services.some((s) => s.name === values.service))
      next.service = "Please choose a service.";
    if (!values.details)
      next.details = "Please tell us a little about your project.";
    setErrors(next);
    if (Object.keys(next).length) {
      setDraft("");
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)
          ?.focus(),
      );
      return;
    }
    const url = emailDraft(values);
    setDraft(url);
    window.location.href = url;
  }
  const field = (
    name: string,
    label: string,
    type = "text",
    optional = false,
  ) => (
    <div className="form-field">
      <label htmlFor={`${id}-${name}`}>
        {label} <span>{optional ? "(optional)" : "*"}</span>
      </label>
      <input
        id={`${id}-${name}`}
        name={name}
        type={type}
        required={!optional}
        autoComplete={
          name === "name"
            ? "name"
            : name === "phone"
              ? "tel"
              : name === "email"
                ? "email"
                : "off"
        }
        maxLength={name === "phone" ? 40 : 150}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${id}-${name}-error` : undefined}
      />
      {errors[name] && (
        <p className="field-error" id={`${id}-${name}-error`}>
          {errors[name]}
        </p>
      )}
    </div>
  );
  return (
    <form className="estimate-form" ref={form} onSubmit={submit} noValidate>
      <h2>
        Get a free estimate<span className="orange">.</span>
      </h2>
      <p className="form-intro">
        A few details. A fresh start. <span>* Required</span>
      </p>
      <div className="form-grid">
        {field("name", "Your name")}
        {field("phone", "Phone number", "tel")}
        {field("email", "Email address", "email", true)}
        <div className="form-field">
          <label htmlFor={`${id}-service`}>Service *</label>
          <select
            key={initialService}
            id={`${id}-service`}
            name="service"
            defaultValue={initialService}
            required
            aria-invalid={!!errors.service}
            aria-describedby={
              errors.service ? `${id}-service-error` : undefined
            }
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.name}>{s.name}</option>
            ))}
          </select>
          {errors.service && (
            <p className="field-error" id={`${id}-service-error`}>
              {errors.service}
            </p>
          )}
        </div>
        <div className="full-field">
          {field("location", "Project location", "text", true)}
        </div>
        <div className="form-field full-field">
          <label htmlFor={`${id}-details`}>Tell us about your project *</label>
          <textarea
            id={`${id}-details`}
            name="details"
            rows={4}
            maxLength={3000}
            required
            placeholder="What would you like to change about your space?"
            aria-invalid={!!errors.details}
            aria-describedby={
              errors.details ? `${id}-details-error` : undefined
            }
          />
          {errors.details && (
            <p className="field-error" id={`${id}-details-error`}>
              {errors.details}
            </p>
          )}
        </div>
      </div>
      <p className="delivery-note">
        This opens your email app with your project details. Review and send the
        email to request your estimate.
      </p>
      <button className="button form-submit" type="submit">
        Prepare My Estimate Email <Icon name="diagonal" />
      </button>
      {draft && (
        <p role="status" className="draft-status">
          Your email draft is ready. Nothing has been sent or stored by this
          website. <a href={draft}>Open the draft again</a> if your email app
          didn’t open.
        </p>
      )}
      <p className="form-alternative">
        Prefer to reach out directly?{" "}
        <a href={`mailto:${business.email}`}>Email Isaid</a> or{" "}
        <a href={business.call}>Call Now</a>.
      </p>
    </form>
  );
}
