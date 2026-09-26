/**
 * Date formatting utilities for consistent, accessible date presentation.
 * Uses UTC to ensure statically prerendered pages never shift with the build machine.
 */

/** Standard date format options for event/news display. */
const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
};

/** Date format with time for event start/end times. */
const DATETIME_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
};

/** Short date format for compact displays. */
const SHORT_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
};

/**
 * Formats an ISO date string for display.
 * Uses Canadian English locale and UTC timezone for consistency.
 */
export function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-CA", DATE_FORMAT).format(new Date(iso));
  } catch {
    return iso;
  }
}

/**
 * Formats an ISO datetime string with time for display.
 */
export function formatDateTime(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-CA", DATETIME_FORMAT).format(new Date(iso));
  } catch {
    return iso;
  }
}

/**
 * Formats an ISO date string in short format.
 */
export function formatShortDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-CA", SHORT_DATE_FORMAT).format(new Date(iso));
  } catch {
    return iso;
  }
}

/**
 * Formats an event date range for display.
 * Handles cases with/without end date, with/without time information.
 */
export function formatEventDateRange(
  startsAt: string,
  endsAt: string | null,
  options?: { includeTime?: boolean }
): string {
  const includeTime = options?.includeTime ?? false;
  const startDate = new Date(startsAt);
  const startStr = includeTime ? formatDateTime(startsAt) : formatDate(startsAt);

  if (!endsAt) {
    return startStr;
  }

  const endDate = new Date(endsAt);
  const isSameDay =
    startDate.getUTCFullYear() === endDate.getUTCFullYear() &&
    startDate.getUTCMonth() === endDate.getUTCMonth() &&
    startDate.getUTCDate() === endDate.getUTCDate();

  if (isSameDay) {
    if (includeTime) {
      try {
        const endTime = new Intl.DateTimeFormat("en-CA", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "UTC",
        }).format(endDate);
        return `${formatDate(startsAt)}, ${formatTimeOnly(startDate)} – ${endTime}`;
      } catch {
        return startStr;
      }
    }
    return startStr;
  }

  const endStr = includeTime ? formatDateTime(endsAt) : formatDate(endsAt);
  return `${startStr} – ${endStr}`;
}

/**
 * Extracts time only from an ISO string.
 */
function formatTimeOnly(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(date);
}

/**
 * Checks if an event is upcoming (has not started yet).
 */
export function isEventUpcoming(startsAt: string): boolean {
  return new Date(startsAt).getTime() >= Date.now();
}

/**
 * Checks if an event is currently ongoing.
 */
export function isEventOngoing(startsAt: string, endsAt: string | null): boolean {
  const now = Date.now();
  const start = new Date(startsAt).getTime();
  const end = endsAt ? new Date(endsAt).getTime() : null;
  return start <= now && (end === null || end >= now);
}

/**
 * Checks if an event is past.
 */
export function isEventPast(startsAt: string, endsAt: string | null): boolean {
  if (endsAt) {
    return new Date(endsAt).getTime() < Date.now();
  }
  return new Date(startsAt).getTime() < Date.now();
}

/**
 * Formats a news article date for display.
 * Includes updated date if available and different from published date.
 */
export function formatNewsDate(publishedAt: string, updatedAt: string | null): string {
  const published = formatDate(publishedAt);
  if (!updatedAt) return published;

  try {
    const pubDate = new Date(publishedAt).getTime();
    const updDate = new Date(updatedAt).getTime();
    if (updDate > pubDate) {
      return `Updated ${formatDate(updatedAt)}`;
    }
  } catch {
    // Ignore parsing errors
  }
  return published;
}