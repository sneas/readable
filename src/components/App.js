import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom'
import Category from './PostList';
import { connect } from "react-redux";
import { fetchCategories, fetchPosts } from "../utils/api";
import { setCategories, setPosts } from "../actions/index";

class App extends Component {
  componentDidMount() {
    fetchCategories().then(categories => {
      this.props.dispatch(setCategories(categories));
    });

    fetchPosts().then(posts => {
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
                </div>
            </nav>
            <div className="container">
              <Route exact path='/' component={Category} />
              <Route exact path='/category/:category' component={Category} />
            </div>
        </div>
    );
  }
}

export default withRouter(connect()(App));
