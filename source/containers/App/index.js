// Core
import React, { Component } from 'react';

//Components
import Feed from 'components/Feed';

//Instruments
import avatar from 'theme/assets/homer';

const options = {
    avatar,
    currentUserFirstName: 'Gomer',
    currentUserLastName: 'Simpson',
};
export default class App extends Component {
    render() {
        return <Feed { ...options } />;
    }
}
