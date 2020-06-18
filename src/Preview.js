import React, {Component} from 'react'
import { KeyboardNav, KeyboardNavItem } from 'cerebro-ui'
import styles from './styles.css'

export default class extends Component {
    renderItems(data, exec) {
        return (
            <div className={styles.wrapper}>
                <KeyboardNav>
                    <ul className={styles.list}>
                        {data.map(s => (
                            <KeyboardNavItem                           
                                key={s.name}
                                tagName={'li'}
                                onSelect={() => exec(s.exec)}>
                                {s.name}
                            </KeyboardNavItem>))}
                    </ul>
                </KeyboardNav>
            </div>
        )
    } 

    renderForm(exec, data) {
        /**
         * Made the handleChange inside this function because the setState isn't working in the plugin
         */
        var handleInputChange = (event) => {
            exec(event.target.value)
        }
        
        return (
            <div className={styles.wrapper}>                          
                Path to the .json config file:
                <input type="text" 
                    value={data} 
                    placeholder="ex: C:/User/Documents/config.json" 
                    onChange={handleInputChange.bind(this)}>
                </input>
            </div>
        )
    }

    render() {
        if (this.props.type === 'form') {
            return this.renderForm(this.props.exec, this.props.data);
        }
        return this.renderItems(this.props.data, this.props.exec);
    }
}