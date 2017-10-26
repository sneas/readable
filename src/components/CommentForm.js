import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { api } from "../utils/api";
import * as uuid from "uuid";
import { findPost } from "../utils/find-post";
import { addComment, updateComment } from "../actions/index";

class CommentForm extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    commentId: PropTypes.string,
    onExit: PropTypes.func
  }

  state = {
    comment: {
      author: '',
      body: '',
    }
  }

  componentDidMount() {
    if (this.props.comment) {
      this.setState({comment: this.props.comment});
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
    api.updateComment(this.state.comment).then(comment => {
      this.props.dispatch(updateComment(this.props.post.id, comment));

      if (this.props.onExit) {
        this.props.onExit();
      }
    });
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
        <button type="submit" className="btn btn-primary">Submit</button> {
          this.props.onExit
            ? (<button type="button" className="btn btn-warning" onClick={() => this.props.onExit()}>Cancel</button>)
            : ''
        }
      </form>
    )
  }
}

export default connect(({posts}, ownProps) => ({
  post: findPost(posts, ownProps.id),
  comment: findPost(posts, ownProps.id).comments.find(comment => comment.id === ownProps.commentId),
}))(CommentForm);
