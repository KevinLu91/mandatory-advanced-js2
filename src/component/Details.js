import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Helmet} from 'react-helmet'
import Navigation from './Navigation'

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: [],
      editId: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get("http://3.120.96.16:3001/movies/" + id).then((response) => {
      console.log(response.data)
      this.setState({movieDetails: response.data, editId: id});
    })
  }

  handleSubmit(e) {
    e.preventDefault()

  }

  render() {
    const editId = this.state.editId;
    return (<> < Helmet > <title>Detail page</title>
  </Helmet>
  <div className='title'>
    <h1>Movie Details</h1>
    <Navigation/>
  </div>
  <p>Title : <span>{this.state.movieDetails.title}</span>
  </p>
  <p>Description : <span>{this.state.movieDetails.description}</span>
  </p>
  <p>Director : <span>{this.state.movieDetails.director}</span>
  </p>
  <p>Rating : <span>{this.state.movieDetails.rating}</span>
  </p>
  <div>
    <button onClick={this.handleSubmit}>
      <Link to={'/edit/' + editId}>Edit</Link>
    </button>
  </div> < />)
  }
}

export default Details;
