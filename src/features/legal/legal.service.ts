import type { LegalDocumentModel } from "./types";

const updated = "2026-10-07";

export function getPrivacy(): LegalDocumentModel {
  return {
    key: "privacy",
    title: "Privacy policy",
    crumb: "Privacy policy",
    updated,
    lead: "This policy explains what personal information Company HVAC collects when you use our website, request a quote or work with us, how we use it, and the choices you have.",
    noticeTitle: "Questions about this policy?",
    noticeBody: "Contact our legal team at legal@company.com",
    sections: [
      { id: "s1", title: "Who we are", paragraphs: ['Company HVAC ("we", "us") is the controller of personal information collected through this website and our sales, project and service activities.'] },
      { id: "s2", title: "Information we collect", paragraphs: ["We collect information you give us and information collected automatically when you use the site."], bullets: ["Contact details — name, company, email, phone and city submitted in quote or contact forms", "Project details — building type, location, drawings and requirements you share", "Service records — equipment, site address and maintenance history for contract clients", "Technical data — IP address, browser type, pages visited and referring site"] },
      { id: "s3", title: "How we use your information", paragraphs: ["We use personal information only for clear business purposes:"], bullets: ["To respond to enquiries and prepare quotations", "To deliver, commission and maintain installed systems", "To send event invitations and project news if you subscribe", "To improve our website and protect it against misuse"] },
      { id: "s4", title: "Legal basis", paragraphs: ["We process information to perform a contract or take steps before one, to meet legal obligations, for our legitimate business interests, or with your consent — which you may withdraw at any time."] },
      { id: "s5", title: "Sharing your information", paragraphs: ["We do not sell personal information. We share it only with authorised brand partners for warranty and product registration, subcontractors working on your project, and service providers who host or support our systems — each bound by confidentiality obligations."] },
      { id: "s6", title: "Cookies", paragraphs: ["We use essential cookies to run the site and optional analytics cookies to understand how it is used. You can change your cookie preferences at any time through your browser settings."] },
      { id: "s7", title: "Data retention", paragraphs: ["We keep enquiry data for up to 24 months and project and service records for the life of the installed equipment plus any period required by law."] },
      { id: "s8", title: "Security", paragraphs: ["We use access controls, encryption in transit and regular reviews to protect personal information. No method of transmission over the internet is completely secure."] },
      { id: "s9", title: "Your rights", paragraphs: ["Depending on where you live, you may have the right to:"], bullets: ["Access the personal information we hold about you", "Correct inaccurate or incomplete information", "Request deletion or restriction of processing", "Object to marketing and withdraw consent"] },
      { id: "s10", title: "Changes to this policy", paragraphs: ['We may update this policy from time to time. The "Last updated" date at the top shows when it was last revised.'] },
    ],
  };
}

export function getTerms(): LegalDocumentModel {
  return {
    key: "terms",
    title: "Terms & conditions",
    crumb: "Terms & conditions",
    updated,
    lead: "These terms govern your use of the Company HVAC website and set out the general conditions that apply to quotations, supply, installation and service unless a signed contract says otherwise.",
    noticeTitle: "Questions about these terms?",
    noticeBody: "Contact our legal team at legal@company.com",
    sections: [
      { id: "s1", title: "Acceptance of terms", paragraphs: ["By using this website or accepting a quotation from Company HVAC, you agree to these terms. If you do not agree, please do not use the site or our services."] },
      { id: "s2", title: "Use of the website", paragraphs: ["You may use this website for lawful purposes only. You must not:"], bullets: ["Attempt to gain unauthorised access to the site or its systems", "Copy, reproduce or resell site content without permission", "Submit false information through quote or contact forms"] },
      { id: "s3", title: "Quotations", paragraphs: ["Quotations are valid for 30 days from issue unless stated otherwise. Prices are based on the information and drawings provided; changes to scope, site conditions or specifications may change the price and programme."] },
      { id: "s4", title: "Orders and payment", paragraphs: ["An order is confirmed when we receive a signed acceptance and any agreed deposit. Invoices are payable within the period stated on the quotation. We may suspend work if payments are overdue."] },
      { id: "s5", title: "Supply and installation", paragraphs: ["We will carry out work with reasonable skill and care and in line with manufacturer guidelines and applicable codes. The client is responsible for providing safe site access, power, and any approvals required from building owners or authorities."] },
      { id: "s6", title: "Warranty", paragraphs: ["Equipment is covered by the manufacturer warranty of Daikin, LG, Trane, Kruger or DP as applicable. Our workmanship is warranted for 12 months from handover. Warranties do not cover:"], bullets: ["Damage caused by misuse, unauthorised modification or lack of maintenance", "Normal wear of consumables such as filters and belts", "Faults caused by power supply issues or external events"] },
      { id: "s7", title: "Maintenance contracts", paragraphs: ["Annual maintenance contracts are governed by their own schedule of visits, response times and exclusions, which form part of these terms."] },
      { id: "s8", title: "Limitation of liability", paragraphs: ["To the extent permitted by law, our total liability under any contract is limited to the contract value. We are not liable for indirect or consequential losses, including loss of profit or business interruption."] },
      { id: "s9", title: "Intellectual property", paragraphs: ["All content on this website — text, images, logos and design — belongs to Company HVAC or its licensors. Brand names and logos of our partners remain the property of their respective owners."] },
      { id: "s10", title: "Governing law", paragraphs: ["These terms are governed by the laws of the country in which Company HVAC is registered, and disputes are subject to the exclusive jurisdiction of its courts."] },
    ],
  };
}
