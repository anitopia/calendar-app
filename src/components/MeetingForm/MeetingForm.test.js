import React from 'react';
import { shallow } from 'enzyme';
import MeetingForm from './MeetingForm';

describe('MeetingForm', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<MeetingForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
