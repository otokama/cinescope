import { Grid, GridItem, Show } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import SideNav from "./components/SideNav";
import MovieDiscoveryGrid from "./components/movie/MovieDiscoveryGrid";
import TVDiscoveryGrid from "./components/tv/TVDiscoveryGrid";
import useMediaTypeStore from "./stores/media-type";

function App() {
  const { mediaType } = useMediaTypeStore();

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "260px 1fr",
      }}
    >
      <GridItem area="nav">
        <Navbar onSearch={() => {}} />
      </GridItem>

      <Show above="lg">
        <GridItem area="aside" paddingX="10px" paddingTop={24}>
          <SideNav />
        </GridItem>
      </Show>

      <GridItem area="main" paddingTop={28} paddingX={8} paddingBottom={5}>
        {mediaType === "movie" && <MovieDiscoveryGrid />}
        {mediaType === "tv" && <TVDiscoveryGrid />}
      </GridItem>
    </Grid>
  );
}

export default App;
