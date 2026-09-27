"use client";

import { useState, FormEvent, ChangeEvent, FocusEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  honeypot: string;
};

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  honeypot: "",
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

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldName = name as keyof ContactFormData;
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [fieldName]: checkbox.checked ? "true" : "" }));
    } else {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
    }
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement>) => {
    const { name } = e.target;
    const fieldName = name as keyof ContactFormData;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, formData[fieldName]);
  };

  const validateField = (name: keyof ContactFormData, value: unknown): string | undefined => {
    if (name === "honeypot") return undefined;
    const strValue = String(value ?? "");
    switch (name) {
      case "name":
        return strValue.trim().length >= 2 ? undefined : "Name must be at least 2 characters";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strValue.trim())
          ? undefined
          : "Valid email is required";
      case "phone":
        return strValue.trim().length <= 30 ? undefined : "Phone number is too long";
      case "subject":
        return strValue.trim().length > 0 ? undefined : "Subject is required";
      case "message":
        return strValue.trim().length >= 10 ? undefined : "Message must be at least 10 characters";
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(initialFormData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Partial<Record<keyof ContactFormData, boolean>>
    );
    setTouched(allTouched);

    if (!validateAll()) {
      setStatus("error");
      setStatusMessage("Please fix the errors above and try again.");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setStatusMessage(
          "Thank you for contacting Canadian Sheba Foundation. Your message has been sent successfully."
        );
        setFormData(initialFormData);
        setTouched({});
      } else {
        setStatus("error");
        setStatusMessage(
          data.details
            ? "Please fix the errors above and try again."
            : data.error ||
              "Something went wrong while sending your message. Please try again or contact us through WhatsApp."
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "Something went wrong while sending your message. Please try again or contact us through WhatsApp."
      );
    }
  };

  const isFieldInvalid = (name: keyof ContactFormData) =>
    touched[name] && !!errors[name];

  const getFieldError = (name: keyof ContactFormData) =>
    touched[name] ? errors[name] : undefined;

  if (status === "success") {
    return (
      <div className="flex flex-col gap-4" role="status" aria-live="polite">
        <div
          className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200"
          role="alert"
        >
          <CheckCircle className="size-6 text-green-600 shrink-0" aria-hidden="true" />
          <p className="text-green-800 text-base">{statusMessage}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setStatus("idle");
            setStatusMessage("");
          }}
          className="w-full sm:w-auto"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name <span className="text-destructive" aria-hidden="true">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              "focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none transition-colors",
              isFieldInvalid("name") ? "border-destructive" : "border-input"
            )}
            aria-invalid={isFieldInvalid("name")}
            aria-describedby={isFieldInvalid("name") ? "name-error" : undefined}
            disabled={status === "submitting"}
            autoComplete="name"
          />
          {getFieldError("name") && (
            <p id="name-error" className="mt-1 text-sm text-destructive" role="alert">
              {getFieldError("name")}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email <span className="text-destructive" aria-hidden="true">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              "focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none transition-colors",
              isFieldInvalid("email") ? "border-destructive" : "border-input"
            )}
            aria-invalid={isFieldInvalid("email")}
            aria-describedby={isFieldInvalid("email") ? "email-error" : undefined}
            disabled={status === "submitting"}
            autoComplete="email"
          />
          {getFieldError("email") && (
            <p id="email-error" className="mt-1 text-sm text-destructive" role="alert">
              {getFieldError("email")}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
            Phone (optional)
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              "focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none transition-colors",
              isFieldInvalid("phone") ? "border-destructive" : "border-input"
            )}
            aria-invalid={isFieldInvalid("phone")}
            aria-describedby={isFieldInvalid("phone") ? "phone-error" : undefined}
            disabled={status === "submitting"}
            autoComplete="tel"
            placeholder="+1 (555) 000-0000"
          />
          {getFieldError("phone") && (
            <p id="phone-error" className="mt-1 text-sm text-destructive" role="alert">
              {getFieldError("phone")}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
            Subject <span className="text-destructive" aria-hidden="true">*</span>
          </Label>
          <Select
            value={formData.subject}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, subject: value }))}
            disabled={status === "submitting"}
          >
            <SelectTrigger
              id="subject"
              name="subject"
              onBlur={(e) => handleBlur(e as React.FocusEvent<HTMLButtonElement>)}
              aria-invalid={isFieldInvalid("subject")}
              aria-describedby={isFieldInvalid("subject") ? "subject-error" : undefined}
            >
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              {subjectOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {getFieldError("subject") && (
            <p id="subject-error" className="mt-1 text-sm text-destructive" role="alert">
              {getFieldError("subject")}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={5}
          placeholder="Please describe your inquiry in detail."
          className={cn(
            "focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none transition-colors resize-y min-h-[120px]",
            isFieldInvalid("message") ? "border-destructive" : "border-input"
          )}
          aria-invalid={isFieldInvalid("message")}
          aria-describedby={isFieldInvalid("message") ? "message-error" : undefined}
          disabled={status === "submitting"}
        />
        {getFieldError("message") && (
          <p id="message-error" className="mt-1 text-sm text-destructive" role="alert">
            {getFieldError("message")}
          </p>
        )}
      </div>

      {/* Honeypot field - hidden from users but visible to bots */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
        aria-hidden="true"
      />

      {status === "error" && (
        <div
          className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="size-5 text-destructive shrink-0" aria-hidden="true" />
          <p className="text-destructive text-sm">{statusMessage}</p>
        </div>
      )}

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Fields marked with <span className="text-destructive" aria-hidden="true">*</span> are required.
      </p>
    </form>
  );
}