"use client";

import { useState, FormEvent, ChangeEvent, FocusEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export type VolunteerFormData = {
  fullName: string;
  email: string;
  phone: string;
  areaOrCommunity: string;
  areasOfInterest: string[];
  availability: string;
  message: string;
  honeypot: string;
};

const initialFormData: VolunteerFormData = {
  fullName: "",
  email: "",
  phone: "",
  areaOrCommunity: "",
  areasOfInterest: [],
  availability: "",
  message: "",
  honeypot: "",
};

const interestOptions = [
  "Community outreach",
  "Event volunteering",
  "Fundraising support",
  "Administrative support",
  "Communications and marketing",
  "Other",
];

const availabilityOptions = [
  "Weekday mornings",
  "Weekday afternoons",
  "Weekday evenings",
  "Weekend mornings",
  "Weekend afternoons",
  "Flexible / varies",
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export function VolunteerForm() {
  const [formData, setFormData] = useState<VolunteerFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<VolunteerFormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof VolunteerFormData, boolean>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldName = name as keyof VolunteerFormData;
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      const currentInterests = formData.areasOfInterest;
      const updatedInterests = checkbox.checked
        ? [...currentInterests, value]
        : currentInterests.filter((v) => v !== value);
      setFormData((prev) => ({ ...prev, areasOfInterest: updatedInterests }));
    } else {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
    }
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement>) => {
    const { name } = e.target;
    const fieldName = name as keyof VolunteerFormData;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, formData[fieldName]);
  };

  const validateField = (name: keyof VolunteerFormData, value: unknown): string | undefined => {
    if (name === "honeypot") return undefined;
    const strValue = String(value ?? "");
    switch (name) {
      case "fullName":
        return strValue.trim().length >= 2 ? undefined : "Full name must be at least 2 characters";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strValue.trim())
          ? undefined
          : "Valid email is required";
      case "phone":
        return strValue.trim().length >= 10 ? undefined : "Phone number is required";
      case "areaOrCommunity":
        return strValue.trim().length >= 2 ? undefined : "Area or community is required";
      case "areasOfInterest":
        return Array.isArray(value) && value.length > 0 ? undefined : "Select at least one area of interest";
      case "availability":
        return strValue.trim().length > 0 ? undefined : "Availability is required";
      case "message":
        return strValue.trim().length >= 10 ? undefined : "Message must be at least 10 characters";
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: Partial<Record<keyof VolunteerFormData, string>> = {};
    let isValid = true;
    (Object.keys(initialFormData) as Array<keyof VolunteerFormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    setErrors(newErrors as Partial<VolunteerFormData>);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(initialFormData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Partial<Record<keyof VolunteerFormData, boolean>>
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
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setStatusMessage(
          "Thank you for your interest in volunteering with Canadian Sheba Foundation. Your registration has been submitted successfully."
        );
        setFormData(initialFormData);
        setTouched({});
      } else {
        setStatus("error");
        setStatusMessage(
          data.details
            ? "Please fix the errors above and try again."
            : data.error ||
              "Something went wrong while sending your registration. Please try again or contact us through WhatsApp."
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "Something went wrong while sending your registration. Please try again or contact us through WhatsApp."
      );
    }
  };

  const isFieldInvalid = (name: keyof VolunteerFormData) =>
    touched[name] && !!errors[name];

  const getFieldError = (name: keyof VolunteerFormData) =>
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
          Submit another registration
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName" className="mb-1.5 block text-sm font-medium">
            Full name <span className="text-destructive" aria-hidden="true">*</span>
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              "focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none transition-colors",
              isFieldInvalid("fullName") ? "border-destructive" : "border-input"
            )}
            aria-invalid={isFieldInvalid("fullName")}
            aria-describedby={isFieldInvalid("fullName") ? "fullName-error" : undefined}
            disabled={status === "submitting"}
            autoComplete="name"
          />
          {getFieldError("fullName") && (
            <p id="fullName-error" className="mt-1 text-sm text-destructive" role="alert">
              {getFieldError("fullName")}
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
            Phone <span className="text-destructive" aria-hidden="true">*</span>
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
          <Label htmlFor="areaOrCommunity" className="mb-1.5 block text-sm font-medium">
            Area / Community <span className="text-destructive" aria-hidden="true">*</span>
          </Label>
          <Input
            id="areaOrCommunity"
            name="areaOrCommunity"
            type="text"
            value={formData.areaOrCommunity}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., Toronto, Scarborough, Mississauga"
            className={cn(
              "focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none transition-colors",
              isFieldInvalid("areaOrCommunity") ? "border-destructive" : "border-input"
            )}
            aria-invalid={isFieldInvalid("areaOrCommunity")}
            aria-describedby={isFieldInvalid("areaOrCommunity") ? "area-error" : undefined}
            disabled={status === "submitting"}
          />
          {getFieldError("areaOrCommunity") && (
            <p id="area-error" className="mt-1 text-sm text-destructive" role="alert">
              {getFieldError("areaOrCommunity")}
            </p>
          )}
        </div>
      </div>

      <div>
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Areas of interest <span className="text-destructive" aria-hidden="true">*</span>
          </legend>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3" role="group" aria-describedby="interests-hint">
            {interestOptions.map((interest) => (
              <label key={interest} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  name="areasOfInterest"
                  value={interest}
                  checked={formData.areasOfInterest.includes(interest)}
                  onCheckedChange={(checked) => {
                    const updated = checked
                      ? [...formData.areasOfInterest, interest]
                      : formData.areasOfInterest.filter((v) => v !== interest);
                    setFormData((prev) => ({ ...prev, areasOfInterest: updated }));
                    if (errors.areasOfInterest) {
                      setErrors((prev) => ({ ...prev, areasOfInterest: undefined }));
                    }
                  }}
                  disabled={status === "submitting"}
                />
                <span className="text-sm">{interest}</span>
              </label>
            ))}
          </div>
          <p id="interests-hint" className="mt-1 text-xs text-muted-foreground">
            Select all that apply
          </p>
          {getFieldError("areasOfInterest") && (
            <p className="mt-1 text-sm text-destructive" role="alert">
              {getFieldError("areasOfInterest")}
            </p>
          )}
        </fieldset>
      </div>

      <div>
        <Label htmlFor="availability" className="mb-1.5 block text-sm font-medium">
          Availability <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
        <Select
          value={formData.availability}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, availability: value }))}
          disabled={status === "submitting"}
        >
          <SelectTrigger
            id="availability"
            name="availability"
            onBlur={(e) => handleBlur(e as React.FocusEvent<HTMLButtonElement>)}
            aria-invalid={isFieldInvalid("availability")}
            aria-describedby={isFieldInvalid("availability") ? "availability-error" : undefined}
          >
            <SelectValue placeholder="Select your typical availability" />
          </SelectTrigger>
          <SelectContent>
            {availabilityOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {getFieldError("availability") && (
          <p id="availability-error" className="mt-1 text-sm text-destructive" role="alert">
            {getFieldError("availability")}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message (optional)
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={4}
          placeholder="Tell us why you're interested in volunteering, any relevant experience, or questions you have."
          className={cn(
            "focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none transition-colors resize-y min-h-[100px]",
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
              Submitting...
            </>
          ) : (
            "Submit Registration"
          )}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Fields marked with <span className="text-destructive" aria-hidden="true">*</span> are required.
      </p>
    </form>
  );
}