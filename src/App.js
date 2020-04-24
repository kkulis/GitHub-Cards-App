import React from 'react';
import './App.css';
import axios from 'axios';
//import { useState } from 'react';


// const testData = [
//   { name: "Krzysiek Kulig", avatar_url: "https://avatars1.githubusercontent.com/u/19195251?v=4", company: "Targetly" },
//   { name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu" },
//   { name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook" },
// ];

const CardList = (props) => (
  <div>
    <div className="row">
      {props.profiles.map(profile => <div className="col"><Card key={profile.id} {...profile} /></div>)}
    </div>
  </div>

)

class Form extends React.Component {
  state = {userName: ''}
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`)
    this.props.onSubmit(resp.data);
    this.setState({userName: ''})
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <div className="input-group">
              <input 
              type="text" 
              className="form-control" 
              placeholder="Github username"
              onChange={ event => this.setState({userName: event.target.value})}
              value = {this.state.userName} 
              required 
              />
              <div className="input-group-append">
                <button className="btn btn-secondary">Add Card</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div>
        <div className="card" style={{ width: "8rem" }}>
          <img className="card-img-top" src={profile.avatar_url} alt="avatar"></img>
          <div className="card-body">
            <h6 className="card-title">{profile.name}</h6>
            <p className="card-text">{profile.company}</p>
          </div>
        </div>
      </div>
    )
  }
}


class App extends React.Component {

  state = {
    profiles: [],
  }
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }));
  }
  render() {
    return (
      <div className="container">
        <h5>{this.props.title}</h5>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    )
  }
}

export default App;
