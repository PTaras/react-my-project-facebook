// Core
import React, { Component } from 'react';

//Components
import Feed from 'components/Feed';
import { Provider } from 'components/HOC/withProfile';

//Instruments
import avatar from 'theme/assets/homer';

const options = {
    avatar,
    currentUserFirstName: 'Homer',
    currentUserLastName:  'Simpson',
};
export default class App extends Component {
    render() {
        return (
            <Provider value = { options }>
                <Feed />;
            </Provider>
        );
    }
}
