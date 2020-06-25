import React from 'react'
import { render } from 'utils/test'
import GraphQL from '../GraphQL'

describe('utils/providers/GraphQL', () => {
  it(`renders on it's own`, () => {
    const output = render(<GraphQL />)

    // console.log(output)
    expect(output).toBeInstanceOf(Object)
  })
})
