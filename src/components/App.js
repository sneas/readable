import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom'
import Category from './PostList';
import { connect } from "react-redux";
import { setCategories, setPosts } from "../actions/index";
import PostForm from "./PostForm";
import Post from "./Post";
import { api } from "../utils/api";

class App extends Component {
  componentDidMount() {
    api.fetchCategories().then(categories => {
      this.props.dispatch(setCategories(categories));
    });

    api.fetchPosts().then(posts => {
      this.props.dispatch(setPosts(posts));
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">Readable</Link>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li><Link to={`/add/post`}>Write post</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <Route exact path='/' component={Category} />
          <Route exact path='/category/:category' component={Category} />
          <Route exact path='/add/post' component={PostForm} />
          <Route exact path='/edit/post/:id' component={PostForm} />
          <Route exact path='/post/:id' component={Post} />
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(App));
