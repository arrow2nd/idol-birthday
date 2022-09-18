const url = 'https://idol-birthday-next.vercel.app'
const name = 'idol-birthday-countdown'
const descTemplate = `%sのお誕生日までをカウントダウンするサイト`

export const site = {
  url,
  defaultOgpImageUrl: url + '/ogp.png',
  name,
  title: `${name} | アイドルのお誕生日まで…？`,
  desc: descTemplate.replace('%s', 'アイマスアイドル'),
  titleTemplate: `%s | ${name}`,
  descTemplate
}
