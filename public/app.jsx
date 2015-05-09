class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var createItem = function(itemText, index) {
      return <li key={index + itemText}>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
}

class TodoApp extends React.Component {
  constructor() {
    return {items: [], text: ''};
  }
    onChange(e) {
      this.setState({text: e.target.value});
    }
    handleSubmit(e) {
      e.preventDefault();
      var nextItems = this.state.items.concat([this.state.text]);
      var nextText = '';
      this.setState({items: nextItems, text: nextText});
    }
    render() {
      return (
        <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
        <input onChange={this.onChange} value={this.state.text} />
        <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
        </div>
        );
    }
}

React.render(<TodoApp />, document.getElementById('main'));
