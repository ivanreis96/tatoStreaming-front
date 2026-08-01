import { memo } from "react";

type MovieBlockDetailProps = {
    label: string
    textDetail: string | string[]
    isMainDetail?: boolean
}

export const MovieBlockDetail = memo(function MovieBlockDetail({
    label,
    textDetail,
    isMainDetail = false
}: MovieBlockDetailProps) {
    return (
        <div className="flex flex-col items-start bg-card/75 p-4 gap-2 rounded-sm h-full">

                <div className={
                    `uppercase text-muted font-bold font-heading
                    ${isMainDetail ? ' text-base' : 'text-xs'}`
                }>
                    {label}
                </div>
                <div className={
                    `flex gap-2 flex-wrap font-heading ${isMainDetail ? 'text-base' : 'font-semibold text-sm'}`
                }>
                    {
                        Array.isArray(textDetail) ? textDetail.map((genre) => {
                            return (
                                <div className="bg-secondary text-secondary-foreground uppercase p-[8px] rounded-sm font-semibold text-xs" key={genre}>
                                    {genre}
                                </div>
                            )
                        }) 
                            : textDetail
                    }
                </div>
        </div>
    )
})