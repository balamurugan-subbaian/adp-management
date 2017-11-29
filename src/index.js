import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import styles from './styles/styles.scss'
import SayHello from './components/SayHello/';

ReactDOM.render(
<AppContainer>
<SayHello />
</AppContainer>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./components/SayHello', () => {
      const NewRoot = require('./components/SayHello').default;
      ReactDOM.render(
        <AppContainer>
          <NewRoot />
        </AppContainer>,
        document.getElementById('root')
      );
    });
  }