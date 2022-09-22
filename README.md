# idol-birthday

🎂 アイマスアイドルのお誕生日までをカウントダウンするサイト

[![GitHub license](https://img.shields.io/github/license/arrow2nd/idol-birthday)](https://github.com/arrow2nd/idol-birthday)
[![Powered by im@sparql](https://img.shields.io/badge/powered%20by-im%40sparql-F34F6D)](https://sparql.crssnky.xyz/imas/)

![demo](https://user-images.githubusercontent.com/44780846/191645391-afe32efc-db77-40d7-a4bb-2b718ecda55b.png)

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
