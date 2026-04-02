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

    return (
      <SvgIcon
        data-slot="app-image"
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