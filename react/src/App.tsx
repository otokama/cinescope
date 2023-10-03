import { Grid, GridItem, Show } from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import SideNav from "./components/SideNav";
import MovieDiscoveryGrid from "./components/movie/MovieDiscoveryGrid";
import TVDiscoveryGrid from "./components/tv/TVDiscoveryGrid";

function App() {
  const [showMovieDiscovery, setShowMovieDiscovery] = useState(true);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      <GridItem area="nav">
        <Navbar onSearch={() => {}} />
      </GridItem>

      <Show above="lg">
        <GridItem area="aside" paddingX={5} paddingTop="80px">
          <SideNav
            showMovie={showMovieDiscovery}
            setShowMovie={(showMovie) => setShowMovieDiscovery(showMovie)}
          />
        </GridItem>
      </Show>

      <GridItem area="main" paddingTop="80px" paddingX={5} paddingBottom={5}>
        {showMovieDiscovery && <MovieDiscoveryGrid />}
        {!showMovieDiscovery && <TVDiscoveryGrid />}
      </GridItem>
    </Grid>
  );
}

export default App;
