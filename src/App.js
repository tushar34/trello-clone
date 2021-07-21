import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Sign_in from './Components/Sign_in';
import Boards from './Components/Boards';
import List from './Components/List';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import history from './history';
import Lists from './Components/Lists';
function App() {
  return (
    <div>
      <Router history={history}>
      <Header history={history}/>
        <Switch>
          <Route  exact path='/'  component={Sign_in}/>
          <Route   path='/lists'  component={Lists}/>
          <Route   path='/boards'  component={Boards}/>
          <Route   path='/list'  component={List}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
