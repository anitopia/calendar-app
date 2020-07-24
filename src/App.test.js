import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './store/rootReducer';
const store = createStore(rootReducer)
describe('App', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}><App /></Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});
