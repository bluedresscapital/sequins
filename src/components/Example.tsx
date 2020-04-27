import React from 'react';
import {connect} from 'react-redux';

// Example import
// import { example } from '../actions';

const Example = props => {
  return (
    <p>Hello World</p>
  )
}

const mapStateToProps = state => {
  return {
    // example: state.example,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // addNum: () => dispatch(example.addNum())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);