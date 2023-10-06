import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import TVDetailHeader from "../components/tv/TVDetailHeader";
import { useTVDetail } from "../hooks/tv/useTV";
import { Box, Grid, GridItem, Show, Text } from "@chakra-ui/react";
import TVTrailer from "../components/tv/TVTrailer";

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

        </GridItem>

      </Grid>
    </>
  );
};

export default TVDetailPage;
