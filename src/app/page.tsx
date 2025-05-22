import { Suspense } from "react";
import Kitoblar from "@/components/Kitoblar";
import Statistics from "@/components/Statistics";
import { Skeleton } from "@/components/ui/skeleton";

export const revalidate = 3600; // Revalidate every hour

async function getStatistics() {
  const res = await fetch("https://library.softly.uz/api/app/stats", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch statistics");
  return res.json();
}

async function getBooks() {
  const res = await fetch(
    "https://library.softly.uz/api/app/books?size=20&page=1",
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

export default async function Page() {
  const [statsData, booksData] = await Promise.all([
    getStatistics(),
    getBooks(),
  ]);

  return (
    <div className="container mx-auto">
      <Suspense
        fallback={
          <div className="h-48 flex items-center justify-center">
            <Skeleton className="h-40 w-full" />
          </div>
        }
      >
        <Statistics initialData={statsData} />
      </Suspense>
      <Suspense
        fallback={
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(null)
              .map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-lg" />
              ))}
          </div>
        }
      >
        <Kitoblar initialData={booksData} />
      </Suspense>
    </div>
  );
}
