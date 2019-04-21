import React, { Component } from "react";
import "./App.css";
import "./Styles/myStyles.css";

import Title from "./Components/Title";
import axios from "axios";

class App extends Component {
  state = {
    response: "",
    post: "",
    log: "none",
    gol: "block",
    responseToPost: ""
  };
  componentDidMount() {
    // fetch("http://localhost:5000/get")
    //   .then(res => res.text())
    //   .then(res => this.setState({ response: res }))
    //   .catch( err => console.log(err))

    axios
      .get("http://localhost:5000/checkauthen")
      .then(res => {
        if( res.data === "logged_in")
          this.setState({log:"block", gol:"none"});
         else
              this.setState({log:"none", gol:"block"});
}
      )
      .catch(err => console.log(err));


    axios
      .get("http://localhost:5000/get")
      .then(res =>
        this.setState({ response: JSON.parse(JSON.stringify(res.data)) })
      )
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch("/");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  createTable = () => {
    let table = [];

    for (var i = 0; i < this.state.response.length; i++) {
      table.push(
        <div key={i} className="book-item">
          <h3>{this.state.response[i].name}</h3>
          <p>{this.state.response[i].shortdesc}</p>
          <p id="item.id">
            {this.state.response[i].year} By {this.state.response[i].author}
          </p>
        </div>
      );
    }
    return table;
  };

  changeFirst = () => {
    this.setState({
      log: "block"
    });
  }

  render() {
    return (
      <div>
        <h1 className="webTitle">PostIt - AuthenticateReactSQL</h1>

        <div style={{display: this.state.gol}}>
        <Title changeFirst={this.changeFirst.bind(this)} />
        </div>
        <div style={{display: this.state.log}}>
        {this.createTable()}
        </div>
      </div>
    );
  }
}

export default App;
