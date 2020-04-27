import React from 'react';
import {connect} from 'react-redux';

const Test = props => {
  return (
    <p>Hello World</p>
  )
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);