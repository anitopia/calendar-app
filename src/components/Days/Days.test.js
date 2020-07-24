import React from 'react';
import { shallow } from 'enzyme';
import Days from './Days';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../store/rootReducer';
const store = createStore(rootReducer)
describe('Days', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Provider store={store}><Days /></Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});
