export type CardPageType = {
  item: Kards;
  isLoading?: boolean;
};

export type Kards = {
  id: number;
  name: string;
  image: string;
  sale_price: number;
  author?: {
    name: string;
  };
  stocks: {
    busy: boolean;
  }[];
};

export type TopCategoriesType = {
  slug: string;
  title: string;
};

export type Products = {
  id: number;
  name: string;
  large_images: string[];
  sale_price: number;
};

export type CarouselType = {
  image_mobile_web: string;
}[];

export type Product = Kards[];

export type TopMenuType = {
  totalCount: number;
  items: Product;
};

export interface StatisticsData {
  librarians_count: number;
  reading_books_count: number;
  rents_count: number;
  books_count: number;
}

export interface LibraryData {
  books_count: string;
  librarians_count: string;
  rents_count: number;
  gender: {
    male: string;
    female: string;
  };
  reading_books_count: string;
  expired_leases: string;
  dayly_leasing_books_avarage_count_of_last_month: string;
  leased_books_count_of_last_month: string;
  leased_books_count_of_last_week: string;
  leased_books_count_of_last_24_hours: string;
  new_users_count_last_24_hours: number;
  one_month_leased_rents_by_day: { day: string; count: number }[];
  one_month_returned_rents_by_day: { day: string; count: number }[];
  top_books: { name: string; count: string }[];
  top_librarians: { lastName: string; count: string }[];
}

export interface ChartData {
  date: string;
  borrowed: number;
  returned: number;
}

export interface Book {
  count: string;
  name: string;
}

export interface Reader {
  lastName: string;
  count: string;
}