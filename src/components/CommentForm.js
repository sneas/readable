import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { api } from "../utils/api";
import * as uuid from "uuid";
import { findPost } from "../utils/find-post";
import { addComment } from "../actions/index";

class CommentForm extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  state = {
    comment: {
      author: '',
      body: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.comment.id) {
      this.updateComment();
    } else {
      this.createComment();
    }
  }

  updateComment() {

  }

  createComment() {
    const comment = {
      ...this.state.comment,
      id: uuid(),
      timestamp: Date.now(),
      parentId: this.props.post.id
    };

    api.createComment(comment).then(comment => {
      this.props.dispatch(addComment(this.props.post.id, comment));
      this.setState({
        comment: {
          author: '',
          body: ''
        }
      })
    });
  }

  handleChange(field, value) {
    this.setState({
      comment: {
        ...this.state.comment,
        [field]: value,
      }
    });
  }

  render() {
    const comment = this.state.comment

    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <div className="form-group">
          <input
            type="text"
            name="author"
            className="form-control"
            placeholder="Your name"
            value={comment.author}
            onChange={(event) => this.handleChange('author', event.target.value)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="body"
            className="form-control"
            placeholder="Your comment"
            value={comment.body}
            onChange={(event) => this.handleChange('body', event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    )
  }
}

export default connect(({posts}, ownProps) => ({
  post: findPost(posts, ownProps.id)
}))(CommentForm);
