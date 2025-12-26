import { getBooks } from "@/services/books";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type UseBooksProps = {
  page: number;
  q: string;
  busy: boolean | null;
  headers: HeadersInit;
};

export const useBooks = ({ page, q, busy, headers }: UseBooksProps) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["books", page, q, busy],
    queryFn: async () => {
      const data = await getBooks({ page, q, busy, headers });

      // 🔥 Keyingi sahifani oldindan yuklash
      queryClient.ensureQueryData({
        queryKey: ["books", page + 1, q, busy],
        queryFn: () =>
          getBooks({
            page: page + 1,
            q,
            busy,
            headers,
          }),
      });

      return data;
    },
    placeholderData: (prev) => prev,
  });
};
