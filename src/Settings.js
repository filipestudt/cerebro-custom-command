import React, { Component } from 'react';
import styles from './styles.css';
import { KeyboardNav, KeyboardNavItem } from 'cerebro-ui';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.state = {
            data: props.data
        }
    }

    doit() {
        console.log('doit')
    }

    handleInputChange(event) {
        this.setState({ data: event.target.value });
    }

    handleConfirm() {
        this.props.exec(this.state.data);
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <KeyboardNav>
                    Path to the .json config file:
                    <KeyboardNavItem>
                        <input type="text"
                            value={this.state.data}
                            placeholder="ex: C:/User/Documents/config.json"
                            onChange={this.handleInputChange}>
                        </input>
                    </KeyboardNavItem>
                    <KeyboardNavItem>
                        <button
                            onClick={this.handleConfirm}>Confirm</button>
                    </KeyboardNavItem>
                </KeyboardNav>
            </div>
        )
    }
}

export default Settings;