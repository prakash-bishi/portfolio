import { getApiBaseUrl } from "./api";

/**
 * Client for POSTing to /api/contact/. This is only ever called from
 * the browser (the contact form is a Client Component), so
 * getApiBaseUrl()'s browser branch is what actually runs here — still
 * reusing it rather than hardcoding NEXT_PUBLIC_API_BASE_URL directly,
 * for consistency with projects.ts and research.ts.
 */

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
  /** Honeypot — must stay empty. See backend/contact/serializers.py. */
  website?: string;
};

export type ContactSubmitResult =
  | { status: "ok" }
  | { status: "error"; fieldErrors?: Record<string, string[]>; message: string }
  | { status: "rate_limited" };

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactSubmitResult> {
  let response: Response;
  try {
    response = await fetch(`${getApiBaseUrl()}/api/contact/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    return {
      status: "error",
      message: "Could not reach the server. Please try again.",
    };
  }

  if (response.status === 201) {
    return { status: "ok" };
  }

  if (response.status === 429) {
    return { status: "rate_limited" };
  }

  if (response.status === 400) {
    const fieldErrors = await response.json().catch(() => undefined);
    return {
      status: "error",
      fieldErrors,
      message: "Please check the form and try again.",
    };
  }

  return {
    status: "error",
    message: "Something went wrong. Please try again shortly.",
  };
}
