import { fetchInvoicesPages } from "@/app/lib/data";
import { InvoiceSkeleton } from "@/app/ui/dashboard/skeletons";
import { lusitana } from "@/app/ui/fonts";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import Pagination from "@/app/ui/invoices/pagination";
import InvoicesTable from "@/app/ui/invoices/table";
import Search from "@/app/ui/search";
import { Suspense } from "react";

type SearchParams = {
  query?: string;
  page?: string;
};

// No servidor: recebemos o searchParams como prop
// No cliente: usamos o hook useSearchParams
export default async function Page({ searchParams }: { searchParams?: SearchParams }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2x1`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Suspense key={query + currentPage} fallback={<InvoiceSkeleton />}>
          <InvoicesTable query={query} currentPage={currentPage} />
        </Suspense>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}