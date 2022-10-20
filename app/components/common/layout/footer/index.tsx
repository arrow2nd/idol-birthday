import Anchor from '~/components/common/anchor'

export default function Footer() {
  const anchorClassName =
    'link font-bold underline hover:text-imas transition-colors'

  return (
    <footer className="footer footer-center px-8 py-16 text-sm text-main text-center border-t">
      <div>
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
      </div>
      <div>
        <p className="mt-1">
          The rights to all content related to THE IDOLM@STER belong to Bandai
          Namco Entertainment Inc.
        </p>
      </div>
    </footer>
  )
}
