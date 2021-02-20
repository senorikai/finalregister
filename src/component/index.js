import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    selected_id: '',
    selected_edit_data: { },
    users: [
      { id: 1, name: 'Jack' },
      { id: 2, name: 'Jill' },
      { id: 3, name: 'Ron', age: 3 },
    ],
  };

  handlerSelectedID = (data) => {
    this.setState({ selected_id: data.id, selected_edit_data: data });
  };

  handlerChangeEdit = (event) => {
      const { id, value } = event.target
      const { selected_edit_data } = this.state
      this.setState({selected_edit_data : { ...selected_edit_data, [id]: value }})
  }

  handlerSaveEdit = () => {
    const { selected_edit_data, users } = this.state
    const new_users = users.map((current) => selected_edit_data.id === current.id ? selected_edit_data : current )
    this.setState({users: new_users, selected_id: '', selected_edit_data: {}})
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <table border="1">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
            {this.state.users.map((current) => {
              return (
                <tr key={current.id}>
                  <td onClick={() => this.handlerSelectedID(current)}>
                    {this.state.selected_id === current.id ? (
                      <input id="name" value={this.state.selected_edit_data.name} onChange={this.handlerChangeEdit} />
                    ) : (
                      current.name
                    )}
                  </td>
                  <td>
                    {this.state.selected_id === current.id ? (
                      <button onClick={this.handlerSaveEdit}>Save</button>
                    ) : (
                      <button>Delete</button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;