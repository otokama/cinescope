import { Grid, GridItem } from "@chakra-ui/layout";
import { Show } from "@chakra-ui/media-query";
import SideNav from "../components/SideNav";
import MovieDiscoveryGrid from "../components/movie/MovieDiscoveryGrid";
import TVDiscoveryGrid from "../components/tv/TVDiscoveryGrid";
import useSearchParamsStore from "../stores/search";

const HomePage = () => {
  const mediaType = useSearchParamsStore(s => s.searchParams.mediaType);
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      <Show above="lg">
        <GridItem area="aside" paddingTop="10">
          <SideNav />
        </GridItem>
      </Show>

      <GridItem area="main" paddingX={8} paddingTop="10" paddingBottom={5}>
        {mediaType === "movie" && <MovieDiscoveryGrid />}
        {mediaType === "tv" && <TVDiscoveryGrid />}
      </GridItem>
    </Grid>
  );
};

export default HomePage;
