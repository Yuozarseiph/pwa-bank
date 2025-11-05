import LoanDetail from "@/components/LoanDetail";

export async function generateStaticParams() {
  const loans = [
    { bname: "melli", post: "1" },
    { bname: "melli", post: "2" },
    { bname: "melli", post: "3" },
    { bname: "melli", post: "4" },
    { bname: "melli", post: "5" },
    { bname: "melli", post: "6" },
    { bname: "melli", post: "7" },
    { bname: "sepah", post: "8" },
    { bname: "sepah", post: "9" },
    { bname: "mellat", post: "10" },
    { bname: "mellat", post: "11" },
    { bname: "iran-zamin", post: "12" },
    { bname: "saderat", post: "13" },
    { bname: "blu-bank", post: "14" },
    { bname: "refah", post: "15" },
    { bname: "mehr-iran", post: "16" },
    { bname: "saman", post: "17" },
    { bname: "refah", post: "18" },
    { bname: "mehr-iran", post: "19" },
    { bname: "saman", post: "20" },
  ];

  return loans;
}

export default function LoanPage() {
  return <LoanDetail />;
}