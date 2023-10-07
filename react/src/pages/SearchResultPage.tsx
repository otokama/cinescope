import { Grid, GridItem, Show } from "@chakra-ui/react";
import SideNav from "../components/SideNav";
import SearchResult from "../components/SearchResult";

const SearchResultPage = () => {
  return (
    <>
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

        <GridItem
          area="main"
          paddingX={4}
          paddingTop="10"
          paddingBottom={5}
        >
          <SearchResult />
        </GridItem>
      </Grid>
    </>
  );
};

export default SearchResultPage;
