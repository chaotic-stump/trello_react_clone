class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lists: [] };
    this.deleteList = this.deleteList.bind(this);
  }

  componentWillMount() {
    $.ajax({
      url: `/boards/${this.props.boardId}/lists`,
      type: 'GET',
      dataType: 'JSON'
    }).done( lists => {
      this.setState({ lists })
    }).fail( data => {
      // TODO: handle this error better
      alert('Failed to grab board lists');
    });
  }

  deleteList(e) {
    e.preventDefault;
    let id = e
    $.ajax({
      url: `/boards/${this.props.boardId}/lists/${id}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).done( data => {
      let lists = this.state.lists;
      let index = lists.findIndex( l => l.id == id);
      this.setState({
        lists: [ ...lists.slice(0,index), ...lists.slice(index + 1, lists.length) ]
      })
    }).fail( data => {
      // TODO: handle error better
      console.log(data);
    });
  }

  addList(e) {
    e.preventDefault();
    $.ajax({
      url: `/boards/${this.props.boardId}/lists`,
      type: 'POST',
      data: { list: { name: this.refs.name.value } },
      dataType: 'JSON'
    }).done( list => {
      this.setState({ lists: [{...list}, ...this.state.lists ] });
    }).fail( data => {
      // TODO: Handle this error better
      alert('List not saved');
    });
  }

  render() {
    let lists = this.state.lists.map( list => {
      return(<List key={`list-${list.id}`} {...list} deleteList={this.deleteList} />);
    });
    return(
      <div>
        <form onSubmit={this.addList.bind(this)} ref='addList'>
          <input type='text' ref='name' placeholder='List Name' required />
          <input type='submit' className='btn' value='Add' />
        </form>
        {lists}
      </div>
    )
  }
}
