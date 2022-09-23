import { render } from '@testing-library/react'

import Anchor from '.'

const props = {
  title: 'test',
  href: 'https://example.com/'
}

describe('Anchor', () => {
  test('属性が正しく設定されているか', () => {
    const { getByRole } = render(<Anchor {...props} />)
    const link = getByRole('link')

    expect(link).toHaveAttribute('title', props.title)
    expect(link).toHaveAttribute('href', props.href)
  })

  test('子要素が表示されるか', () => {
    const { getByRole } = render(
      <Anchor {...props}>
        <p>test</p>
      </Anchor>
    )
    const link = getByRole('link')

    expect(link).toContainHTML('<p>test</p>')
  })
})
