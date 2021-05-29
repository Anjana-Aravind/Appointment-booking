import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import serviceDashboardPage from "./components/serviceProviderDashboard/index";
import customerDashboard from "./components/customerDashboard/index";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={serviceDashboardPage} />
            <Route exact path="/customer" component={customerDashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
