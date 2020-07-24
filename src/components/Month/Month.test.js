import React from 'react';
import { shallow } from 'enzyme';
import Month from './Month';

describe('Month', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Month />);
    expect(wrapper).toMatchSnapshot();
  });
});
