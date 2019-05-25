// Core
import React, { Component } from 'react';

//Insruments
import avatar from 'theme/assets/homer';

export default class Composer extends Component {
    render () {
        return (
            <section>
                    <img src = { avatar } />
                    <form>
                        <textarea placeholder = { 'Text' } />
                        <input type = 'submit' value = 'Sent' />
                    </form> 
            </section>
        )
    }
}