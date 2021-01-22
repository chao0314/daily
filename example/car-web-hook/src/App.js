import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import {Switch, Route} from 'react-router-dom';
import Index from './views/Index';
import Detail from './views/Detail';
import Contract from './views/Contact';
// import Parent from './components/test-memo/parent'


function App() {

    return (
        <div className="wrap-body">
            <Header/>
            <Switch>
                <Route path="/" component={Index} exact/>
                <Route path="/detail" component={Detail}/>
                <Route path="/contract" component={Contract}/>
            </Switch>
            <Footer/>

            {/*<Parent/>*/}

        </div>

    );
}

export default App;
