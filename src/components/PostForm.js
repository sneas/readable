import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchPost } from "../utils/api";
import { withRouter } from 'react-router-dom'

class PostForm extends Component {
  state = {
    post: {}
  }

  componentDidMount() {
    if (this.props.postId) {
      fetchPost(this.props.postId).then((post) => {
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

function mapStateToProps({categories, posts}, ownProps) {
  return {
    categories,
    postId: ownProps.match.params.postId,
  }
}

export default withRouter(connect(mapStateToProps)(PostForm));