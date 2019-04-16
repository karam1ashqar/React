import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Title from './Components/Title'
import axios from 'axios';


class App extends Component {
  state = {
   response: '',
   post: '',
   responseToPost: '',
 };
 componentDidMount() {
   // fetch("http://localhost:5000/get")
   //   .then(res => res.text())
   //   .then(res => this.setState({ response: res }))
   //   .catch( err => console.log(err))

     axios.get("http://localhost:5000/get")
        .then(res => this.setState({ response: JSON.stringify(res.data) }))
        .catch( err => console.log(err))


 }
 callApi = async () => {
   const response = await fetch('/');
   const body = await response.json();
   if (response.status !== 200) throw Error(body.message);
   return body;
 };

  render() {
    return (
      <div>
      <Title/>
        <p>{this.state.response}</p>
</div>
    );
  }
}

export default App;
