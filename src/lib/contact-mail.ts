import nodemailer from "nodemailer";

type ContactMailPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function createTransport() {
  const host = requiredEnv("SMTP_HOST");
  const port = Number(requiredEnv("SMTP_PORT"));

  if (!Number.isFinite(port) || port <= 0) {
    throw new Error("SMTP_PORT must be a valid port number");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: {
      user: requiredEnv("SMTP_USER"),
      pass: requiredEnv("SMTP_PASS"),
    },
  });
}

function mailFrom() {
  const fromEmail = requiredEnv("CONTACT_FROM_EMAIL");
  const fromName = process.env.CONTACT_FROM_NAME?.trim() || "Jibril Nuredin";

  return `${fromName} <${fromEmail}>`;
}

export async function sendContactEmails(payload: ContactMailPayload) {
  const transport = createTransport();
  const toEmail = requiredEnv("CONTACT_TO_EMAIL");
  const from = mailFrom();
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeSubject = escapeHtml(payload.subject);
  const safeMessage = escapeHtml(payload.message).replaceAll("\n", "<br />");

  const ownerSubject = `[Portfolio Contact] ${payload.subject}`;
  const ownerText = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject}`,
    "",
    payload.message,
  ].join("\n");

  const autoReplySubject = "Thanks for reaching out";
  const autoReplyText = [
    `Hi ${payload.name},`,
    "",
    "Thanks for reaching out. I received your message and will get back to you within 48 hours.",
    "",
    "Best,",
    "Jibril Nuredin",
  ].join("\n");

  const ownerMail = await transport.sendMail({
    from,
    to: toEmail,
    replyTo: payload.email,
    subject: ownerSubject,
    text: ownerText,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h2 style="margin:0 0 16px">New contact message</h2>
        <p style="margin:0 0 8px"><strong>Name:</strong> ${safeName}</p>
        <p style="margin:0 0 8px"><strong>Email:</strong> ${safeEmail}</p>
        <p style="margin:0 0 16px"><strong>Subject:</strong> ${safeSubject}</p>
        <div style="padding:16px;border:1px solid #e5e7eb;border-radius:12px;background:#f9fafb;white-space:pre-wrap">${safeMessage}</div>
      </div>
    `,
  });

  const autoReplyMail = await transport.sendMail({
    from,
    to: payload.email,
    subject: autoReplySubject,
    text: autoReplyText,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <p>Hi ${safeName},</p>
        <p>Thanks for reaching out. I received your message and will get back to you within 48 hours.</p>
        <p>Best,<br />Jibril Nuredin</p>
      </div>
    `,
  });

  return {
    ownerMessageId: ownerMail.messageId,
    autoReplyMessageId: autoReplyMail.messageId,
  };
}