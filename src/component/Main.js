import React from 'react';
import axios from 'axios';
import Navigation from './Navigation'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      search: ""
    }
    this.onDelete = this.onDelete.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getMovies() {
    (axios.get("http://3.120.96.16:3001/movies").then((response) => {
      this.setState({movies: response.data});
    }))
  }

  filterMovies() {
    return this.state.movies.filter(data => {
      return data.title.toLowerCase().includes(this.state.search) || data.director.toLowerCase().includes(this.state.search)
    })
  }

  componentDidMount() {
    this.getMovies()
  }

  onDelete(e) {
    axios.delete('http://3.120.96.16:3001/movies/' + e.target.id).then((response) => {
      this.getMovies()
    })
  }

  onClick(e) {
    axios.get('http://3.120.96.16:3001/movies/' + e.target.id)
  }

  onChange(e) {
    this.setState({search: e.target.value.toLowerCase()})
  }

  render() {

    return (<div id='mainContainer'>
      <div className='title'>
        <h1>EC Movies</h1>
        <Navigation/>
      </div>
      <div id='searchContainer'>
        <p>Searchbar:
        </p>
        <input id='searchbar' type='text' placeholder='Search for movies by title or director' value={this.state.search} onChange={this.onChange}/>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>director</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {
            this.filterMovies().map(data => (<tr key={data.id}>
              <td>
                <Link className="link" to={'/details/' + data.id}>{data.title}</Link>
              </td>
              <td>
                <Link className="link" to={'/details/' + data.id}>{data.director}</Link>
              </td>
              <td>
                <Link className="link" to={'/details/' + data.id}>{data.rating}</Link>
              </td>
              <td>
                <button onClick={this.onDelete} id={data.id}>Delete</button>
                <button onClick={this.onClick} id={data.id}>
                  <Link to={'/edit/' + data.id}>Edit</Link>
                </button>
                <button onClick={this.onClick} id={data.id}>
                  <Link to={'/details/' + data.id}>Details</Link>
                </button>
              </td>
            </tr>))
          }
        </tbody>
      </table>
      <div></div>
    </div>)
  }
}

export default Main;
