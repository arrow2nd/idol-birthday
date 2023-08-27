import CardBackToTop from "../card/back"
import Form from "./form"
import Logo from "./logo"

type Props = {
  showBackToTop?: boolean
}

export default function Navi({ showBackToTop = false }: Props): JSX.Element {
  return (
    <div className="flex basis-full gap-4">
      {showBackToTop && <CardBackToTop />}
      <div className="card flex-1 bg-base-200 text-base-content">
        <div className="card-body flex-row">
          <div className="flex flex-1 flex-col items-center justify-center md:flex-row">
            <Logo className="mb-4 mr-0 md:mb-0 md:mr-8 lg:mr-16" />
            <Form />
          </div>
        </div>
      </div>
    </div>
  )
}
