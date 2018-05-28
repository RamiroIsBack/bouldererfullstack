import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {Link} from 'react-router-dom';
import currentUserQuery from '../queries/CurrentUser';
import logoutMutation from '../mutations/Logout';

class Header extends Component {
  constructor(){
    super()
    this.onLogout.bind(this)
  }
  onLogout () {
    this.props.mutate({
      refetchQueries:()=> [{query:currentUserQuery}]
    });
   
  }
  renderButtons(){
    const {loading,currentUser} = this.props.data
    if(loading){return<div/>;}
    if (currentUser){
      return(
      <li>
        <a onClick = {this.onLogout.bind(this)}>
          Log out
        </a>
      </li>
      );
    }else{
      return (
      <div>
        <li>
          <Link to = '/signup'>Sign up</Link>
        </li>
        <li>
          <Link to = '/login'>Log in</Link>
        </li>
      </div>
      );
    }

  }
  render() {
    
    return (
      <div className= 'nav-wrapper'>
        <nav>
          <div>
            <ul className = 'right'>
              {this.renderButtons()}
            </ul>
            <Link to='/dashboard'>
              Home
            </Link>
          </div>
        </nav>  
      </div>
    );
  }
}

export default graphql(logoutMutation)(
  graphql(currentUserQuery) (Header)
);