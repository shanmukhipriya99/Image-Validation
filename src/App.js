import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Upload from "./pages/upload";
import Test from "./pages/test";
import Home from "./pages/home";

function App() {
  return (
    <>
      <Switch>
        <Route path="/upload" exact component={Upload} />
        <Route path="/test" exact component={Test} />
        <Route path="/" exact component={Home} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </>
  );
}

export default App;
