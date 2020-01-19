import React from 'react';
import {Link} from "react-router-dom";

class Navigation extends React.Component {
  render() {
    return (<nav>
      <Link className='link' to='/' style={{
          marginRight: 5
        }}>Main Page</Link>
      <Link className='link' to='/add' style={{
          marginLeft: 5
        }}>Add Movie</Link>
    </nav>)
  }
}

export default Navigation;
