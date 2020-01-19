import React from 'react';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import Navigation from './Navigation'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      director: "",
      rating: "",
      movie: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getMovieID() {
    let id = this.props.match.params.id;
    (axios.get("http://3.120.96.16:3001/movies/" + id).then((response) => {
      this.setState({movie: response.data});
    }))
  }

  componentDidMount() {
    this.getMovieID()
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
    let id = this.props.match.params.id;
    axios.put('http://3.120.96.16:3001/movies/' + id, data).then(res => {
      console.log(res);
    }).then(update => {
      this.getMovieID()
    }).catch(function(error) {
      console.log(error);
    });
    this.setState({title: ""});
    this.setState({description: ""});
    this.setState({director: ""});
    this.setState({rating: ""});
  }

  render() {
    return (<> < Helmet > <title>Edit page</title>
  </Helmet>
  <div className='title'>
    <h1>Edit Movie</h1>
    <Navigation/>
  </div>
  <div>
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
        Director:
        <input type="text" name="director" minLength='1' maxLength='40' value={this.state.director} onChange={this.handleChange}/>
      </label>
      <label>
        rating:
        <input type="number" step="0.1" name="rating" total={5} value={this.state.rating} onChange={this.handleChange}/>
      </label>
      <div className="submitBtn">
        <button type="submit" onClick={this.handleSubmit}>Submit</button>
      </div>
    </form>
  </div>
  <div className="editTable">
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Director</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{this.state.movie.title}</td>
          <td>{this.state.movie.description}</td>
          <td>{this.state.movie.director}</td>
          <td>{this.state.movie.rating}</td>
        </tr>
      </tbody>
    </table>
  </div>
</>)
  }
}

export default Edit;
