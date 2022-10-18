jest.useFakeTimers("legacy")
import React from 'react'
import renderer from 'react-test-renderer'
import Home from '../src/Home'

describe('<Home.test />', () => {
  const wrapper = renderer.create(<Home />)
  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})