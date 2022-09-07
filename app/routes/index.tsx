import { GiPartyPopper } from 'react-icons/gi'

import Layout from '~/components/common/layout'

export default function Index() {
  return (
    <Layout>
      <div className="flex justify-center items-center text-md text-gray-800">
        <GiPartyPopper />
        <span className="ml-1">もうすぐお誕生日のアイドル</span>
      </div>
    </Layout>
  )
}
