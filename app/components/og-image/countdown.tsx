import { OgImageProps } from "~/types/og-image"

export default function OgImageCountdown({ color, text }: OgImageProps) {
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
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          height: "82%",
          background: "white",
          borderRadius: "8px"
        }}
      >
        <p
          style={{
            fontSize: "56px"
          }}
        >
          {text[0]}
        </p>
        <p
          style={{
            display: "flex",
            marginTop: "48px",
            alignItems: "flex-end",
            lineHeight: "48px",
            fontSize: "48px"
          }}
        >
          {text[1]}
          <span
            style={{
              margin: "0 8px",
              lineHeight: "100px",
              fontSize: "128px"
            }}
          >
            {text[2]}
          </span>
          {text[3]}
        </p>
      </div>
    </div>
  )
}
