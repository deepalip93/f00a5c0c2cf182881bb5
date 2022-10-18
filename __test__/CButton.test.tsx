jest.useFakeTimers("legacy")
import React from 'react'
import renderer from 'react-test-renderer'
import CButton from '../src/CButton'

describe('<CButton.test />', () => {
  const wrapper = renderer.create(<CButton />)
  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})