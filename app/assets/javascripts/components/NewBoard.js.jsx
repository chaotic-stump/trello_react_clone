class NewBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  addBoard(e) {
    // prevent default form submit from happening... stops page reload
    e.preventDefault();
    // make ajax call to create a new board
    // clear out form or show errors
    $.ajax({
      url: '/boards',
      type: 'POST',
      data: { board: { name: this.refs.name.value, description: this.refs.description.value } },
      dataType: 'JSON'
    }).done( board => {
      this.props.addBoard(board);
      this.refs.addForm.reset();
    }).fail( response => {
      alert(response.errors.toString());
    });
    console.log('this should create a board')
  }

  render() {
    return(
      <div className='col s12 m10 offset-m1'>
        <h4>Add New Board</h4>
        <form ref='addForm' onSubmit={this.addBoard.bind(this)}>
          <input type='text' placeholder='Board Name' ref='name'/>
          <textarea placeholder='Board Description' ref='description'></textarea>
          <input type='submit' className='btn' />
        </form>
      </div>
    )
  }
}
