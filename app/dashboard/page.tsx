import { Card } from "../ui/dashboard/cards";
import LatestInvoices from "../ui/dashboard/latest-invoices";
import RevenueChart from "../ui/dashboard/revenue-chart";
import { lusitana } from "../ui/fonts";
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from "../lib/data";
import { valueIfFulfilled } from "../lib/utils";
import { Suspense } from "react";
import { RevenueChartSkeleton } from "../ui/dashboard/skeletons";

// Páginas podem ser async :)
export default async function Page() {
  const [
    latestInvoicesResult,
    cardDataResult
  ] = await Promise.allSettled([
    fetchLatestInvoices(), 
    fetchCardData()
  ]);

  const latestInvoices = valueIfFulfilled(latestInvoicesResult);
  const cardData = valueIfFulfilled(cardDataResult);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2x1`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={cardData?.totalPaidInvoices} type="collected" />
        <Card title="Pending" value={cardData?.totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={cardData?.numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={cardData?.numberOfCustomers} type="customers" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <LatestInvoices latestInvoices={latestInvoices || []} />
      </div>
    </main>
  )
}