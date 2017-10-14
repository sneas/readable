import React, { Component } from 'react';
import { connect } from "react-redux";
import { api } from "../utils/api";
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

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

  render() {
    const post = this.state.post;
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <p><Link to={`/edit/post/${post.id}`}>Edit</Link></p>
      </div>
    );
  }
}

export default withRouter(connect()(Post));
