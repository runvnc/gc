var dbg = (msg) => {
  let el = document.getElementById('msg');
  el.innerHTML = msg + "\n" + el.innerHTML;
}

window.onerror = (e) => {
  dbg(e)
}

dbg('start')

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
      dbg('added');
      self.remotes.push({video:video, id:webrtc.getDomId(peer)});  
      video.oncontextmenu = function () { return false; };
      self.forceUpdate();
    });
  }

  appendVideos() {
    var self = this;
    requestAnimationFrame(function() {
      for (let remote of self.remotes) {
        let div = document.getElementById('container_'+remote.id);
        div.appendChild(remote.video);
        remote.video.style.display = 'block';
        remote.video.style.position = 'relative';
      } 
    });
  }

  componentDidMount() {
    this.appendVideos();
  }

  componentDidUpdate() {
    this.appendVideos();
  }

  render() {
    dbg('render');
    var self = this;
    return (
        <div>
        <video height="300" id="localVideo"></video>
        <h3>Remotes:</h3>
        <div id="remotesVideos">
        {
          self.remotes.map(function(remote) {
            return (
              <div id={"container_"+remote.id}>
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
