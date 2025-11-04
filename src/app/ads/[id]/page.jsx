import AdDetailPage from "@/components/AdDetailPage";

export default async function AdDetail({ params }) {
  const { id } = await params;
  
  return <AdDetailPage adId={id} />;
}
