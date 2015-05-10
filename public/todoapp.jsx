class TodoList extends React.Component {
  render() {
    function createItem(itemText, index) {
      return <li key={index + itemText}>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {items: props.items, text: props.text};
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
        <form onSubmit={this.handleSubmit.bind(this)}>
        <input onChange={this.onChange.bind(this)} 
               value={this.state.text} />
        <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
        </div>
        );
  }
}
TodoApp.propTypes = {items: React.PropTypes.array,
                     text: React.PropTypes.string};
TodoApp.defaultProps = {items: [], text: ''};

React.render(<TodoApp />, document.getElementById('main'));
