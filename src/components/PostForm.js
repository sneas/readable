import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchPost } from "../utils/api";
import { withRouter } from 'react-router-dom'

class PostForm extends Component {
  state = {
    post: {}
  }

  componentDidMount() {
    if (this.props.id) {
      fetchPost(this.props.id).then((post) => {
        this.setState({
          post
        });
      })
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>Post form</div>
    );
  }
}

function mapStateToProps({categories}, ownProps) {
  return {
    categories,
    id: ownProps.match.params.id,
  }
}

export default withRouter(connect(mapStateToProps)(PostForm));