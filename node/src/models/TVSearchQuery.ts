export default interface TVSearchQuery {
  query: string;
  page: number;
  include_adult?: boolean;
  language?: string;
  first_air_date_year?: string;
  year?: string;
}