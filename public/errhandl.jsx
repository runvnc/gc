var dbg = (msg) => {
  let el = document.getElementById('msg');
  el.innerHTML = msg + "\n" + el.innerHTML;
}

window.onerror = (e) => {
  dbg(e)
}

dbg('start')

var remotes = [];

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
      remotes.push({video:video, id:webrtc.getDomId(peer)});  
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
    dbg('appendVideos');
    dbg(remotes.length.toString());
    var self = this;
    dbg(remotesVideos.innerHTML);
    requestAnimationFrame(function() {
      for (let remote of remotes) {
        dbg(remote.id);
        let div = document.getElementById('container_'+remote.id);

        remote.video.style.height = '300px';
        div.appendChild(remote.video);
        remote.video.style.display = 'block';
        remote.video.style.height = '300px';
        remote.video.style.border = '2px solid red';
        div.style.height = '300px';
        div.style.border = '1px solid blue';
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
    var style = {
      position: 'relative',
      marginTop: '200px',
      marginLeft: '300px',
      border: '20px green solid',
      height: '300px',
      left:'300px'
    };
    return (
        <div>
        <video height="300" id="localVideo"></video>
        <h3>Remotes:</h3>
        <div id="remotesVideos">
        {
          remotes.map(function(remote) {
            return (
              <div style={style}
              id={"container_"+remote.id}>
              ---blah
              blah
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
