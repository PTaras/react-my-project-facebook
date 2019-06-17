// Core
import React, { Component } from 'react';

//Components
import Catcher from 'components/Catcher';
import Feed from 'components/Feed';
import { Provider } from 'components/HOC/withProfile';

//Instruments
import avatar from 'theme/assets/homer';

const options = {
    avatar,
    currentUserFirstName: 'Тарас',
    currentUserLastName:  'Поцыкайло',
};
export default class App extends Component {
    render() {
        return (
            <Catcher>
                <Provider value = { options }>
                    <Feed />;
                </Provider>
            </Catcher>
        );
    }
}
