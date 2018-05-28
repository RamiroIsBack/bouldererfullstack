import React, {Component} from 'react';
import {graphql} from 'react-apollo';

import currentUserQuery from '../queries/CurrentUser';

export default (WrappedComponent) =>{
  class RequireAuth extends Component {
    componentDidMount(){
      //debugger;
      if (!this.props.data.loading && !this.props.data.currentUser){
        this.props.history.push('/login');
      }
    }
    componentWillUpdate(nextProps) {
      //debugger;
      if (!nextProps.data.loading && !nextProps.data.currentUser){
        this.props.history.push('/login');
      }
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return graphql (currentUserQuery)(RequireAuth)

};