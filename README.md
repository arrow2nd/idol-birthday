# idol-birthday

🎂 アイマスアイドルのお誕生日をカウントダウンするサイト

[![Powered by im@sparql](https://img.shields.io/badge/powered%20by-im%40sparql-F34F6D)](https://sparql.crssnky.xyz/imas/)
[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=idol-birthday)](https://idol-birthday.vercel.app)

![idol-birthday](https://github.com/arrow2nd/idol-birthday/assets/44780846/e638b435-2fd7-48c2-b8d4-904c5802bc42)

## できること

- im@sparql に収録されているアイドル・スタッフのお誕生日をカウントダウン
- 残り秒数を各種 SNS で共有

## 実行

`.env` を以下の内容で作成し、プロジェクトルートに配置する

```
APP_SECRET=<任意のシークレット文字列>
```

以下のコマンドで実行

```
pnpm dev
# or
pnpm build && pnpm start
```
