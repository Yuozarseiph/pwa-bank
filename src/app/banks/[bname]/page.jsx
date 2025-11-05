
import BankLoansSection from "@/components/BankLoansSection";


export default async function BankPage({ params }) {

  const { bname } = await params;
  return <BankLoansSection bankSlug={await bname} />;
}
