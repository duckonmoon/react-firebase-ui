import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserComponent from "./user-component/UserComponent"

class App extends Component {
  constructor() {
    super();
    this.users = [
      {
        name: "John",
        surname: "Lennon"
      },
      {
        name: "Harley",
        surname: "Queen"
      },
      {
        name: "Ярина",
        surname: "Корань"
      },
      {
        name: "Христина",
        surname: "Пастущак"
      },
      {
        name: "Кріт",
        surname: "Ростислав"
      },
      {
        name: "Журба",
        surname: "Віталій"
      },

    ];

    this.activeUser = {
      name: "Petux",
      surname: "Kolja"
    }
  }

  render() {
    const userComponents = this.users.map((user) => {
      return <UserComponent user={user} width={100} height={120} />
    });


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

        <UserComponent user={this.activeUser} width={200} height={240} />
      </div>
    );
  }
}

export default App;
