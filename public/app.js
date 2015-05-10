"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var WebRTCVideoRoom = (function (_React$Component) {
  function WebRTCVideoRoom() {
    _classCallCheck(this, WebRTCVideoRoom);

    _get(Object.getPrototypeOf(WebRTCVideoRoom.prototype), "constructor", this).call(this);
    var webrtc = new SimpleWebRTC({
      localVideoEl: "localVideo",
      remoteVideosEl: "remotesVideos",
      autoRequestMedia: true,
      debug: true
    });
    webrtc.on("readyToCall", function () {
      webrtc.joinRoom("demo");
    });
  }

  _inherits(WebRTCVideoRoom, _React$Component);

  _prototypeProperties(WebRTCVideoRoom, null, {
    render: {
      value: function render() {
        return React.createElement(
          "div",
          null,
          React.createElement("video", { height: "300", id: "localVideo" }),
          React.createElement("div", { id: "remotesVideos" })
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

