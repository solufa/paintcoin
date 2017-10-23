navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
  || navigator.mozGetUserMedia;
const URL = window.URL || window.webkitURL;

let prevStream;
function detach() {
  if (prevStream) {
    prevStream.getTracks().forEach(track => track.stop());
    prevStream = null;
  }
}

export default {
  attach(video, option, error) {
    if (!navigator.getUserMedia || !URL) error();
    else {
      detach();

      navigator.getUserMedia(option, (stream) => {
        /* eslint-disable no-param-reassign */
        if (video.srcObject === undefined) video.src = URL.createObjectURL(stream);
        else video.srcObject = stream;
        video.play();
        prevStream = stream;
      }, error);
    }
  },
  detach,
};
