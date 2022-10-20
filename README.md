# idol-birthday

🎂 アイマスアイドルのお誕生日までをカウントダウンするサイト

[![Powered by im@sparql](https://img.shields.io/badge/powered%20by-im%40sparql-F34F6D)](https://sparql.crssnky.xyz/imas/)
[![Depfu](https://badges.depfu.com/badges/155628bbde089babbd09c14dd3e67d79/status.svg)](https://depfu.com)
[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=idol-birthday)](https://idol-birthday.vercel.app)

![demo](https://user-images.githubusercontent.com/44780846/196964847-29e5742c-da60-46de-a25a-f9121523aa40.png)

## できること

- im@sparql に収録されているアイドル・スタッフのお誕生日までをカウントダウン
- 残り秒数をツイートで共有

## 実行

> **Warning**
>
> OGP 画像の生成には独自に定義した Cloudinary の Named Transformations を利用しています。
>
> 尚、定義内容についてはリポジトリに含まれていません。

`.env` を以下の内容で作成し、プロジェクトルートに配置する

```
CLOUDINARY_URL=<API Environment variable>
APP_SECRET=<任意のシークレット文字列>
```

以下のコマンドで実行

```
yarn dev
# or
yarn build && yarn start
```
