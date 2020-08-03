import React from 'react';
import { shallow } from 'enzyme';
import Day from './Day';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../store/rootReducer';
const store = createStore(rootReducer)

describe('Day', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Provider store={store}><Day /></Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});
