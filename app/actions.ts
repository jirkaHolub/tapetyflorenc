"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";

export type SubmitState =
  | { status: "idle" }
  | { status: "error"; message: string };

const MAX_PHOTO_BYTES = 10 * 1024 * 1024;

function escape(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function submitVisualization(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const link1 = String(formData.get("link1") ?? "").trim();
  const link2 = String(formData.get("link2") ?? "").trim();
  const photo = formData.get("roomPhoto");

  if (!firstName || !lastName || !email || !link1) {
    return { status: "error", message: "Vyplň prosím všechna povinná pole." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Zadaný e-mail není platný." };
  }

  if (!(photo instanceof File) || photo.size === 0) {
    return { status: "error", message: "Přilož prosím fotku pokoje." };
  }

  if (photo.size > MAX_PHOTO_BYTES) {
    return { status: "error", message: "Fotka je větší než 10 MB." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.RESEND_TO;

  if (!apiKey || !from || !to) {
    return {
      status: "error",
      message: "Server není nakonfigurován. Zkuste to prosím později.",
    };
  }

  const buffer = Buffer.from(await photo.arrayBuffer());

  const html = `
    <h2>Nová žádost o vizualizaci</h2>
    <p><b>Jméno:</b> ${escape(firstName)} ${escape(lastName)}</p>
    <p><b>E-mail:</b> ${escape(email)}</p>
    <p><b>Tapeta 1:</b> <a href="${escape(link1)}">${escape(link1)}</a></p>
    ${link2 ? `<p><b>Tapeta 2:</b> <a href="${escape(link2)}">${escape(link2)}</a></p>` : ""}
    <p><b>Fotka pokoje:</b> přiloženo (${photo.name})</p>
  `;

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Vizualizace: ${firstName} ${lastName}`,
    html,
    attachments: [
      {
        filename: photo.name || "pokoj.jpg",
        content: buffer,
      },
    ],
  });

  if (error) {
    console.error("Resend send failed", error);
    return {
      status: "error",
      message: "Nepodařilo se odeslat. Zkuste to prosím znovu.",
    };
  }

  redirect("/dekujeme");
}
