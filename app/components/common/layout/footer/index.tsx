import Anchor from '~/components/common/anchor'

export default function Footer() {
  const anchorClassName =
    'font-bold underline hover:text-imas transition-colors'

  return (
    <div className="px-8 py-16 text-sm text-main text-center border-t">
      <p>
        {'Source on '}
        <Anchor
          className={anchorClassName}
          href="https://github.com/arrow2nd/idol-birthday/"
        >
          GitHub
        </Anchor>
      </p>
      <p>
        {'Powered by '}
        <Anchor
          className={anchorClassName}
          href="https://sparql.crssnky.xyz/imas/"
        >
          im@sparql
        </Anchor>
      </p>
      <p className="mt-1">
        The rights to all content related to THE IDOLM@STER belong to Bandai
        Namco Entertainment Inc.
      </p>
    </div>
  )
}
