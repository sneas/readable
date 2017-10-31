import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import PostSummary from './PostSummary';
import PostComments from './PostComments';
import { findPost } from "../utils/find-post";
import PageNotFound from './PageNotFound';

class Post extends Component {
  onDelete(post) {
    this.props.history.replace(`/category/${post.category}`);
  }

  render() {
    if (!this.props.post) {
      return <PageNotFound />;
    }

    const post = this.props.post;
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <PostSummary id={post.id} onDelete={(post) => this.onDelete(post)} />
        <hr />
        <PostComments id={post.id} />
      </div>
    );
  }
}

function mapStateToProps({posts}, ownProps) {
  return {
    post: findPost(posts, ownProps.match.params.id)
  }
}

export default withRouter(connect(mapStateToProps)(Post));
