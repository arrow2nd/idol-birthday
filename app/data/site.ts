const url = "https://idol-birthday.vercel.app"
const name = "idol-birthday"

const descTemplate = `%sのお誕生日をカウントダウン`
const defaultDesc = descTemplate.replace("%s", "アイドル")

export const site = {
  url,
  defaultOgpImageUrl: `${url}/ogp.png`,
  name,
  title: `${name} | ${defaultDesc}`,
  desc: defaultDesc,
  descTemplate
}
