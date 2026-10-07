export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocumentModel = {
  key: "privacy" | "terms";
  title: string;
  crumb: string;
  updated: string;
  lead: string;
  sections: LegalSection[];
  noticeTitle: string;
  noticeBody: string;
};
