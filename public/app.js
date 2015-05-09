"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var TodoList = (function (_React$Component) {
  function TodoList(props) {
    _classCallCheck(this, TodoList);

    _get(Object.getPrototypeOf(TodoList.prototype), "constructor", this).call(this, props);
  }

  _inherits(TodoList, _React$Component);

  _prototypeProperties(TodoList, null, {
    render: {
      value: function render() {
        var createItem = function (itemText, index) {
          return React.createElement(
            "li",
            { key: index + itemText },
            itemText
          );
        };
        return React.createElement(
          "ul",
          null,
          this.props.items.map(createItem)
        );
      },
      writable: true,
      configurable: true
    }
  });

  return TodoList;
})(React.Component);

var TodoApp = (function (_React$Component2) {
  function TodoApp() {
    _classCallCheck(this, TodoApp);

    return { items: [], text: "" };
  }

  _inherits(TodoApp, _React$Component2);

  _prototypeProperties(TodoApp, null, {
    onChange: {
      value: function onChange(e) {
        this.setState({ text: e.target.value });
      },
      writable: true,
      configurable: true
    },
    handleSubmit: {
      value: function handleSubmit(e) {
        e.preventDefault();
        var nextItems = this.state.items.concat([this.state.text]);
        var nextText = "";
        this.setState({ items: nextItems, text: nextText });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            null,
            "TODO"
          ),
          React.createElement(TodoList, { items: this.state.items }),
          React.createElement(
            "form",
            { onSubmit: this.handleSubmit },
            React.createElement("input", { onChange: this.onChange, value: this.state.text }),
            React.createElement(
              "button",
              null,
              "Add #" + (this.state.items.length + 1)
            )
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return TodoApp;
})(React.Component);

React.render(React.createElement(TodoApp, null), document.getElementById("main"));

