"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var dbg = function (msg) {
  var el = document.getElementById("msg");
  el.innerHTML = msg + "\n" + el.innerHTML;
};

window.onerror = function (e) {
  dbg(e);
};

dbg("start");

var remotes = [];

var WebRTCVideoRoom = (function (_React$Component) {
  function WebRTCVideoRoom() {
    _classCallCheck(this, WebRTCVideoRoom);

    _get(Object.getPrototypeOf(WebRTCVideoRoom.prototype), "constructor", this).call(this);
    var webrtc = new SimpleWebRTC({
      localVideoEl: "localVideo",
      remoteVideosEl: "",
      autoRequestMedia: true,
      debug: true
    });
    webrtc.on("readyToCall", function () {
      webrtc.joinRoom("demo");
    });
    var self = this;
    self.remotes = [];

    webrtc.on("videoAdded", function (video, peer) {
      dbg("added");
      remotes.push({ video: video, id: webrtc.getDomId(peer) });
      video.oncontextmenu = function () {
        return false;
      };
      self.forceUpdate();
    });

    // local p2p/ice failure
    webrtc.on("iceFailed", function (peer) {
      var connstate = document.querySelector("#container_" + webrtc.getDomId(peer) + " .connectionstate");
      alert("local fail" + JSON.stringify(connstate));
      if (connstate) {
        connstate.innerText = "Connection failed.";
        fileinput.disabled = "disabled";
      }
    });

    // remote p2p/ice failure
    webrtc.on("connectivityError", function (peer) {
      var connstate = document.querySelector("#container_" + webrtc.getDomId(peer) + " .connectionstate");
      alert("remote fail" + JSON.stringify(connstate));
      if (connstate) {
        connstate.innerText = "Connection failed.";
        fileinput.disabled = "disabled";
      }
    });
  }

  _inherits(WebRTCVideoRoom, _React$Component);

  _prototypeProperties(WebRTCVideoRoom, null, {
    appendVideos: {
      value: function appendVideos() {
        dbg("appendVideos");
        dbg(remotes.length.toString());
        var self = this;
        dbg(remotesVideos.innerHTML);
        requestAnimationFrame(function () {
          for (var _iterator = remotes[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
            var remote = _step.value;
            dbg(remote.id);
            var div = document.getElementById("container_" + remote.id);

            remote.video.style.height = "300px";
            div.appendChild(remote.video);
            remote.video.style.display = "block";
            remote.video.style.height = "300px";
            remote.video.style.border = "2px solid red";
            div.style.height = "300px";
            div.style.border = "1px solid blue";
          }
        });
      },
      writable: true,
      configurable: true
    },
    componentDidMount: {
      value: function componentDidMount() {
        this.appendVideos();
      },
      writable: true,
      configurable: true
    },
    componentDidUpdate: {
      value: function componentDidUpdate() {
        this.appendVideos();
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        dbg("render");
        var self = this;
        var style = {
          position: "relative",
          marginTop: "200px",
          marginLeft: "300px",
          border: "20px green solid",
          height: "300px",
          left: "300px"
        };
        return React.createElement(
          "div",
          null,
          React.createElement("video", { height: "300", id: "localVideo" }),
          React.createElement(
            "h3",
            null,
            "Remotes:"
          ),
          React.createElement(
            "div",
            { id: "remotesVideos" },
            remotes.map(function (remote) {
              return React.createElement(
                "div",
                { style: style,
                  id: "container_" + remote.id },
                "---blah blah"
              );
            })
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return WebRTCVideoRoom;
})(React.Component);

var WebRTCApp = (function (_React$Component2) {
  function WebRTCApp() {
    _classCallCheck(this, WebRTCApp);

    if (_React$Component2 != null) {
      _React$Component2.apply(this, arguments);
    }
  }

  _inherits(WebRTCApp, _React$Component2);

  _prototypeProperties(WebRTCApp, null, {
    render: {
      value: function render() {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            null,
            "WebRTC Demo for Gracescale"
          ),
          React.createElement(WebRTCVideoRoom, null)
        );
      },
      writable: true,
      configurable: true
    }
  });

  return WebRTCApp;
})(React.Component);

React.render(React.createElement(WebRTCApp, null), document.getElementById("main"));

