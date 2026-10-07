import { LegalDocument } from "./components/legal-document";
import { getTerms } from "./legal.service";

export default function TermsPage() {
  return <LegalDocument doc={getTerms()} />;
}
