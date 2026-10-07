import { LegalDocument } from "./components/legal-document";
import { getPrivacy } from "./legal.service";

export default function PrivacyPage() {
  return <LegalDocument doc={getPrivacy()} />;
}
