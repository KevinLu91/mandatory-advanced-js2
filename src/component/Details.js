import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

class Details extends React.Component{
  constructor(props){
    super(props);
    this.state={
      movieDetails: [],
      editId: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    let id = this.props.match.params.id;
     axios.get("http://3.120.96.16:3001/movies/" + id)
       .then((response) =>{
         console.log(response.data)
         this.setState({movieDetails : response.data, editId: id});
       })
   }

  handleSubmit(e){
    e.preventDefault()

  }

  render(){
     console.log(this.state.movieDetails)
     console.log(this.state.editId)
     const editId = this.state.editId;
    return(
      <div>
        <h2>Title: <span>{this.state.movieDetails.title}</span></h2>
        <h2>Description: <span>{this.state.movieDetails.description}</span></h2>
        <h2>Director: <span>{this.state.movieDetails.director}</span></h2>
        <h2>Rating: <span>{this.state.movieDetails.rating}</span></h2>
        <div>
            <button onClick={this.handleSubmit}><Link to={'/edit/' + editId }>Edit</Link></button>
        </div>
      </div>

    )
  }
}

export default Details;
