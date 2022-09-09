import Anchor from '~/components/common/anchor'

export default function Footer() {
  return (
    <div className="py-16 text-sm text-main text-center">
      <p>
        {'Source on '}
        <Anchor
          className="font-bold underline hover:text-imas transition-colors"
          href="https://github.com/arrow2nd/idol-birthday/"
        >
          GitHub
        </Anchor>
      </p>
      <p className="mt-1">
        The rights to all content related to THE IDOLM@STER belong to Bandai
        Namco Entertainment Inc.
      </p>
    </div>
  )
}
