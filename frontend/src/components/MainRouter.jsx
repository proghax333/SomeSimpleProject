import React from 'react'
import { BrowserRouter as Router, Switch, Route, useParams, Link } from 'react-router-dom';

import Home from './pages/Home';
import AllPosts from './pages/AllPosts';
import SafeRoute from './guards/SafeRoute';
import Login from './pages/Login';
import Post from './pages/Post';

export function MainRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/posts">
          <AllPosts />
        </Route>
        <Route path="/posts/:postId">
          <SafeRoute>
            <Post />
          </SafeRoute>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}

export default MainRouter;
