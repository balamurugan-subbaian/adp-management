import React from 'react';
import {shallow} from 'enzyme';
import SayHello from './index';

describe('<SayHello />', () => {
    test('should render with one wrapper div', () => {
        const wrapper = shallow(<SayHello name="testName"/>);
        expect(wrapper.find('div')).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    })
})