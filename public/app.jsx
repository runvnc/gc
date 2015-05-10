class WebRTCVideoRoom extends React.Component {
  constructor() {
    super();
    var webrtc = new SimpleWebRTC({
      localVideoEl: 'localVideo',
      remoteVideosEl: 'remotesVideos',
      autoRequestMedia: true
    });
    webrtc.on('readyToCall', function () {
      webrtc.joinRoom('demo');
    });
   }

   render() {
     return 
         <div>
           <video height="300" id="localVideo"></video>
           <div id=="remotesVideos"></div>
         </div>;
  }
}
///
class WebRTCApp extends React.Component {
  render() {
    return (
        <div>
          <h3>WebRTC Demo for Gracescale</h3>
          <WebRTCVideoRoom/>
        </div>;
  }
}

React.render(<WebRTCApp />, document.getElementById('main'));
