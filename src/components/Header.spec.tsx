import React, { ReactElement } from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { createSnapshot } from '../testUtils';
import Header from './Header';

describe('The <Header /> component', () => {
  let component: ReactElement<any>;
  let wrapper: ShallowWrapper;
  let onAboutButtonClick: jest.Mock;

  beforeEach(() => {
    onAboutButtonClick = jest.fn();
    component = <Header onAboutButtonClick={onAboutButtonClick} />;
    wrapper = shallow(component);
  });

  it('renders as expected', () => expect(createSnapshot(component)).toMatchSnapshot());

  it('passes onAboutButtonClick prop to About button onClick attribute', () => {
    expect(wrapper.find('button').prop('onClick')).toEqual(onAboutButtonClick);
  });
});
