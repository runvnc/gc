class WebRTCVideoRoom extends React.Component {
  constructor() {
    super();
    var webrtc = new SimpleWebRTC({
      localVideoEl: 'localVideo',
        remoteVideosEl: '',
        autoRequestMedia: true,
        debug: true
    });
    webrtc.on('readyToCall', function () {
      webrtc.joinRoom('demo');
    });
    var self = this;
    self.remotes = [];

    webrtc.on('videoAdded', function (video, peer) {
      self.remotes.push({video:video, id:webrtc.getDomId(peer)});  
      var container = document.createElement('div');
      video.oncontextmenu = function () { return false; };
      self.forceUpdate();
    });

    // local p2p/ice failure
    webrtc.on('iceFailed', function (peer) {
      var connstate = document.querySelector('#container_' + webrtc.getDomId(peer) + ' .connectionstate');
      alert('local fail'+JSON.stringify(connstate));
      if (connstate) {
        connstate.innerText = 'Connection failed.';
        fileinput.disabled = 'disabled';
      }
    });

    // remote p2p/ice failure
    webrtc.on('connectivityError', function (peer) {
      var connstate = document.querySelector('#container_' + webrtc.getDomId(peer) + ' .connectionstate');
      alert('remote fail'+JSON.stringify(connstate));
      if (connstate) {
        connstate.innerText = 'Connection failed.';
        fileinput.disabled = 'disabled';
      }
    });

  }

  appendVideos() {
    var self = this;
    setTimeout(function() {
      alert(JSON.stringify(self.remotes));
      for (let remote of self.remotes) {
        let div = document.getElementById('container_'+remote.id);
        div.appendChild(remote.video);
      } 
    },1000);
  }

  componentDidMount() {
    this.appendVideos();
  }

  componentDidUpdate() {
    this.appendVideos();
  }

  render() {
    var self = this;
    return (
        <div>
        <video height="300" id="localVideo"></video>
        <div id="remotesVideos">
        {
          this.remotes.map(function(remote) {
            return (
              <div class="videoContainer"
              id="container_{remote.id}">
              hi {remote.id}
              {self.appendVideos()}
              </div>
              );
          })
        }        
        </div>
        </div>
        );
  }
}

class WebRTCApp extends React.Component {
  render() {
    return (
        <div>
        <h3>WebRTC Demo for Gracescale</h3>
        <WebRTCVideoRoom/>
        </div>
        );
  }
}

React.render(<WebRTCApp />, document.getElementById('main'));
