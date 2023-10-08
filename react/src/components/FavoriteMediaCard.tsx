import { MediaType } from "../entities/MediaType";
import { Movie } from "../entities/Movie";
import { TV } from "../entities/TV";
import useModalStore from "../stores/modals";
import FavoriteMovieCard from "./movie/FavoriteMovieCard";
import FavoriteTVCard from "./tv/FavoriteTVCard";

interface Props {
  media: Movie | TV;
  mediaType: MediaType;
  handleToggleLike: (
    mediaId: number,
    isLike: boolean,
    mediaType: MediaType
  ) => void;
}

const FavoriteMediaCard = ({ media, mediaType, handleToggleLike }: Props) => {
  const { setShowFavoriteList } = useModalStore();

  const handleLike = async (mediaId: number, isLike: boolean) => {
    handleToggleLike(mediaId, isLike, mediaType);
  };

  return (
    <>
      {mediaType === "movie" ? (
        <FavoriteMovieCard
          movie={media as Movie}
          onToggleLike={(isLike) => handleLike(media.id, isLike)}
          onClick={() => setShowFavoriteList(false)}
        />
      ) : (
        <FavoriteTVCard
          tv={media as TV}
          onToggleLike={(isLike) => handleLike(media.id, isLike)}
          onClick={() => setShowFavoriteList(false)}
        />
      )}
    </>
  );
};

export default FavoriteMediaCard;
