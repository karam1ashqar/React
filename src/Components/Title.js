import React, { Component } from "react";
import "../Styles/myStyles.css";
import * as axios from 'axios';
axios.defaults.withCredentials = true;


class Title extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      fullname: "",
      regstyle: "none",
      log: "block",
      color: "black",
      buttonTxt: "Log in",
      handlingForm: "Log in to access this website",
      gotopage: "Need an account? Sign up"
    };
  }

  handleUserNameChange = event => {
    this.setState({
      username: event.target.value
    });
  };

  handleNameChange = event => {
    this.setState({
      fullname: event.target.value
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleSubmitForm = event => {
    event.preventDefault();


    if (this.state.gotopage === "Log in") {

      if (this.state.password && this.state.username) {
        if (this.state.password.length < 6)
          return this.setState({
            handlingForm: "Short Password!",
            style: "red"
          });
        if (!/\d/.test(this.state.password))
          return this.setState({
            handlingForm: "Password must include at least one number!",
            style: "red"
          });
        if (/^\d+$/.test(this.state.password))
          return this.setState({
            handlingForm: "Password must include at least one char!",
            style: "red"
          });
}
}

      const { username, password, fullname } = this.state;

      if (this.state.gotopage === "Need an account? Sign up") {
        axios
          .post(`/login`, { username, password })
          .then(res => {
            this.setState({
              handlingForm: `${res.data}`,
              style: res.data === "Logged in successfully" ? "green" : "red"
            });
            if( res.data === "Logged in successfully" )
            setTimeout(function() {
              this.setState({ log: res.data === "Logged in successfully" ? "none" : "block"})
            this.props.changeFirst()
            }.bind(this), 1500)
          })
          .catch(err => console.log(err));
      } else {
        axios
          .post(`/createUser`, {
            fullname,
            password,
            username
          })
          .then(res => {
            let data = res.data;
            if (data.indexOf("exist") !== -1)
              this.setState({
                handlingForm: "Username already exists!",
                style: "red"
              });
            else if (data === "Logged in successfully!") {
              this.setState({
                handlingForm: "Signed up successfully",
                style: "green"
              });
              setTimeout(function() {
                console.log('hey im here');
                this.setState({ log: "none"})
              }, 1500)
            }
            else
              this.setState({
                handlingForm: "Error",
                style: "red"
              });
          })
          .catch(err => console.log(err));
      }

  };

  SignUpRender = () => {
    if (this.state.gotopage === "Need an account? Sign up") {
      this.setState({
        gotopage: "Log in",
        regstyle: "block",
        buttonTxt: "Sign up",
        username: "",
        password: ""
      });
    } else {
      this.setState({
        gotopage: "Need an account? Sign up",
        regstyle: "none",
        buttonTxt: "Log in",
        username: "",
        password: ""
      });
    }
  };

  render() {
    const { username, password, fullname } = this.state;
    return (
      <div style={{display: this.state.log}}>
        <div className="abc">
          <form onSubmit={this.handleSubmitForm}>
            <div className="InputsLabelsContainer">
              <label
                style={{ display: `${this.state.regstyle}` }}
                htmlFor="fullname"
              >
                Enter your name
              </label>
              <input
                style={{ display: `${this.state.regstyle}` }}
                type="text"
                id="fullname"
                onChange={this.handleNameChange}
                value={fullname}
              />
              <br />
              <label htmlFor="username">Enter your username</label>
              <input
                required
                type="text"
                id="username"
                onChange={this.handleUserNameChange}
                value={username}
              />
              <br />
              <label htmlFor="password">Enter your password</label>
              <input
                required
                type="password"
                id="password"
                onChange={this.handlePasswordChange}
                value={password}
              />
              <button type="submit" name="submit" id="submit">
                {this.state.buttonTxt}
              </button>
              <h4 style={{ color: `${this.state.style}` }}>
                {this.state.handlingForm}
              </h4>
              <div onClick={this.SignUpRender} className="button">
                {this.state.gotopage}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Title;
