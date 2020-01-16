import React from 'react';
import axios from 'axios';

class Edit extends React.Component{
  constructor(props){
    super(props);
    this.state={
      title: "",
      description: "",
      director: "",
      rating: 0,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    let id = this.props.match.params.id;
     axios.get("http://3.120.96.16:3001/movies/" + id)
       .then((response) =>{
         console.log(response)
         this.setState({movies : response.data});
       })
   }

  handleChange(e){
    const value = e.target.value;
    this.setState({[e.target.name]: value})
    console.log(value)
  }

  handleSubmit(e){
    e.preventDefault()
    const data={
      title: this.state.title,
      description: this.state.description,
      director: this.state.director,
      rating: this.state.rating,
    }
    let id = this.props.match.params.id;
    axios.put('http://3.120.96.16:3001/movies/' +id, data)
  .then( res => {
    console.log(res);
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title
            <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            />
          </label>
        <label>
          Description
          <input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
            />
        </label>
        <label>
          description
          <input
          type="text"
          name="director"
          value={this.state.director}
          onChange={this.handleChange}
            />
        </label>
        <label>
          rating
          <input
          type="number"
          step="0.1"
          name="rating"
          value={this.state.rating}
          onChange={this.handleChange}
            />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
    )
  }
}



export default Edit;
