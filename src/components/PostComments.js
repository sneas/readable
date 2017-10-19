import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { api } from "../utils/api";
import CommentForm from './CommentForm';

class PostComments extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  }

  state = {
    isLoaded: false,
    comments: []
  }

  componentDidMount() {
    api.getAllComments(this.props.post.id).then(comments => {
      console.log(comments);
      this.setState({
        isLoaded: true,
        comments: comments
      })
    });
  }

  onComment(comment) {
    this.setState({
      comments: [
        ...this.state.comments,
        comment
      ]
    });
  }

  render() {
    const post = this.props.post;

    if (!this.state.isLoaded) {
      return '';
    }

    if (this.state.comments.length === 0) {
      return (
        <div>
          <p className="text-muted">No comments yet. Be the first one to comment.</p>
          <CommentForm post={post} onComment={(comment) => this.onComment(comment)} />
        </div>
      )
    }

    return (
      <div>
        {this.state.comments.map(comment => (
          <div key={comment.id}>
            <p>From <strong>{comment.author}</strong></p>
            <p>{comment.body}</p>
            <hr />
          </div>
        ))}
        <CommentForm post={post} onComment={(comment) => this.onComment(comment)} />
      </div>
    )
  }
}

export default connect()(PostComments);
