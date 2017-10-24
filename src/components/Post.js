import React, { Component } from 'react';
import { connect } from "react-redux";
import { api } from "../utils/api";
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { deletePost } from "../actions/index";
import PostSummary from './PostSummary';
import PostComments from './PostComments';
import { findPost } from "../utils/find-post";

class Post extends Component {
  delete(event) {
    event.preventDefault();
    if (!window.confirm('Are you sure')) {
      return;
    }

    api.deletePost(this.state.post.id).then(() => {
      this.props.dispatch(deletePost(this.state.post));
      this.props.history.replace(`/category/${this.state.post.category}`);
    })
  }

  render() {
    if (!this.props.post) {
      return '';
    }

    const post = this.props.post;
    return (
      <div>
        <h1>{post.title}</h1>
        <p>
          <Link to={`/edit/post/${post.id}`}>
            <i className="glyphicon glyphicon-edit" />
            Edit
          </Link>
          &nbsp;
          <button className="btn-link" onClick={e => this.delete(e)}>
            <i className="glyphicon glyphicon-remove" />
            Delete
          </button>
        </p>
        <p>{post.body}</p>
        <PostSummary id={post.id} allowVoting={true} />
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
