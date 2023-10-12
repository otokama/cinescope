export default interface MovieSearchQuery {
  query: string;
  include_adult?: boolean;
  language?: string;
  year?: string;
  page: number;
}