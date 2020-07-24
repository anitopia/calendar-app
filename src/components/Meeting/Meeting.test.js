import React from 'react';
import { shallow } from 'enzyme';
import Meeting from './Meeting';

describe('Meeting', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Meeting />);
    expect(wrapper).toMatchSnapshot();
  });
});
