import React, {Component} from 'react';
import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import SayHello from './index';

describe('<SayHello />', () => {
    test('should render with one wrapper div', () => {
        const wrapper = shallow(<SayHello name="testName"/>);
        expect(wrapper.find('div')).toHaveLength(1);
        expect(toJSON(wrapper)).toMatchSnapshot();
    })
})