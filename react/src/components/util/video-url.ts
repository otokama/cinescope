import { Video } from "../../entities/Video";

function populateVideoLink(video: Video) {
  const videoType = video.site;
  const ytBaseUrl = "https://www.youtube.com/embed/";
  const vimeoBaseUrl = "https://vimeo.com/";
  switch (videoType) {
    case "YouTube":
      video.link = ytBaseUrl + video.key;
      break;
    case "Vimeo":
      video.link = vimeoBaseUrl + video.key;
      break;
    default:
      break;
  }
  return video;
}

export { populateVideoLink };
