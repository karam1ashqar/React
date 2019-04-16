import React, { Component } from 'react'
import '../Styles/myStyles.css'
import axios from 'axios';


class Title extends Component {

   constructor(props) {
     super(props)

     this.state = {
       username: '',
       password: '',
       color: 'black',
       handlingForm: 'Log in to access this website'
     }
   }

   handleUserNameChange = event => {
     this.setState({
       username: event.target.value
     })
   }

   handlePasswordChange = event => {
     this.setState({
       password: event.target.value
     })
   }

   handleSubmitForm = event => {
     event.preventDefault()

if( this.state.password && this.state.username ) {
  if( this.state.password.length < 6 )
    this.setState({handlingForm: "Short Password!", style: "red"})

    const { username, password } = this.state;

    axios.post(`http://localhost:5000/log`, { username, password })
      .then(res => {

        console.log(res.config.data);
      //  console.log(res.data);
      })
      .catch( err => console.log(err))
}

   }

  render() {
    const { username, password } = this.state;
    return (
      <div>
      <h1 className="webTitle" >PostIt - AuthenticateReactSQL</h1>
      <form onSubmit={this.handleSubmitForm}>
      <div className="InputsLabelsContainer">
      <label htmlFor="username">Enter your username</label>
      <input required type="text" id="username" onChange={this.handleUserNameChange} value={username}></input>
      <br/>
      <label htmlFor="password">Enter your password</label>
      <input required type="password" id="password" onChange={this.handlePasswordChange} value={password}></input>
      <button type="submit" name="submit" id="submit">Log in</button>
      <h4 style={{color: `${this.state.style}`}}>{this.state.handlingForm}</h4>
   </div>

       </form>
      </div>
    )
  }
}

export default Title;
