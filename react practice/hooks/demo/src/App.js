import React from 'react';
import Color from './contexts/colors';
import Button from "./components/Button";
import Panel from "./components/Panel";


function App() {
    return (
        <Color color='blue'>
            <Panel></Panel>
            <Button></Button>
        </Color>
    );
}

export default App;
