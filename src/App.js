import * as React from 'react';
import {Provider} from 'react-redux';
import AuthenticationContainer from './pages/common/AuthenticationContainer';
import store from './utilities/store';

export default function App() {
  return (
    <Provider store={store}>
      <AuthenticationContainer />
    </Provider>
  );
}
