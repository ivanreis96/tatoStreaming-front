type YouTubeEmbedProps = {
  url: string
  title?: string
  className?: string
}

function getYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url)
    const host = parsedUrl.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const videoId = parsedUrl.pathname.slice(1)
      return videoId || null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsedUrl.pathname === '/watch') {
        return parsedUrl.searchParams.get('v')
      }

      if (parsedUrl.pathname.startsWith('/embed/')) {
        const [, , videoId] = parsedUrl.pathname.split('/')
        return videoId || null
      }

      if (parsedUrl.pathname.startsWith('/shorts/')) {
        const [, , videoId] = parsedUrl.pathname.split('/')
        return videoId || null
      }
    }

    return null
  } catch {
    return null
  }
}

export function YouTubeEmbed({ url, title = 'Trailer no YouTube', className }: YouTubeEmbedProps) {
  const videoId = getYouTubeVideoId(url)

  if (!videoId) {
    return (
      <p className="text-sm text-foreground/70">
        Link de trailer inválido para embed.
      </p>
    )
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`

  return (
    <div className={className}>
      <div className="relative w-full overflow-hidden rounded-[4px] bg-black pb-[56.25%]">
        <iframe
          title={title}
          src={embedUrl}
          className="absolute left-0 top-0 h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  )
}