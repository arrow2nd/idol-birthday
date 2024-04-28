import { OgImageProps } from "~/types/og-image"

export default function OgImageHpb({ color, text }: OgImageProps) {
  return (
    <div
      lang="ja-JP"
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: `#${color}`
      }}
    >
      <div
        style={{
          display: "flex",
          margin: "auto",
          flexDirection: "column",
          width: "90%",
          height: "82%",
          background: "white",
          borderRadius: "8px",
          fontSize: "96px"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "auto"
          }}
        >
          <p
            style={{
              margin: 0,
              lineHeight: "48px",
              fontSize: "72px"
            }}
          >
            {text[0]}
          </p>
          <p
            style={{
              margin: "48px 0 0"
            }}
          >
            {text[1]}
          </p>
          <p
            style={{
              margin: "48px 0 0"
            }}
          >
            {text[2]}
          </p>
        </div>
      </div>
    </div>
  )
}
