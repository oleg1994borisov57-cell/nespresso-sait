import {
  VideoIframe,
  VideoModalBg,
  VideoModalBox,
  VideoModalCloseButton,
  VideoModalWrapper,
} from "./styles";

export default function VideoModal({ isOpen, videoUrl, onClose }) {
  return <>{isOpen ? <View videoUrl={videoUrl} onClose={onClose} /> : null}</>;
}

const View = ({ videoUrl, onClose }) => {
  return (
    <VideoModalBox>
      <VideoModalBg />
      <VideoModalWrapper>
        <VideoModalCloseButton onClick={onClose}>✖</VideoModalCloseButton>
        <VideoIframe
          width="100%"
          height="100%"
          src={videoUrl}
          allow="accelerometer;autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </VideoModalWrapper>
    </VideoModalBox>
  );
};
