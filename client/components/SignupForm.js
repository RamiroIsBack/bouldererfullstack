import React ,{Component} from 'react';
import AuthForm from './AuthForm';
import {graphql} from 'react-apollo';

import currentUserQuery from '../queries/CurrentUser'; 
import signupMutation from '../mutations/Signup';

class Signup extends Component{
  constructor(props){
    super(props);
    this.state={
      errors:[],
    }
  }
  componentWillUpdate(nextProps){
    //this.props // the old, current set of props
    //nextProps // the next set of props that will be in place

    if(!this.props.data.currentUser && nextProps.data.currentUser){
      this.props.history.push('/dashboard');
    }
  }

  onSubmit({email,password}){
    this.props.mutate({
      variables:{email,password},
      refetchQueries:()=> [{query:currentUserQuery}]
    }).catch( err=>{
      const errors = err.graphQLErrors.map(err => err.message);
      this.setState({errors});
    }).then(res=>{
      //don't do it here cos this is called right after d mutation so ..
      //bebore d retetchQueries. I do it in componentWillUpdate instead
    })
  }
  render(props){
    return(
      <div className = 'container'>
        <h3>Sign up</h3>
        <AuthForm
          onSubmit = {this.onSubmit.bind(this)}
          errors = {this.state.errors}
        />
      </div>
    );
  }
}

export default graphql(currentUserQuery) (
  graphql(signupMutation) (Signup)
);