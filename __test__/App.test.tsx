jest.useFakeTimers("legacy")
import React from 'react'
import renderer from 'react-test-renderer'
import App from '../App'

describe('<CButton.test />', () => {
  const wrapper = renderer.create(<App />)
  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})