import React from 'react';
import './SayHello.scss';

const SayHello = (props) => (
    <div>
        <h3 className="heading">Hello {props.name}...!</h3>
        <p>Welcome to adp management</p>
    </div>
)

export default SayHello;