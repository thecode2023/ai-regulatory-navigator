import type { Regulation } from "./types";

export const regulations: Regulation[] = [
  {
    id: "eu",
    jurisdiction: "European Union",
    region: "Europe",
    flag: "\u{1F1EA}\u{1F1FA}",
    lawName: "EU AI Act",
    billNumber: "Regulation (EU) 2024/1689",
    status: "Enacted",
    effectiveDate: "Aug 2, 2026 (core); Feb 2, 2025 (prohibitions)",
    riskClassification: "Unacceptable / High / Limited / Minimal",
    keyRequirements: [
      "Registration in EU database for high-risk AI systems",
      "Conformity assessments before market placement",
      "Mandatory human oversight mechanisms",
      "Transparency and explainability obligations",
      "Quality management systems (QMS) for high-risk AI",
      "Post-market monitoring and incident reporting",
      "Prohibited practices: social scoring, real-time biometric surveillance",
    ],
    penalties: {
      amount: "Up to \u20AC35M or 7% of global annual turnover",
      maxFineUSD: 38000000,
      enforcementBody:
        "EU AI Office + National Market Surveillance Authorities",
    },
    autonomousAgents: {
      addressed: true,
      details:
        "Covered under General Purpose AI (GPAI) model provisions and high-risk categories depending on use case. GPAI providers must publish technical documentation and comply with copyright law.",
    },
    crossBorder: {
      applies: true,
      details:
        "Applies to providers placing AI systems on the EU market and deployers using AI in the EU, regardless of where the provider is established.",
    },
    sources: [
      {
        title: "EU AI Act Implementation Timeline",
        url: "https://artificialintelligenceact.eu/implementation-timeline/",
      },
      {
        title: "EU AI Act Article 99: Penalties",
        url: "https://artificialintelligenceact.eu/article/99/",
      },
    ],
    lastUpdated: "March 2026",
  },
  {
    id: "us-federal",
    jurisdiction: "United States \u2014 Federal",
    region: "North America",
    flag: "\u{1F1FA}\u{1F1F8}",
    lawName: "National Policy Framework for AI",
    billNumber: "Executive Order 14365 (Dec 2025) + Framework (Mar 2026)",
    status: "Proposed",
    effectiveDate: "N/A (Legislative framework proposed March 20, 2026)",
    riskClassification: "None formalized (sector-specific approach)",
    keyRequirements: [
      "Protecting children from AI harms (age assurance, parental controls)",
      "Combating AI-enabled scams and fraud",
      "Streamlining AI data center construction",
      "Protecting intellectual property and copyright",
      "Establishing regulatory sandboxes for AI testing",
      "Federal preemption of conflicting state AI laws",
    ],
    penalties: {
      amount: "N/A (pending legislation)",
      maxFineUSD: null,
      enforcementBody: "N/A (pending)",
    },
    autonomousAgents: {
      addressed: false,
      details:
        "Not specifically addressed. Framework focuses on frontier AI models, children's safety, and consumer protection rather than autonomous agents.",
    },
    crossBorder: {
      applies: false,
      details:
        "Primarily focused on domestic policy and preempting state laws. No explicit extraterritorial provisions in current framework.",
    },
    sources: [
      {
        title: "White House National Policy Framework for AI",
        url: "https://www.dlapiper.com/en-us/insights/publications/2026/03/white-house-releases-the-national-policy-framework-for-ai-key-points",
      },
    ],
    lastUpdated: "March 2026",
  },
  {
    id: "us-colorado",
    jurisdiction: "United States \u2014 Colorado",
    region: "North America",
    flag: "\u{1F1FA}\u{1F1F8}",
    lawName: "Colorado Artificial Intelligence Act",
    billNumber: "SB 24-205",
    status: "Enacted (Delayed)",
    effectiveDate: "June 30, 2026 (delayed from Feb 1, 2026)",
    riskClassification: "High-Risk vs. Non-High-Risk",
    keyRequirements: [
      "Duty of reasonable care to protect consumers from algorithmic discrimination",
      "Algorithmic impact assessments for high-risk AI systems",
      "Consumer notifications when high-risk AI is used in consequential decisions",
      "Risk management policies and governance programs",
      "Disclosure obligations to consumers about AI use",
    ],
    penalties: {
      amount: "Enforced by Colorado AG under consumer protection laws",
      maxFineUSD: null,
      enforcementBody: "Colorado Attorney General",
    },
    autonomousAgents: {
      addressed: false,
      details:
        "Not specifically named as \"autonomous agents.\" Covered if the system qualifies as high-risk AI under the Act's definition (consequential decisions in employment, housing, finance, healthcare, education).",
    },
    crossBorder: {
      applies: true,
      details:
        "Applies to developers and deployers doing business in Colorado, regardless of where they are headquartered.",
    },
    sources: [
      {
        title: "Colorado AI Act Compliance Guide",
        url: "https://stackcybersecurity.com/posts/ai-colorado-laws",
      },
      {
        title: "Colorado's Landmark AI Law Coming Online",
        url: "https://www.bhfs.com/insight/colorados-landmark-ai-law-coming-online-what-developers-and-deployers-should-know/",
      },
    ],
    lastUpdated: "March 2026",
  },
  {
    id: "us-illinois",
    jurisdiction: "United States \u2014 Illinois",
    region: "North America",
    flag: "\u{1F1FA}\u{1F1F8}",
    lawName: "AI Video Interview Act (AIVI) + BIPA",
    billNumber: "AIVI (820 ILCS 42) + BIPA (740 ILCS 14)",
    status: "In Effect",
    effectiveDate: "Jan 1, 2020 (AIVI); 2008 (BIPA); Jan 1, 2026 (AIVI amendments)",
    riskClassification: "None (use-case specific)",
    keyRequirements: [
      "AIVI: Explicit written consent required before AI video interview analysis",
      "AIVI: Notify applicants of AI use and characteristics being assessed",
      "AIVI: Provide option to request human review of AI-analyzed interviews",
      "BIPA: Written consent before collecting biometric identifiers (fingerprints, voiceprints, face geometry)",
      "BIPA: Published retention and destruction schedule for biometric data",
      "Illinois Human Rights Act (IHRA): Prohibits discriminatory employment decisions using AI (effective Jan 1, 2025)",
    ],
    penalties: {
      amount: "BIPA: $1,000\u2013$5,000 per violation; AIVI: $375\u2013$1,500 per violation",
      maxFineUSD: 5000,
      enforcementBody: "Illinois AG + Private right of action (BIPA)",
    },
    autonomousAgents: {
      addressed: false,
      details:
        "No, focuses on specific use cases: AI in video interviews (AIVI) and biometric data collection (BIPA). Does not address general autonomous AI agents.",
    },
    crossBorder: {
      applies: true,
      details:
        "Applies to any company hiring Illinois residents or collecting biometric data from Illinois residents, regardless of company location.",
    },
    sources: [
      {
        title: "Illinois AI Video Interview Law Takes Effect",
        url: "https://introl.com/blog/illinois-ai-video-interview-law-employer-notification-2026",
      },
      {
        title: "AI Note-Takers, Biometric Privacy, and BIPA",
        url: "https://www.sgrlaw.com/client-alerts/ai-note-takers-biometric-privacy-and-the-battle-over-bipa-damages-what-businesses-need-to-know-now/",
      },
    ],
    lastUpdated: "March 2026",
  },
  {
    id: "us-california",
    jurisdiction: "United States \u2014 California",
    region: "North America",
    flag: "\u{1F1FA}\u{1F1F8}",
    lawName: "CA AI Transparency Act (SB 942) & AB 2013",
    billNumber: "SB 942 + AB 2013 (SB 1047 vetoed Sep 2024)",
    status: "Enacted",
    effectiveDate: "Aug 2, 2026 (SB 942); Jan 1, 2026 (AB 2013)",
    riskClassification: "None (transparency-focused)",
    keyRequirements: [
      "SB 942: Covered GenAI providers must offer free AI content detection tools",
      "SB 942: Embed provenance data (metadata) in AI-generated content",
      "AB 2013: Disclose training data details for generative AI systems",
      "SB 53: Incident reporting for large AI developers; establish safety protocols",
      "AB 316: AI used in defense/national security must meet transparency standards",
      "AB 489: AI providing health advice must include disclaimers",
    ],
    penalties: {
      amount: "Civil penalties enforced by California AG; amounts vary by bill",
      maxFineUSD: null,
      enforcementBody: "California Attorney General",
    },
    autonomousAgents: {
      addressed: false,
      details:
        "No. Current enacted laws focus on generative AI transparency and training data disclosure. The vetoed SB 1047 would have addressed frontier AI safety more broadly.",
    },
    crossBorder: {
      applies: true,
      details:
        "Applies to companies doing business in California or providing AI services to California residents.",
    },
    sources: [
      {
        title: "Signed and Vetoed California AI Bills",
        url: "https://calawyers.org/privacy-law/signed-and-vetoed-california-ai-privacy-and-technology-related-bills/",
      },
      {
        title: "California AI Transparency Laws SB 942 & AB 2013",
        url: "https://trustarc.com/resource/california-ai-transparency-laws-sb942-ab2013/",
      },
    ],
    lastUpdated: "March 2026",
  },
  {
    id: "us-connecticut",
    jurisdiction: "United States \u2014 Connecticut",
    region: "North America",
    flag: "\u{1F1FA}\u{1F1F8}",
    lawName: "Act Concerning Artificial Intelligence (SB 2)",
    billNumber: "SB 2 (2025 session) / SB 5 (2026 session)",
    status: "Proposed",
    effectiveDate: "N/A (Proposed Oct 1, 2026 if enacted)",
    riskClassification: "High-Risk vs. Non-High-Risk",
    keyRequirements: [
      "Reasonable care obligations for developers and deployers of high-risk AI",
      "Algorithmic impact assessments for high-risk AI systems",
      "Consumer disclosures when AI is used in consequential decisions",
      "AI regulatory sandbox program for controlled testing",
      "Connecticut AI Academy for digital literacy",
      "Disclosure requirement for AI training data (CTDPA amendment, effective Jul 1, 2026)",
    ],
    penalties: {
      amount: "N/A (pending)",
      maxFineUSD: null,
      enforcementBody: "Connecticut AG (proposed)",
    },
    autonomousAgents: {
      addressed: false,
      details:
        "Not specifically named. Would be covered if classified as high-risk AI under the proposed definitions.",
    },
    crossBorder: {
      applies: true,
      details:
        "Would apply to developers and deployers doing business in Connecticut or with Connecticut residents.",
    },
    sources: [
      {
        title: "CT SB 2 Bill Text",
        url: "https://www.cga.ct.gov/asp/CGABillStatus/cgabillstatus.asp?selBillType=Bill&bill_num=SB2",
      },
      {
        title: "CT Lawmakers Consider AI Regulation",
        url: "https://www.wshu.org/connecticut-news/2026-03-05/ct-ai-regulation-online-safety-bills",
      },
    ],
    lastUpdated: "March 2026",
  },
  {
    id: "us-texas",
    jurisdiction: "United States \u2014 Texas",
    region: "North America",
    flag: "\u{1F1FA}\u{1F1F8}",
    lawName: "Texas Responsible AI Governance Act (TRAIGA)",
    billNumber: "HB 149 (signed Jun 22, 2025)",
    status: "Enacted",
    effectiveDate: "January 1, 2026",
    riskClassification: "Intent-based (prohibits specific harmful intents)",
    keyRequirements: [
      "Prohibits AI intended to manipulate behavior to incite self-harm, harm to others, or criminal activity",
      "Prohibits AI intended to unlawfully discriminate against protected classes",
      "Prohibits AI intended to violate constitutional rights",
      "Prohibits AI intended to produce or distribute child sexual abuse material (CSAM)",
      "Establishes Texas AI Council for oversight and guidance",
      "Creates 36-month regulatory sandbox program for AI testing",
    ],
    penalties: {
      amount:
        "$10,000\u2013$200,000 per violation; $2,000\u2013$40,000/day for continued violations",
      maxFineUSD: 200000,
      enforcementBody:
        "Texas Attorney General (exclusive enforcement; no private right of action)",
    },
    autonomousAgents: {
      addressed: false,
      details:
        "Not specifically named. The broad definition of AI systems (machine-based systems that infer from inputs to generate outputs) would cover autonomous agents if they engage in prohibited conduct.",
    },
    crossBorder: {
      applies: true,
      details:
        "Explicitly applies to any person or entity doing business in Texas or with Texas residents, extending jurisdiction far beyond state borders.",
    },
    sources: [
      {
        title: "TRAIGA Analysis \u2014 Blank Rome",
        url: "https://www.blankrome.com/publications/new-ai-regulations-come-play-texas-responsible-artificial-intelligence-governance-act",
      },
      {
        title: "Texas Signs Responsible AI Governance Act",
        url: "https://www.lw.com/en/insights/texas-signs-responsible-ai-governance-act-into-law",
      },
    ],
    lastUpdated: "March 2026",
  },
  {
    id: "canada",
    jurisdiction: "Canada",
    region: "North America",
    flag: "\u{1F1E8}\u{1F1E6}",
    lawName: "Artificial Intelligence and Data Act (AIDA)",
    billNumber: "Bill C-27 (died on order paper Jan 2025)",
    status: "Draft",
    effectiveDate: "N/A (Bill died Jan 5, 2025 upon Parliament prorogation)",
    riskClassification: "High-impact AI systems",
    keyRequirements: [
      "Proposed: Identify and mitigate risks for high-impact AI systems",
      "Proposed: Transparency obligations for AI decision-making",
      "Proposed: Record-keeping and audit requirements",
      "Proposed: Anonymization standards for AI training data",
      "Proposed: Mandatory reporting of serious harm incidents",
      "Current: Privacy law (PIPEDA) applies to AI processing personal data",
    ],
    penalties: {
      amount: "Proposed: Up to $25M or 5% of global revenue",
      maxFineUSD: 25000000,
      enforcementBody:
        "Proposed: Minister of Innovation, Science and Industry",
    },
    autonomousAgents: {
      addressed: false,
      details:
        "Not specifically named in the proposed AIDA. The bill died before enactment; Canada currently lacks dedicated AI legislation.",
    },
    crossBorder: {
      applies: true,
      details:
        "Proposed AIDA would have applied to international and interprovincial trade involving AI systems. Current PIPEDA applies to foreign companies processing Canadian personal data.",
    },
    sources: [
      {
        title: "The Demise of AIDA",
        url: "https://montrealethics.ai/the-death-of-canadas-artificial-intelligence-and-data-act-what-happened-and-whats-next-for-ai-regulation-in-canada/",
      },
      {
        title: "Canada's 2026 Privacy Priorities",
        url: "https://www.osler.com/en/insights/reports/2025-legal-outlook/canadas-2026-privacy-priorities-data-sovereignty-open-banking-and-ai/",
      },
    ],
    lastUpdated: "March 2026",
  },
  {
    id: "uk",
    jurisdiction: "United Kingdom",
    region: "Europe",
    flag: "\u{1F1EC}\u{1F1E7}",
    lawName: "No dedicated AI law (Pro-innovation sectoral approach)",
    billNumber: "AI Bill anticipated in May 2026 King's Speech",
    status: "Voluntary",
    effectiveDate: "N/A (AI Bill expected in 2026)",
    riskClassification: "None (sector-specific, principles-based)",
    keyRequirements: [
      "Five cross-sectoral AI principles applied by existing sector regulators",
      "CMA: Competition oversight of AI partnerships and mergers",
      "ICO: Data protection (UK GDPR) applies to AI processing personal data",
      "FCA: AI governance requirements for financial services firms",
      "OFCOM: Online Safety Act applies to AI-generated harmful content",
      "DRCF: Coordinating agentic AI guidance across regulators",
    ],
    penalties: {
      amount:
        "Existing laws apply: UK GDPR fines up to \u00A317.5M or 4% of global turnover",
      maxFineUSD: 22000000,
      enforcementBody: "ICO, CMA, FCA, OFCOM (sector-specific)",
    },
    autonomousAgents: {
      addressed: true,
      details:
        "Yes. The DRCF (CMA, OFCOM, ICO, FCA) issued a call for views on agentic AI in Oct 2025. ICO published a report on agentic AI. Active regulatory engagement but no binding rules yet.",
    },
    crossBorder: {
      applies: true,
      details:
        "UK GDPR and other existing laws apply to foreign companies providing services to UK users or processing UK residents' data.",
    },
    sources: [
      {
        title: "AI Regulation in the UK: The Role of the Regulators",
        url: "https://www.twobirds.com/en/insights/2026/uk/ai-regulation-in-the-uk-the-role-of-the-regulators",
      },
    ],
    lastUpdated: "March 2026",
  },
  {
    id: "brazil",
    jurisdiction: "Brazil",
    region: "Latin America",
    flag: "\u{1F1E7}\u{1F1F7}",
    lawName: "AI Bill (PL 2338/2023)",
    billNumber: "PL 2338/2023",
    status: "Proposed",
    effectiveDate:
      "N/A (Passed Senate Dec 2024; pending in Chamber of Deputies)",
    riskClassification: "Excessive / High / Non-High Risk",
    keyRequirements: [
      "Algorithmic impact assessments for high-risk AI systems",
      "Mandatory human oversight for high-risk AI decisions",
      "Transparency and explainability obligations",
      "Non-discrimination and fairness requirements",
      "Data governance aligned with LGPD (Brazilian GDPR)",
      "Dedicated human rights chapter (unique vs EU AI Act)",
    ],
    penalties: {
      amount:
        "Proposed: Up to R$50 million (~$10M USD) or 2% of revenue per violation",
      maxFineUSD: 10000000,
      enforcementBody:
        "Proposed: ANPD (National Data Protection Authority) + SIA (National AI System)",
    },
    autonomousAgents: {
      addressed: false,
      details:
        "Not specifically named. Covered under general AI system definitions. Bill may be substantially amended by Chamber of Deputies before enactment.",
    },
    crossBorder: {
      applies: true,
      details:
        "Proposed to apply to AI systems offered or used in Brazil, regardless of where the provider is established.",
    },
    sources: [
      {
        title: "Brazil's AI Act In The Making",
        url: "https://www.barbieriadvogados.com/brazil-ai-act/",
      },
      {
        title: "Brazil AI Regulation Overview",
        url: "https://regulations.ai/regulations/RAI-BR-NA-SUMMARY-2026",
      },
    ],
    lastUpdated: "March 2026",
  },
  {
    id: "japan",
    jurisdiction: "Japan",
    region: "Asia-Pacific",
    flag: "\u{1F1EF}\u{1F1F5}",
    lawName: "Act on Promotion of AI-Related Technology (AI Promotion Act)",
    billNumber: "Act No. 53 of 2025",
    status: "Enacted",
    effectiveDate: "June 4, 2025 (most provisions)",
    riskClassification: "None (innovation-first, no risk tiers)",
    keyRequirements: [
      "Fundamental law establishing national AI policy principles",
      "Government mandated to use AI to improve administrative efficiency",
      "Business operators encouraged (not required) to utilize AI responsibly",
      "Transparency principle: AI use should be understandable to users",
      "International leadership: Japan to lead formulation of global AI norms",
      "Basic Plan on AI expected in 2026 with more specific guidance",
    ],
    penalties: {
      amount: "No specific penalties; relies on existing sector-specific laws",
      maxFineUSD: null,
      enforcementBody: "Cabinet Office + sector-specific regulators",
    },
    autonomousAgents: {
      addressed: false,
      details:
        "Not specifically addressed. The Act is a high-level framework law without prescriptive rules for specific AI types.",
    },
    crossBorder: {
      applies: false,
      details:
        "Primarily focused on domestic AI promotion and international cooperation. No explicit extraterritorial provisions.",
    },
    sources: [
      {
        title: "Understanding Japan's AI Promotion Act",
        url: "https://fpf.org/blog/understanding-japans-ai-promotion-act-an-innovation-first-blueprint-for-ai-regulation/",
      },
      {
        title: "Japan Passes Innovation-Focused AI Governance Bill",
        url: "https://iapp.org/news/a/japan-passes-innovation-focused-ai-governance-bill",
      },
    ],
    lastUpdated: "March 2026",
  },
  {
    id: "singapore",
    jurisdiction: "Singapore",
    region: "Asia-Pacific",
    flag: "\u{1F1F8}\u{1F1EC}",
    lawName: "Model AI Governance Framework for Agentic AI",
    billNumber: "IMDA MGF (Jan 22, 2026)",
    status: "Voluntary",
    effectiveDate: "January 22, 2026 (voluntary framework)",
    riskClassification:
      "Risk assessment based on impact severity and likelihood",
    keyRequirements: [
      "Dimension 1: Assess and bound risks early before deployment",
      "Dimension 2: Human accountability \u2014 board, product, cybersecurity, end-user teams",
      "Dimension 3: Technical controls across development, pre-deployment, and deployment",
      "Dimension 4: End-user transparency \u2014 inform users of agent capabilities and limitations",
      "Agent identity management \u2014 unique identities linked to human supervisors",
      "Checkpoint mechanisms requiring human approval for sensitive/irreversible actions",
    ],
    penalties: {
      amount:
        "None (voluntary framework); PDPA fines up to 10% of annual turnover",
      maxFineUSD: null,
      enforcementBody: "IMDA (voluntary); PDPC for PDPA enforcement",
    },
    autonomousAgents: {
      addressed: true,
      details:
        "Yes \u2014 world's first governance framework specifically designed for Agentic AI. Addresses multi-agent systems, autonomous decision-making, and cascading error risks.",
    },
    crossBorder: {
      applies: true,
      details:
        "PDPA applies to foreign companies processing personal data of Singapore residents. The voluntary MGF is recommended for all companies deploying agentic AI in Singapore.",
    },
    sources: [
      {
        title: "Singapore Launches First Global Agentic AI Framework",
        url: "https://www.hoganlovells.com/en/publications/singapore-launches-first-global-agentic-ai-governance-framework",
      },
      {
        title: "Singapore Introduces New Model AI Governance Framework",
        url: "https://www.twobirds.com/en/insights/2026/singapore/singapore-introduces-new-model-ai-governance-framework-for-agentic-ai",
      },
    ],
    lastUpdated: "March 2026",
  },
  {
    id: "indonesia",
    jurisdiction: "Indonesia",
    region: "Asia-Pacific",
    flag: "\u{1F1EE}\u{1F1E9}",
    lawName:
      "Personal Data Protection Law (UU PDP) + Draft Presidential AI Regulation",
    billNumber: "Law No. 27 of 2022 (UU PDP) + Draft Perpres AI",
    status: "In Effect",
    effectiveDate: "October 17, 2024 (UU PDP full compliance)",
    riskClassification:
      "Risk-based classification planned in upcoming Presidential Regulation",
    keyRequirements: [
      "UU PDP: Explicit consent required before processing personal data for AI training",
      "UU PDP: Purpose limitation \u2014 cannot repurpose data without fresh consent",
      "UU PDP: Data minimization, accuracy, and security safeguards",
      "UU PDP: Data subject rights (access, correct, delete, port)",
      "National AI Strategy: Pancasila values alignment, human-centric development",
      "Draft AI Regulation: Mandatory AI content labeling, risk-based governance",
    ],
    penalties: {
      amount:
        "UU PDP: Up to 2% of annual revenue; criminal sanctions (4\u20136 years imprisonment)",
      maxFineUSD: null,
      enforcementBody:
        "Personal Data Protection Agency (BPDP) \u2014 being established",
    },
    autonomousAgents: {
      addressed: false,
      details:
        "Not specifically named. Draft Presidential Regulation on AI ethics is expected to introduce risk-based classification that would cover autonomous agents.",
    },
    crossBorder: {
      applies: true,
      details:
        "UU PDP applies extraterritorially to foreign companies offering services to Indonesian users or monitoring their behavior, similar to GDPR.",
    },
    sources: [
      {
        title: "Indonesia AI Regulations 2026",
        url: "https://www.pertamapartners.com/insights/indonesia-ai-regulations-2026",
      },
      {
        title: "Indonesia Prioritizes AI Regulation in 2026",
        url: "https://indonesiabusinesspost.com/5992/cyber-and-espionage/indonesia-prioritizes-ai-regulation-in-2026-says-communications-minister",
      },
    ],
    lastUpdated: "March 2026",
  },
  {
    id: "india",
    jurisdiction: "India",
    region: "Asia-Pacific",
    flag: "\u{1F1EE}\u{1F1F3}",
    lawName: "India AI Governance Guidelines + DPDP Act",
    billNumber: "MeitY Guidelines (Nov 2025) + DPDP Act No. 22 of 2023",
    status: "Voluntary",
    effectiveDate:
      "November 2025 (Guidelines); 2025 (DPDP Rules phased rollout)",
    riskClassification: 'None formalized (seven "sutras" principles)',
    keyRequirements: [
      "DPDP Act: Explicit consent required for processing personal data in AI systems",
      "DPDP Act: Data fiduciary obligations \u2014 purpose limitation, data minimization, security",
      "IT Rules 2026 (Feb 2026): Mandatory labeling of AI-generated/synthetic content",
      "IT Rules 2026: Platforms must deploy automated systems to block harmful synthetic content",
      "IT Rules 2026: Strict takedown timelines for AI-generated harmful content",
      "Governance Guidelines: Seven principles (trust, human-centric, fairness, accountability, transparency, safety)",
    ],
    penalties: {
      amount: "DPDP Act: Up to \u20B9250 crore (~$30M USD)",
      maxFineUSD: 30000000,
      enforcementBody: "Data Protection Board of India (DPBI)",
    },
    autonomousAgents: {
      addressed: false,
      details:
        "Not specifically named. IT Rules 2026 address AI-generated content broadly. A dedicated AI (Ethics and Accountability) Bill is under consideration.",
    },
    crossBorder: {
      applies: true,
      details:
        "DPDP Act applies to foreign companies processing personal data of Indian residents. IT Rules apply to Significant Social Media Intermediaries operating in India.",
    },
    sources: [
      {
        title: "AI Laws and Regulations in India as of 2026",
        url: "https://www.prashantmali.com/cyber-law-blog-india/ai-laws-and-regulations-in-india-as-of-2026",
      },
      {
        title: "India AI Governance Guidelines",
        url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2228315",
      },
    ],
    lastUpdated: "March 2026",
  },
  {
    id: "australia",
    jurisdiction: "Australia",
    region: "Asia-Pacific",
    flag: "\u{1F1E6}\u{1F1FA}",
    lawName: "Voluntary AI Safety Standard + Privacy Act 1988",
    billNumber: "National AI Plan (Dec 2025) + Privacy Act 1988",
    status: "Voluntary",
    effectiveDate: "December 10, 2026 (Privacy Act ADM updates)",
    riskClassification:
      "None formalized (10 voluntary guardrails; mandatory guardrails for high-risk proposed)",
    keyRequirements: [
      "Voluntary AI Safety Standard: 10 guardrails for safe and responsible AI",
      "Privacy Act: Transparency for automated decision-making (ADM) from Dec 2026",
      "Privacy Act: Must explain what personal data is used in automated decisions",
      "Anti-discrimination laws: Liability for discriminatory AI outcomes",
      "Australian Consumer Law: Prohibits AI-washing (overstating AI capabilities)",
      "Healthcare AI: TGA regulates AI tools as Software as a Medical Device",
    ],
    penalties: {
      amount:
        "Privacy Act: Up to $50M AUD (~$32M USD) for serious/repeated breaches",
      maxFineUSD: 32000000,
      enforcementBody:
        "OAIC (Privacy), ACCC (Consumer Law), ASIC (Financial Services)",
    },
    autonomousAgents: {
      addressed: false,
      details:
        "Not specifically named. The voluntary guardrails and Privacy Act ADM provisions would apply to autonomous AI agents processing personal data or making consequential decisions.",
    },
    crossBorder: {
      applies: true,
      details:
        "Existing laws apply to companies doing business in Australia or processing data of Australian residents. No standalone AI law yet.",
    },
    sources: [
      {
        title: "AI Regulation in Australia 2026",
        url: "https://www.theadaptavistgroup.com/blog/ai-regulation-in-australia",
      },
      {
        title: "Australia's Voluntary AI Safety Standard",
        url: "https://www.industry.gov.au/publications/voluntary-ai-safety-standard/10-guardrails",
      },
    ],
    lastUpdated: "March 2026",
  },
];

export const regions = [
  "All",
  "Europe",
  "North America",
  "Latin America",
  "Asia-Pacific",
];
