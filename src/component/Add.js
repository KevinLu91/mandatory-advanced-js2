import React from 'react';
import axios from 'axios';
import Navigation from './Navigation'
import {Redirect} from "react-router-dom";
import {Helmet} from 'react-helmet'

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      director: "",
      rating: "",
      redirect: false,
      error: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = {
      title: this.state.title,
      description: this.state.description,
      director: this.state.director,
      rating: this.state.rating
    }
    axios.post('http://3.120.96.16:3001/movies', data).then(res => {
      this.setState({redirect: true})
    }).catch((error) =>{
      this.setState({error: true});
    })
  }
  render() {
    let errorMsg = null;
    if(this.state.error){
      errorMsg = "Error! The Title and Director must be between 1 and 40 characters. Description must be between 1 and 300 chracters and  rating be a number between 0.0 and 5.0";
    }

    if (this.state.redirect){
      return <Redirect to="/" />
    }

    return (<> < Helmet > <title>Add page</title>
  </Helmet>
  <div className='title'>
    <h1>Add Movie</h1>
    <Navigation/>
  </div>
  <form onSubmit={this.handleSubmit}>
    <label>
      Title:
      <input type="text" name="title" minLength='1' maxLength='40' value={this.state.title} onChange={this.handleChange}/>
    </label>
    <label>
      Description:
      <input type="text" name="description" minLength='1' maxLength='300' value={this.state.description} onChange={this.handleChange}/>
    </label>
    <label>
      director:
      <input type="text" name="director" minLength='1' maxLength='40' value={this.state.director} onChange={this.handleChange}/>
    </label>
    <label>
      rating:
      <input type="number" step="0.1" name="rating" total={5} value={this.state.rating} onChange={this.handleChange}/>
    </label>
    <div className='submitBtn'>
      <button type="submit" onSubmit={this.handleSubmit}>Submit</button>
    </div>
  </form>
  <div className="errorMsg">
    <p>{errorMsg}</p>
  </div>
</>)
  }
}

export default Add;
