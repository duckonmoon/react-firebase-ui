import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserComponent from "./user-component/UserComponent"
import FirebaseCDB from "./firebase/FirebaseCDB"

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: {}
    }

    FirebaseCDB.getUserReference().get().then((doc) => {
      this.setState({ users: doc.data() });
    });
  };

  render() {
    const userComponents = Object.keys(this.state.users).map((user) => {
      return <UserComponent user={this.state.users[user]} width={100} height={120} />
    });

    const activeUser = this.state.users[1] ? <UserComponent user={this.state.users[1]} width={200} height={240} /> : undefined;
    console.log(activeUser);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {userComponents}
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {activeUser}
      </div>
    );
  }
}

export default App;
