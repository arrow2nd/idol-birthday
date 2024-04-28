export default function Footer(): JSX.Element {
  return (
    <footer className="w-full text-center text-xs text-base-content sm:text-right">
      <div className="divider"></div>
      <p>
        {"Developed by arrow2nd | "}
        <a
          className="link link-accent"
          href="https://github.com/arrow2nd/idol-birthday"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
      <p>
        The rights to all content related to THE IDOLM@STER™ belong to Bandai
        Namco Entertainment Inc.
      </p>
    </footer>
  )
}
