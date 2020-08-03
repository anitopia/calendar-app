import React from 'react';
import { shallow } from 'enzyme';
import MeetingForm from './MeetingForm';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../store/rootReducer';
const store = createStore(rootReducer)

describe('MeetingForm', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Provider store={store}><MeetingForm /></Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});
