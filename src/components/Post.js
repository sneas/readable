import React, { Component } from 'react';
import { connect } from "react-redux";
import { api } from "../utils/api";
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { deletePost } from "../actions/index";

class Post extends Component {
  state = {
    post: {}
  }

  componentDidMount() {
    api.fetchPost(this.props.match.params.id).then((post) => {
      this.setState({
        post
      });
    })
  }

  delete(event) {
    event.preventDefault();
    api.deletePost(this.state.post.id).then(() => {
      this.props.dispatch(deletePost(this.state.post));
      this.props.history.replace(`/category/${this.state.post.category}`);
    })
  }

  render() {
    const post = this.state.post;
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <p>
          <Link to={`/edit/post/${post.id}`}>Edit</Link>
          <button className="btn-link" onClick={e => this.delete(e)}>Delete</button>
        </p>
      </div>
    );
  }
}

export default withRouter(connect()(Post));
