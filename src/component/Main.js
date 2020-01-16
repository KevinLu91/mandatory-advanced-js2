import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state={
      movies: [],
    }
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  getMovies(){
   (axios.get("http://3.120.96.16:3001/movies")
     .then((response) =>{
       this.setState({movies : response.data});
     })
   )
 }

  componentDidMount() {
    this.getMovies()
  }

  onDelete(e){
    axios.delete('http://3.120.96.16:3001/movies/' + e.target.id)
    .then((response) =>{
      this.getMovies()
    })
  }

  onEdit(e){
    axios.get('http://3.120.96.16:3001/movies/' + e.target.id)
      console.log(e.target.id)
  }

  render(){
    return(
      <div >
      <table>
        <thead>
        <tr>
          <th>Title</th>
          <th>director</th>
          <th>Rating</th>
        </tr>
        </thead>
        <tbody>
        {this.state.movies.map( data =>(
          <tr key={data.id}>
            <td>
              <Link to={'/movies/' + data.id}>{data.title}</Link>
            </td>
            <td>
              <Link to={'/movies/' + data.id}>{data.director}</Link>
            </td>
            <td>
              <Link to={'/movies/' + data.id}>{data.rating}</Link>
            </td>
            <td>
              <button onClick={this.onDelete} id={data.id}>Delete</button>
              <button onClick={this.onEdit} id={data.id}><Link to={'/edit/' +data.id }>Edit</Link></button>
              <button onClick={this.onEdit} id={data.id}><Link to={'/details/' +data.id }>Details</Link></button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
        <div>

        </div>
      </div>
    )
  }
}

export default Main;
