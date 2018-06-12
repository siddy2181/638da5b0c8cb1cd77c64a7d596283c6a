import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Home from '../src/components/Home';
import NewServiceRequest from '../src/components/NewServiceRequest';
import {Alert} from 'react-bootstrap';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

jest.mock("../src/api/makeRequest", (url, options) => {

});

describe('<Home/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home/>);
  });

  test('renders everything', () => {
    expect(wrapper.find('div')).toHaveLength(9);
  });

  test('Show add service request form', () => {
    const Btn = wrapper.find('#AddServiceRequest');
    Btn.simulate('click');
    expect(wrapper.state('displayForm')).toBeTruthy();
    expect(wrapper.find(NewServiceRequest)).toHaveLength(1);

  })
  test('Check wait time appears', () => {
    const Btn = wrapper.find('#CheckWaitTimeBtn');
    Btn.simulate('click');
    expect(wrapper.state('displaydisplayStatusWaitTime')).toBeTruthy();
    expect(wrapper.find('.wait-time')).toHaveLength(1);

  })

  test('Displays messages properly', () => {
    wrapper.setState({displayError: true, displaySuccess: true})
    expect(wrapper.find(Alert)).toHaveLength(2)
  })

  test('Displays status of work order', () => {
    const Btn = wrapper.find('#WorkOrderStatusBtn');
    Btn.simulate('click');
    expect(wrapper.state('displayStatus')).toBeTruthy();

  })

});