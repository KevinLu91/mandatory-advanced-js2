import React from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";
import {Helmet} from 'react-helmet'
import Navigation from './Navigation'

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: [],
      editId: "",
      redirect: false,
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get("http://3.120.96.16:3001/movies/" + id).then((response) => {
      this.setState({movieDetails: response.data, editId: id});
    }).catch((error)=> {
      alert("This movie have already been deleted");
      this.setState({redirect: true});
    });
  }

  render() {

    if(this.state.redirect){
      return <Redirect to='/' />
    }

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
