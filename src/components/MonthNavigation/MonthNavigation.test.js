import React from 'react';
import { shallow } from 'enzyme';
import MonthNavigation from './MonthNavigation';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../store/rootReducer';
const store = createStore(rootReducer)
describe('MonthNavigation', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}><MonthNavigation /></Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});
