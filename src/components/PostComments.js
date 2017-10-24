import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { api } from "../utils/api";
import CommentForm from './CommentForm';
import { findPost } from "../utils/find-post";
import { setComments, deleteComment } from "../actions/index";

class PostComments extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  state = {
    isLoaded: false
  }

  componentDidMount() {
    api.getAllComments(this.props.post.id).then(comments => {
      this.props.dispatch(setComments(this.props.post.id, comments));
      this.setState({
        isLoaded: true,
      })
    });
  }

  deleteComment(id) {
    if (!window.confirm('Are you sure')) {
      return;
    }

    api.deleteComment(id).then(() => {
      this.props.dispatch(deleteComment(this.props.post.id, id));
    })
  }

  render() {
    const post = this.props.post;

    if (!this.state.isLoaded) {
      return '';
    }

    if (!this.props.post.comments) {
      return (
        <div>
          <p className="text-muted">No comments yet. Be the first one to comment.</p>
          <CommentForm id={post.id} />
        </div>
      )
    }

    return (
      <div>
        {this.props.post.comments.map(comment => (
          <div key={comment.id}>
            <p>From <strong>{comment.author}</strong></p>
            <p>{comment.body}</p>
            <div>
              <button className="btn-link" onClick={() => this.deleteComment(comment.id)}>
                <i className="glyphicon glyphicon-remove" />Delete
              </button>
            </div>
            <hr />
          </div>
        ))}
        <CommentForm id={post.id}  />
      </div>
    )
  }
}

export default connect(({posts}, ownProps) => ({
  post: findPost(posts, ownProps.id)
}))(PostComments);
