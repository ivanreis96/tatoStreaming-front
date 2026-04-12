import * as React from "react"
import { cn } from "../../lib/utils"

type ImageDimension = number | string
type SvgComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>

type AppImageProps = Omit<React.ComponentProps<"img">, "src" | "width" | "height"> & {
  src: string | SvgComponent
  width?: ImageDimension
  height?: ImageDimension
  keepOriginalSize?: boolean
  fullWidth?: boolean
  fillColor?: string
  svgProps?: Omit<React.SVGProps<SVGSVGElement>, "style" | "className">
  alt: string
}

function AppImage({
  src,
  alt,
  width,
  height,
  keepOriginalSize = false,
  fullWidth = false,
  fillColor,
  svgProps,
  className,
  style,
  ...props
}: AppImageProps) {
  const scopedFillId = React.useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const sizeStyle: React.CSSProperties = {}

  if (!keepOriginalSize) {
    if (fullWidth) {
      sizeStyle.width = "100%"
      sizeStyle.height = height ?? "auto"
    }

    if (width !== undefined) {
      sizeStyle.width = width
    }

    if (height !== undefined) {
      sizeStyle.height = height
    }
  }

  if (typeof src !== "string") {
    const SvgIcon = src
    const applyForcedFill = Boolean(fillColor)

    return (
      <>
        {applyForcedFill ? (
          <style>
            {`[data-app-image-fill="${scopedFillId}"], [data-app-image-fill="${scopedFillId}"] * { fill: ${fillColor} !important; }`}
          </style>
        ) : null}
        <SvgIcon
          data-slot="app-image"
          data-app-image-fill={applyForcedFill ? scopedFillId : undefined}
          role="img"
          aria-label={alt}
          className={cn("block max-w-full", className)}
          style={{
            ...sizeStyle,
            ...(fillColor ? { color: fillColor, fill: fillColor } : {}),
            ...style,
          }}
          {...svgProps}
        />
      </>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      data-slot="app-image"
      className={cn("block max-w-full", className)}
      style={{ ...sizeStyle, ...style }}
      {...props}
    />
  )
}

export { AppImage }