import { useCallback, useState } from "react";
import VideoModal from "../videoModal/VideoModal";
import {
  VideoImg,
  VideoPlayButton,
  VideoPlayIcon,
  VideoSectionWrapper,
} from "./styles";
import extractYouTubeVideoId from "../../../../../utils/extractYouTubeVideoId";

export default function VideoSection({ product }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const toggleVideoModal = useCallback(() => {
    setIsVideoModalOpen((state) => !state);
  }, []);

  const { video, alt_tag, title } = product ?? {};

  return (
    <>
      {product ? (
        <VideoSectionWrapper id="video">
          <VideoImg
            src={`https://img.youtube.com/vi/${extractYouTubeVideoId(
              video
            )}/0.jpg`}
            alt={alt_tag ?? title}
          />
          <VideoPlayButton onClick={toggleVideoModal}>
            <VideoPlayIcon />
          </VideoPlayButton>
          <VideoModal
            onClose={toggleVideoModal}
            isOpen={isVideoModalOpen}
            videoUrl={video}
          />
        </VideoSectionWrapper>
      ) : null}
    </>
  );
}
