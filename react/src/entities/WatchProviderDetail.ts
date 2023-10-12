import WatchProvider from "./WatchProvider";

export default interface WatchProviderDetail {
  link: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
}
