"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const subjectOptions = [
  "General inquiry",
  "Program information",
  "Volunteer opportunities",
  "Donation questions",
  "Partnership inquiry",
  "Media request",
  "Other",
];

/**
 * Contact form (static/presentational only).
 *
 * This form does not submit data anywhere. The submit button is disabled with
 * an explanatory message because Phase 1 has no contact form backend.
 *
 * The component is structured so it can later be connected to an endpoint
 * without redesign: controlled inputs, validation state, and a submit handler
 * are already in place.
 */
export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormData;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    const fieldName = name as keyof ContactFormData;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, formData[fieldName]);
  };

  const validateField = (name: keyof ContactFormData, value: unknown): string | undefined => {
    switch (name) {
      case "name":
        return value && String(value).trim().length >= 2 ? undefined : "Name is required";
      case "email":
        return value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))
          ? undefined
          : "Valid email is required";
      case "phone":
        return value && String(value).trim().length >= 10 ? undefined : undefined; // optional
      case "subject":
        return value && String(value).trim().length > 0 ? undefined : "Subject is required";
      case "message":
        return value && String(value).trim().length >= 10 ? undefined : "Message must be at least 10 characters";
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    let isValid = true;
    (Object.keys(initialFormData) as Array<keyof ContactFormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      console.log("Contact form submission (static):", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5">
            Name <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              "w-full rounded-lg border bg-background px-3 py-2 text-sm",
              "focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none",
              "transition-colors",
              touched.name && errors.name ? "border-destructive" : "border-input",
              "disabled:opacity-50 disabled:pointer-events-none"
            )}
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={touched.name && errors.name ? "name-error" : undefined}
            disabled
          />
          {touched.name && errors.name && (
            <p id="name-error" className="mt-1 text-sm text-destructive" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            Email <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              "w-full rounded-lg border bg-background px-3 py-2 text-sm",
              "focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none",
              "transition-colors",
              touched.email && errors.email ? "border-destructive" : "border-input",
              "disabled:opacity-50 disabled:pointer-events-none"
            )}
            aria-invalid={touched.email && !!errors.email}
            aria-describedby={touched.email && errors.email ? "email-error" : undefined}
            disabled
          />
          {touched.email && errors.email && (
            <p id="email-error" className="mt-1 text-sm text-destructive" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
            Phone (optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              "w-full rounded-lg border bg-background px-3 py-2 text-sm",
              "focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none",
              "transition-colors",
              touched.phone && errors.phone ? "border-destructive" : "border-input",
              "disabled:opacity-50 disabled:pointer-events-none"
            )}
            aria-invalid={touched.phone && !!errors.phone}
            aria-describedby={touched.phone && errors.phone ? "phone-error" : undefined}
            disabled
          />
          {touched.phone && errors.phone && (
            <p id="phone-error" className="mt-1 text-sm text-destructive" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1.5">
            Subject <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              "w-full rounded-lg border bg-background px-3 py-2 text-sm",
              "focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none",
              "transition-colors",
              touched.subject && errors.subject ? "border-destructive" : "border-input",
              "disabled:opacity-50 disabled:pointer-events-none"
            )}
            aria-invalid={touched.subject && !!errors.subject}
            aria-describedby={touched.subject && errors.subject ? "subject-error" : undefined}
            disabled
          >
            <option value="">Select a subject</option>
            {subjectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {touched.subject && errors.subject && (
            <p id="subject-error" className="mt-1 text-sm text-destructive" role="alert">
              {errors.subject}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5">
          Message <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={5}
          placeholder="Please describe your inquiry in detail."
          className={cn(
            "w-full rounded-lg border bg-background px-3 py-2 text-sm",
            "focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none",
            "transition-colors resize-y min-h-[120px]",
            touched.message && errors.message ? "border-destructive" : "border-input",
            "disabled:opacity-50 disabled:pointer-events-none"
          )}
          aria-invalid={touched.message && !!errors.message}
          aria-describedby={touched.message && errors.message ? "message-error" : undefined}
          disabled
        />
        {touched.message && errors.message && (
          <p id="message-error" className="mt-1 text-sm text-destructive" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" size="lg" disabled className="w-full sm:w-auto">
          Contact form coming soon
        </Button>
        <span className="text-sm text-muted-foreground">
          This form is for demonstration only. The contact form will be
          functional once the Foundation confirms its contact details.
        </span>
      </div>

      <p className="text-xs text-muted-foreground">
        Fields marked with <span className="text-destructive" aria-hidden="true">*</span> are required.
        This form does not currently submit data.
      </p>
    </form>
  );
}