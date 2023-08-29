const url = "https://idol-birthday.vercel.app"
const name = "idol-birthday"
const descTemplate = `%sのお誕生日をカウントダウン`

export const site = {
  url,
  defaultOgpImageUrl: url + "/ogp.png",
  name,
  title: `${name} | アイドルのお誕生日まで…？`,
  desc: descTemplate.replace("%s", "アイドル"),
  descTemplate
}
