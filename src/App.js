import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserComponent from "./user-component/UserComponent"
import FirebaseCDB from "./firebase/FirebaseCDB"

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: {},
      currentUser: "wqe"
    }

    FirebaseCDB.getUserReference().get().then((doc) => {
      this.setState({ users: doc.data() });
    });
  };

  render() {
    const userComponents = Object.keys(this.state.users).map((user) => {
      return <UserComponent user={this.state.users[user]} width="100" height="auto" displaying='none' click={(u) => { this.setState({ currentUser: u }) }} />
    });

    const activeUser = this.state.users[this.state.currentUser] ? <UserComponent click={(u)=>{}}  user={this.state.users[this.state.currentUser]} width={200} height={"auto"} displaying="inline-block"/> : undefined;

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
