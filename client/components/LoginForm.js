import React ,{Component} from 'react';
import {graphql} from 'react-apollo';
import AuthForm from './AuthForm';
import loginMutation from '../mutations/Login';
import currentUserQuery from '../queries/CurrentUser';

class LoginForm extends Component{
  constructor(){
    super();
    this.state={
      errors:[]
    };
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
    }).catch(err=>{
      const errors = err.graphQLErrors.map(err => err.message);
      this.setState({errors});
    });
  }
  render(props){
    return(
      <div className= 'container'>
        <h3>Login</h3>
        <AuthForm
          onSubmit= {this.onSubmit.bind(this)}
          errors = {this.state.errors}
        
        />
      </div>
    );
  }
}

export default graphql(currentUserQuery) (
  graphql(loginMutation) (LoginForm)
);