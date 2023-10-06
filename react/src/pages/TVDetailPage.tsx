import { Box, Grid, GridItem, Show, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import CastList from "../components/CastList";
import LoadingPage from "../components/LoadingPage";
import WatchProviders from "../components/WatchProviders";
import TVDetailHeader from "../components/tv/TVDetailHeader";
import TVTrailer from "../components/tv/TVTrailer";
import { useTVDetail } from "../hooks/tv/useTV";

const TVDetailPage = () => {
  const { id } = useParams();
  const tvId = parseInt(id!);

  const { data: tvDetail, isLoading, error } = useTVDetail(tvId);

  const navigate = useNavigate();
  if (isLoading) return <LoadingPage />;

  if (error || !tvDetail) {
    navigate("*");
    return <></>;
  }

  return (
    <>
      <TVDetailHeader tv={tvDetail} />

      <Grid
        maxW="1500px"
        mx="auto"
        px={{ base: 4, md: 10 }}
        templateAreas={{
          base: `"main"`,
          lg: `"main aside"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "1fr 270px",
        }}
      >
        <GridItem area="main" paddingTop={10} pr={{ lg: 12 }}>
          <Show below="md">
            <Box mb="10">
              <Text fontSize="lg" fontWeight="bold" mb="2">
                Overview
              </Text>
              <Text>{tvDetail.overview}</Text>
            </Box>
          </Show>

          <TVTrailer tvId={tvDetail.id} />

          <CastList contentId={tvDetail.id} isMovie={false} />

          <Show below="lg">
            <WatchProviders contentId={tvDetail.id} isMovie={false} />
          </Show>
        </GridItem>

        <Show above="lg">
          <GridItem area="aside" paddingTop={10} pr={4}>
            <WatchProviders contentId={tvDetail.id} isMovie={false} />
          </GridItem>
        </Show>
      </Grid>
    </>
  );
};

export default TVDetailPage;
