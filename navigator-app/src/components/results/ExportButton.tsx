"use client";

import { Download } from "lucide-react";
import type { IntakeFormData, RiskAssessment } from "@/lib/types";

export function ExportButton({
  assessments,
  formData,
}: {
  assessments: RiskAssessment[];
  formData: IntakeFormData;
}) {
  const exportPdf = () => {
    // Build a printable HTML document and trigger window.print()
    const avgScore = Math.round(
      assessments.reduce((sum, a) => sum + a.riskScore, 0) / assessments.length
    );

    const jurisdictionRows = assessments
      .map(
        (a) =>
          `<tr>
            <td style="padding:8px;border-bottom:1px solid #e2e8f0">${a.regulation.flag} ${a.regulation.jurisdiction}</td>
            <td style="padding:8px;border-bottom:1px solid #e2e8f0">${a.regulation.lawName}</td>
            <td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:bold;color:${
              a.riskLevel === "Critical"
                ? "#ef4444"
                : a.riskLevel === "High"
                  ? "#f59e0b"
                  : a.riskLevel === "Medium"
                    ? "#3b82f6"
                    : "#22c55e"
            }">${a.riskScore} (${a.riskLevel})</td>
            <td style="padding:8px;border-bottom:1px solid #e2e8f0">${a.regulation.status}</td>
            <td style="padding:8px;border-bottom:1px solid #e2e8f0">${a.regulation.penalties.amount}</td>
          </tr>`
      )
      .join("");

    const checklistHtml = assessments
      .flatMap((a) =>
        a.checklistItems.map(
          (item) =>
            `<tr>
              <td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;font-size:11px;font-weight:bold;color:${
                item.priority === "Critical"
                  ? "#ef4444"
                  : item.priority === "High"
                    ? "#f59e0b"
                    : item.priority === "Medium"
                      ? "#3b82f6"
                      : "#22c55e"
              }">${item.priority}</td>
              <td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;font-size:11px">${a.regulation.flag} ${a.regulation.jurisdiction}</td>
              <td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;font-size:12px">${item.text}</td>
            </tr>`
        )
      )
      .join("");

    const html = `<!DOCTYPE html>
<html>
<head>
  <title>AI Regulatory Risk Report</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a2e; margin: 40px; line-height: 1.5; }
    h1 { font-size: 24px; margin-bottom: 4px; }
    h2 { font-size: 18px; margin-top: 32px; margin-bottom: 12px; color: #334155; }
    .meta { color: #64748b; font-size: 13px; margin-bottom: 24px; }
    .summary { display: flex; gap: 24px; margin-bottom: 24px; }
    .metric { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px 20px; }
    .metric .label { font-size: 11px; color: #64748b; text-transform: uppercase; }
    .metric .value { font-size: 28px; font-weight: 700; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th { text-align: left; padding: 8px; background: #f1f5f9; border-bottom: 2px solid #e2e8f0; font-size: 11px; text-transform: uppercase; color: #64748b; }
    @media print { body { margin: 20px; } }
  </style>
</head>
<body>
  <h1>AI Regulatory Risk Report</h1>
  <div class="meta">
    Generated ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
    &bull; ${formData.industry}
    &bull; ${assessments.length} jurisdictions
    &bull; ${formData.usesAutonomousAgents ? "Uses autonomous agents" : "No autonomous agents"}
  </div>

  <div class="summary">
    <div class="metric"><div class="label">Avg Risk Score</div><div class="value">${avgScore}</div></div>
    <div class="metric"><div class="label">Critical</div><div class="value" style="color:#ef4444">${assessments.filter((a) => a.riskLevel === "Critical").length}</div></div>
    <div class="metric"><div class="label">High</div><div class="value" style="color:#f59e0b">${assessments.filter((a) => a.riskLevel === "High").length}</div></div>
    <div class="metric"><div class="label">Total Jurisdictions</div><div class="value">${assessments.length}</div></div>
  </div>

  <h2>Risk by Jurisdiction</h2>
  <table>
    <thead><tr><th>Jurisdiction</th><th>Regulation</th><th>Risk Score</th><th>Status</th><th>Max Penalty</th></tr></thead>
    <tbody>${jurisdictionRows}</tbody>
  </table>

  <h2>Compliance Checklist</h2>
  <table>
    <thead><tr><th>Priority</th><th>Jurisdiction</th><th>Requirement</th></tr></thead>
    <tbody>${checklistHtml}</tbody>
  </table>

  <div style="margin-top:40px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8">
    AI Regulatory Navigator &bull; This report is informational only and does not constitute legal advice.
  </div>
</body>
</html>`;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.onload = () => printWindow.print();
    }
  };

  return (
    <button
      onClick={exportPdf}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-navy-800 hover:bg-navy-700 text-slate-300 rounded-lg border border-navy-700 transition-colors"
    >
      <Download className="w-4 h-4" />
      Export PDF
    </button>
  );
}
