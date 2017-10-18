navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
  || navigator.mozGetUserMedia;
const URL = window.URL || window.webkitURL;
let stream;

function setStream(video) {
  /* eslint-disable no-param-reassign */
  if (video.srcObject === undefined) video.src = URL.createObjectURL(stream);
  else video.srcObject = stream;
  video.play();
}

export default function (video, option, error) {
  if (!navigator.getUserMedia || !URL) error();
  else if (stream) setStream(video);
  else {
    navigator.getUserMedia(option, (videostream) => {
      stream = videostream;
      setStream(video);
    }, error);
  }
}
