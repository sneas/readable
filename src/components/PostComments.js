import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { api } from "../utils/api";
import CommentForm from './CommentForm';
import { findPost } from "../utils/find-post";
import { setComments, deleteComment, updateComment } from "../actions/index";

class PostComments extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  state = {
    isLoaded: false,
    editId: null,
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

  vote(event, commentId, option) {
    event.preventDefault();
    api.voteForComment(commentId, option).then((comment) => {
      this.props.dispatch(updateComment(this.props.id, comment));
    });
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
            {
              this.state.editId === comment.id
              ? (
                <CommentForm id={post.id} commentId={comment.id} onExit={() => this.setState({editId: null})} />
              ) : (
                <div>
                  <p>From <strong>{comment.author}</strong></p>
                  <p>{comment.body}</p>
                  <div>
                    <span className="label label-info">{comment.voteScore}</span>
                    <button className="btn-link" onClick={event => this.vote(event, comment.id, 'upVote')}><i className="glyphicon glyphicon-thumbs-up" /></button>
                    <button className="btn-link" onClick={event => this.vote(event, comment.id, 'downVote')}><i className="glyphicon glyphicon-thumbs-down" /></button>
                    <button className="btn-link" onClick={() => this.setState({editId: comment.id})}>
                      <i className="glyphicon glyphicon-edit" />Edit
                    </button>
                    <button className="btn-link" onClick={() => this.deleteComment(comment.id)}>
                      <i className="glyphicon glyphicon-remove" />Delete
                    </button>
                  </div>
                </div>
              )
            }
            <hr />
          </div>
        ))}

        {
          this.state.editId ? ''
            : (
              <CommentForm id={post.id}  />
            )
        }
      </div>
    )
  }
}

export default connect(({posts}, ownProps) => ({
  post: findPost(posts, ownProps.id)
}))(PostComments);
