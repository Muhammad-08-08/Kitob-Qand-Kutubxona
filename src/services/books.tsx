type GetBooksParams = {
  page: number;
  q: string;
  busy: boolean | null;
  headers: HeadersInit;
};

export const getBooks = async ({
  page,
  q,
  busy,
  headers,
}: GetBooksParams) => {
  const url = new URL("https://library.softly.uz/api/app/books");

  url.searchParams.set("size", "20");
  url.searchParams.set("page", String(page));
  url.searchParams.set("q", q.trim());
  url.searchParams.set("order", "DESC");

  if (busy !== null) {
    url.searchParams.set("busy", String(busy));
  }

  const res = await fetch(url.toString(), { headers });

  if (!res.ok) {
    throw new Error("Books fetch failed");
  }

  return res.json();
};
