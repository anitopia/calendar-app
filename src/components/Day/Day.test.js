import React from 'react';
import { shallow } from 'enzyme';
import Day from './Day';

describe('Day', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Day />);
    expect(wrapper).toMatchSnapshot();
  });
});
