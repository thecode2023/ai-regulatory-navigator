/**
 * ExecutiveSummary — Key findings for companies deploying AI internationally
 */
import { useState } from 'react';

const keyFindings = [
  {
    number: '01',
    title: 'The EU AI Act Is Now Binding',
    color: 'text-blue-400',
    border: 'border-blue-400/30',
    bg: 'bg-blue-400/5',
    content: 'The EU AI Act (Regulation EU 2024/1689) is the world\'s first comprehensive AI law and is now in force. Prohibitions on unacceptable-risk AI (social scoring, real-time biometric surveillance) applied from February 2, 2025. Core obligations for high-risk AI systems take full effect August 2, 2026. Any company placing AI systems on the EU market — regardless of where it is headquartered — must comply. Fines reach €35 million or 7% of global annual turnover, whichever is higher.',
  },
  {
    number: '02',
    title: 'US State Laws Are Fragmenting Compliance',
    color: 'text-amber-400',
    border: 'border-amber-400/30',
    bg: 'bg-amber-400/5',
    content: 'In the absence of a federal AI law, US states are enacting their own frameworks. Texas TRAIGA (effective January 1, 2026) imposes fines up to $200,000 per violation for AI intended to manipulate behavior or discriminate. Colorado\'s AI Act (effective June 30, 2026) requires impact assessments for high-risk AI. California\'s SB 942 and AB 2013 mandate training data disclosure and AI content provenance. The March 2026 White House National Policy Framework seeks federal preemption, but until enacted, companies must track each state individually.',
  },
  {
    number: '03',
    title: 'Singapore Pioneered Agentic AI Governance',
    color: 'text-green-400',
    border: 'border-green-400/30',
    bg: 'bg-green-400/5',
    content: 'Singapore\'s Model AI Governance Framework for Agentic AI (January 22, 2026) is the world\'s first governance framework specifically designed for autonomous AI agents. It introduces four governance dimensions: risk bounding before deployment, human accountability structures, technical controls across the lifecycle, and end-user transparency. While currently voluntary, it signals the regulatory direction globally and is the de facto standard for companies deploying multi-agent AI systems in Asia-Pacific.',
  },
  {
    number: '04',
    title: 'Data Protection Laws Are the Hidden AI Compliance Risk',
    color: 'text-purple-400',
    border: 'border-purple-400/30',
    bg: 'bg-purple-400/5',
    content: 'Even in jurisdictions without dedicated AI laws (Australia, UK, India, Indonesia), existing data protection frameworks create binding AI compliance obligations. India\'s DPDP Act (fines up to ₹250 crore / ~$30M) requires explicit consent for AI training data. Indonesia\'s UU PDP (effective October 2024) applies extraterritorially with criminal sanctions. Australia\'s Privacy Act will mandate transparency for automated decision-making from December 10, 2026. Companies must treat privacy compliance as the foundation of their AI governance strategy.',
  },
  {
    number: '05',
    title: 'Extraterritoriality Is the New Normal',
    color: 'text-cyan-400',
    border: 'border-cyan-400/30',
    bg: 'bg-cyan-400/5',
    content: '13 of the 15 jurisdictions surveyed apply their AI or data protection laws to foreign companies serving local users. The EU AI Act, UK GDPR, India\'s DPDP Act, Indonesia\'s UU PDP, and Brazil\'s proposed AI Bill all explicitly extend jurisdiction based on where the AI output is used or where users reside — not where the company is incorporated. A company headquartered in the US deploying an AI agent that serves EU, Brazilian, and Indonesian users simultaneously must comply with all three frameworks. A "highest common denominator" compliance approach is no longer optional — it is the only viable strategy.',
  },
];

export default function ExecutiveSummary() {
  const [expanded, setExpanded] = useState<string | null>('01');

  return (
    <section id="executive-summary" className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-lg font-semibold text-foreground">Executive Summary</h2>
        <div className="h-px flex-1 bg-border"></div>
        <span className="text-xs text-muted-foreground">5 Critical Findings for International AI Deployment</span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl">
        As of March 2026, the global AI regulatory landscape has reached an inflection point. The EU AI Act is now binding, multiple US states have enacted enforceable laws, and data protection regimes worldwide are being applied aggressively to AI systems. Below are the five most critical considerations for any company deploying AI agents internationally.
      </p>

      <div className="space-y-2">
        {keyFindings.map(finding => (
          <div
            key={finding.number}
            className={`border rounded-xl overflow-hidden transition-all ${finding.border} ${expanded === finding.number ? finding.bg : 'border-border bg-card/50'}`}
          >
            <button
              className="w-full px-5 py-4 flex items-center gap-4 text-left"
              onClick={() => setExpanded(expanded === finding.number ? null : finding.number)}
            >
              <span className={`text-2xl font-bold mono ${finding.color} shrink-0`}>{finding.number}</span>
              <span className={`text-sm font-semibold ${expanded === finding.number ? finding.color : 'text-foreground'} flex-1`}>
                {finding.title}
              </span>
              <span className={`text-lg transition-transform ${expanded === finding.number ? 'rotate-180' : ''} text-muted-foreground`}>
                ⌄
              </span>
            </button>
            {expanded === finding.number && (
              <div className="px-5 pb-5">
                <p className="text-sm text-muted-foreground leading-relaxed pl-12">
                  {finding.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
