import PrivateRoute from "components/PrivateRoute";
import HomePage from "pages/HomePage";
import SignInPage from "pages/SignInPage";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/" >
          <HomePage />
        </PrivateRoute>
        <Route exact path="/signin" component={SignInPage} />
      </Switch>
    </div>
  );
}

export default App;
