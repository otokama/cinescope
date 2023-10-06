import { Box, Image, Link, SimpleGrid, Text } from "@chakra-ui/react";
import useProviders from "../hooks/useProviders";

interface Props {
  contentId: number;
  isMovie: boolean;
}

const WatchProviders = ({ contentId, isMovie }: Props) => {
  const { data: providerDetail, error } = useProviders(contentId, isMovie);

  if (error) return null;

  const providers =
    providerDetail?.buy || providerDetail?.rent || providerDetail?.flatrate;

  if (!providers) return null;

  return (
    <Box mb="10">
      <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="semibold" mb="5">
        Watch Now On:
      </Text>
      <SimpleGrid
        columns={{ base: 5, lg: 4 }}
        spacing={{ base: 2, lg: 4 }}
        mb="4"
      >
        {providers &&
          providers.map((provider) => (
            <Link
              key={provider.provider_id}
              href={providerDetail.link}
              shadow="md"
              overflow="hidden"
              borderRadius={10}
              boxSize={14}
            >
              <Image
                objectFit="cover"
                aspectRatio={1}
                src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
              />
            </Link>
          ))}
      </SimpleGrid>

      <Link href={providerDetail.link}>
        <Image
          h="15px"
          src="https://widget.justwatch.com/assets/JW_logo_color_10px.svg"
        />
      </Link>
    </Box>
  );
};

export default WatchProviders;
