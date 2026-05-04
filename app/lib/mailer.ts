import nodemailer from "nodemailer";

// ── Transport ─────────────────────────────────────────────────────────────────
// Configure via environment variables:
//   EMAIL_HOST     e.g. smtp.gmail.com
//   EMAIL_PORT     e.g. 465
//   EMAIL_USER     e.g. admin@kmclalitpur.edu.np
//   EMAIL_PASS     Gmail app password (not your login password)
//   EMAIL_TO       who receives the digest (can be same or different address)

function createTransport() {
  const host = process.env.EMAIL_HOST;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!host || !user || !pass) {
    throw new Error("Email environment variables not configured (EMAIL_HOST, EMAIL_USER, EMAIL_PASS).");
  }

  return nodemailer.createTransport({
    host,
    port: parseInt(process.env.EMAIL_PORT ?? "465", 10),
    secure: (process.env.EMAIL_PORT ?? "465") === "465",
    auth: { user, pass },
  });
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface DigestData {
  total:       number;
  newToday:    number;
  pending:     number;
  verified:    number;
  rejected:    number;
  byStream:    { stream: string; count: number }[];
}

// ── Send digest email ─────────────────────────────────────────────────────────
export async function sendApplicationDigest(data: DigestData) {
  const transport = createTransport();
  const to        = process.env.EMAIL_TO ?? process.env.EMAIL_USER!;
  const now       = new Date().toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const streamRows = data.byStream
    .map((s) => `
      <tr>
        <td style="padding:8px 16px;border-bottom:1px solid #f0f0f0;color:#374151;">${s.stream}</td>
        <td style="padding:8px 16px;border-bottom:1px solid #f0f0f0;font-weight:700;color:#0B1F3A;text-align:right;">${s.count}</td>
      </tr>`)
    .join("");

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f5f0;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#0B1F3A;padding:28px 32px;">
      <p style="margin:0;color:#fbbf24;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">KMC Lalitpur — Admin Digest</p>
      <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;font-weight:700;">Entrance Applications Summary</h1>
      <p style="margin:4px 0 0;color:#8ba7c7;font-size:13px;">${now}</p>
    </div>

    <!-- Stats -->
    <div style="padding:28px 32px 0;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:0 8px 16px 0;width:50%;vertical-align:top;">
            <div style="background:#f7f5f0;border-radius:12px;padding:16px 20px;">
              <p style="margin:0;color:#6b7280;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Total Applications</p>
              <p style="margin:4px 0 0;color:#0B1F3A;font-size:36px;font-weight:800;line-height:1;">${data.total}</p>
            </div>
          </td>
          <td style="padding:0 0 16px 8px;width:50%;vertical-align:top;">
            <div style="background:#fef3c7;border-radius:12px;padding:16px 20px;">
              <p style="margin:0;color:#92400e;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">New Today</p>
              <p style="margin:4px 0 0;color:#b45309;font-size:36px;font-weight:800;line-height:1;">${data.newToday}</p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:0 8px 16px 0;vertical-align:top;">
            <div style="background:#fef9c3;border-radius:12px;padding:16px 20px;">
              <p style="margin:0;color:#713f12;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Pending Verification</p>
              <p style="margin:4px 0 0;color:#ca8a04;font-size:36px;font-weight:800;line-height:1;">${data.pending}</p>
            </div>
          </td>
          <td style="padding:0 0 16px 8px;vertical-align:top;">
            <div style="background:#dcfce7;border-radius:12px;padding:16px 20px;">
              <p style="margin:0;color:#14532d;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Verified</p>
              <p style="margin:4px 0 0;color:#16a34a;font-size:36px;font-weight:800;line-height:1;">${data.verified}</p>
            </div>
          </td>
        </tr>
      </table>

      <!-- By stream -->
      ${data.byStream.length > 0 ? `
      <p style="margin:8px 0 12px;color:#374151;font-weight:700;font-size:14px;">Applications by Stream</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #f0f0f0;border-radius:8px;overflow:hidden;">
        <thead>
          <tr style="background:#f7f5f0;">
            <th style="padding:8px 16px;text-align:left;font-size:11px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Stream</th>
            <th style="padding:8px 16px;text-align:right;font-size:11px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Count</th>
          </tr>
        </thead>
        <tbody>${streamRows}</tbody>
      </table>` : ""}

      <!-- CTA -->
      ${data.pending > 0 ? `
      <div style="margin:24px 0;background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:16px 20px;">
        <p style="margin:0;color:#92400e;font-size:13px;">
          ⚠️ <strong>${data.pending} application${data.pending > 1 ? "s" : ""}</strong> waiting for verification.
        </p>
      </div>` : `
      <div style="margin:24px 0;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;">
        <p style="margin:0;color:#14532d;font-size:13px;">✅ All applications have been reviewed. Great work!</p>
      </div>`}

      <div style="text-align:center;margin:0 0 32px;">
        <a href="${process.env.NEXTAUTH_URL ?? "https://kmclalitpur.edu.np"}/admin/applications"
           style="display:inline-block;background:#0B1F3A;color:#ffffff;font-weight:700;font-size:14px;padding:14px 32px;border-radius:10px;text-decoration:none;">
          Open Admin Panel →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f7f5f0;padding:16px 32px;border-top:1px solid #e5e7eb;">
      <p style="margin:0;color:#9ca3af;font-size:11px;text-align:center;">
        KMC Lalitpur — Kathmandu Model Secondary School, Balkumari, Lalitpur<br>
        This is an automated digest from your admin system.
      </p>
    </div>
  </div>
</body>
</html>`;

  await transport.sendMail({
    from:    `"KMC Admin" <${process.env.EMAIL_USER}>`,
    to,
    subject: `KMC Applications Digest — ${data.newToday} new today, ${data.pending} pending`,
    html,
  });
}
