"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type VolunteerFormData = {
  fullName: string;
  email: string;
  phone: string;
  areaOrCommunity: string;
  areasOfInterest: string[];
  availability: string;
  message: string;
};

const initialFormData: VolunteerFormData = {
  fullName: "",
  email: "",
  phone: "",
  areaOrCommunity: "",
  areasOfInterest: [],
  availability: "",
  message: "",
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

/**
 * Volunteer registration form (static/presentational only).
 *
 * This form does not submit data anywhere. The submit button is disabled with
 * an explanatory message because Phase 1 has no registration backend.
 *
 * The component is structured so it can later be connected to an endpoint
 * without redesign: controlled inputs, validation state, and a submit handler
 * are already in place.
 */
export function VolunteerForm() {
  const [formData, setFormData] = useState<VolunteerFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<VolunteerFormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof VolunteerFormData, boolean>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
    setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    const fieldName = name as keyof VolunteerFormData;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, formData[fieldName]);
  };

  const validateField = (name: keyof VolunteerFormData, value: unknown): string | undefined => {
    switch (name) {
      case "fullName":
        return value && String(value).trim().length >= 2 ? undefined : "Full name is required";
      case "email":
        return value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))
          ? undefined
          : "Valid email is required";
      case "phone":
        return value && String(value).trim().length >= 10 ? undefined : "Phone number is required";
      case "areaOrCommunity":
        return value && String(value).trim().length >= 2 ? undefined : "Area or community is required";
      case "areasOfInterest":
        return Array.isArray(value) && value.length > 0 ? undefined : "Select at least one area of interest";
      case "availability":
        return value && String(value).trim().length > 0 ? undefined : "Availability is required";
      case "message":
        return value && String(value).trim().length >= 10 ? undefined : "Message must be at least 10 characters";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      console.log("Volunteer form submission (static):", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-1.5">
            Full name <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              "w-full rounded-lg border bg-background px-3 py-2 text-sm",
              "focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none",
              "transition-colors",
              touched.fullName && errors.fullName ? "border-destructive" : "border-input",
              "disabled:opacity-50 disabled:pointer-events-none"
            )}
            aria-invalid={touched.fullName && !!errors.fullName}
            aria-describedby={touched.fullName && errors.fullName ? "fullName-error" : undefined}
            disabled
          />
          {touched.fullName && errors.fullName && (
            <p id="fullName-error" className="mt-1 text-sm text-destructive" role="alert">
              {errors.fullName}
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
            Phone <span className="text-destructive" aria-hidden="true">*</span>
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
          <label htmlFor="areaOrCommunity" className="block text-sm font-medium mb-1.5">
            Area / Community <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="areaOrCommunity"
            name="areaOrCommunity"
            value={formData.areaOrCommunity}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., Toronto, Scarborough, Mississauga"
            className={cn(
              "w-full rounded-lg border bg-background px-3 py-2 text-sm",
              "focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none",
              "transition-colors",
              touched.areaOrCommunity && errors.areaOrCommunity ? "border-destructive" : "border-input",
              "disabled:opacity-50 disabled:pointer-events-none"
            )}
            aria-invalid={touched.areaOrCommunity && !!errors.areaOrCommunity}
            aria-describedby={touched.areaOrCommunity && errors.areaOrCommunity ? "area-error" : undefined}
            disabled
          />
          {touched.areaOrCommunity && errors.areaOrCommunity && (
            <p id="area-error" className="mt-1 text-sm text-destructive" role="alert">
              {errors.areaOrCommunity}
            </p>
          )}
        </div>
      </div>

      <div>
        <fieldset>
          <legend className="block text-sm font-medium mb-2">
            Areas of interest <span className="text-destructive" aria-hidden="true">*</span>
          </legend>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3" role="group" aria-describedby="interests-hint">
            {interestOptions.map((interest) => (
              <label key={interest} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="areasOfInterest"
                  value={interest}
                  checked={formData.areasOfInterest.includes(interest)}
                  onChange={handleChange}
                  className="size-4 rounded border-input text-primary focus:ring-primary"
                  disabled
                />
                <span className="text-sm">{interest}</span>
              </label>
            ))}
          </div>
          <p id="interests-hint" className="mt-1 text-xs text-muted-foreground">
            Select all that apply
          </p>
          {touched.areasOfInterest && errors.areasOfInterest && (
            <p className="mt-1 text-sm text-destructive" role="alert">
              {errors.areasOfInterest}
            </p>
          )}
        </fieldset>
      </div>

      <div>
        <label htmlFor="availability" className="block text-sm font-medium mb-1.5">
          Availability <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <select
          id="availability"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            "w-full rounded-lg border bg-background px-3 py-2 text-sm",
            "focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none",
            "transition-colors",
            touched.availability && errors.availability ? "border-destructive" : "border-input",
            "disabled:opacity-50 disabled:pointer-events-none"
          )}
          aria-invalid={touched.availability && !!errors.availability}
          aria-describedby={touched.availability && errors.availability ? "availability-error" : undefined}
          disabled
        >
          <option value="">Select your typical availability</option>
          {availabilityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {touched.availability && errors.availability && (
          <p id="availability-error" className="mt-1 text-sm text-destructive" role="alert">
            {errors.availability}
          </p>
        )}
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
          rows={4}
          placeholder="Tell us why you're interested in volunteering, any relevant experience, or questions you have."
          className={cn(
            "w-full rounded-lg border bg-background px-3 py-2 text-sm",
            "focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none",
            "transition-colors resize-y min-h-[100px]",
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
          Registration system coming soon
        </Button>
        <span className="text-sm text-muted-foreground">
          This form is for demonstration only. Volunteer registration will be
          available through an external service once confirmed by the Foundation.
        </span>
      </div>

      <p className="text-xs text-muted-foreground">
        Fields marked with <span className="text-destructive" aria-hidden="true">*</span> are required.
        This form does not currently submit data.
      </p>
    </form>
  );
}