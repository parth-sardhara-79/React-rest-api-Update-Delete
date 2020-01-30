import React from 'react';
import './style.scss';
import ListUsers from './list-user';
import UserDetail from './user-detail';
class App extends React.Component {
  state = {
    userId: 0,
    updateFirstName: 'Ramsay',
    updateLastName: 'Bolton',
    updateId: 7
  }
  onButtonClick(id) {
    this.setState({
      userId: id
    })
  }
  updateUserState = (uFirstName,uLastName,uId) => {
    this.setState({
      updateFirstName: uFirstName,
      updateLastName: uLastName,
      updateId: uId
    });
  }
  render() {
    return (
      <div className="maincontainer">
        <div className="div1">
          <ListUsers click={(event) => this.onButtonClick(event.target.id)} update={this.state} />
        </div>
        <div className="div2">
          <UserDetail userData={this.state.userId} update={this.updateUserState} />
        </div>
      </div>);
  }
}

export default App;