import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {Helmet} from 'react-helmet'
import Navigation from './Navigation'

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: [],
      editId: "",
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get("http://3.120.96.16:3001/movies/" + id).then((response) => {
      this.setState({movieDetails: response.data, editId: id});
    }).catch(function(error) {
      alert(error);
    });
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
    <Link to={'/edit/' + editId}><button>Edit</button></Link>
  </div> < />)
  }
}

export default Details;
