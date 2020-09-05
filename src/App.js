import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuTop from './components/MenuTop'

// Pages
import Home from "./pages/Home";
import NewMovies from "./pages/NewMovies";
import Popular from "./pages/Popular";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import Error404 from "./pages/Error404";

function App() {
  const { Header, Content } = Layout;

  return (
    <Layout>
      <Router>
        <Header style={{zIndex: 1}}>
          <MenuTop/>
        </Header>
        <Content>
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>
            <Route path="/new-movies/:pag?" exact={true}>
              <NewMovies />
            </Route>
            <Route path="/popular" exact={true}>
              <Popular />
            </Route>
            <Route path="/search" exact={true}>
              <Search />
            </Route>
            <Route path="/movie/:id" exact={true}>
              <Movie />
            </Route>
            <Route path="*">
              <Error404/>
            </Route>
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
