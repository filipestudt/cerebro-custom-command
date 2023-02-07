import React from 'react';
import { KeyboardNav, KeyboardNavItem } from 'cerebro-ui';
import styles from './styles.css';

export default function ({ data, exec }) {
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