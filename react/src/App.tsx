import { Grid, GridItem, Show, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import MovieGrid from "./components/movie/MovieGrid";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "230px 1fr",
      }}
    >
      <GridItem area="nav">
        <Navbar onSearch={() => {}} />
      </GridItem>

      <Show above="lg">
        <GridItem area="aside" paddingX={5} paddingTop="80px">
          <Text>Sidenav</Text>
        </GridItem>
      </Show>

      <GridItem area="main" paddingTop="80px" paddingX={5} paddingBottom={5}>
        <MovieGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
