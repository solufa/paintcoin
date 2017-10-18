navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
  || navigator.mozGetUserMedia;
const URL = window.URL || window.webkitURL;

export default function (video, option, error) {
  if (!navigator.getUserMedia || !URL) error();
  else {
    navigator.getUserMedia(option, (stream) => {
      /* eslint-disable no-param-reassign */
      if (video.srcObject === undefined) video.src = URL.createObjectURL(stream);
      else video.srcObject = stream;
      video.play();
    }, error);
  }
}
