function extractYouTubeVideoId(url) {
  const regEx = /youtube\.com\/embed\/([^\?]+)/;
  const match = url.match(regEx);

  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
}

export default extractYouTubeVideoId;
