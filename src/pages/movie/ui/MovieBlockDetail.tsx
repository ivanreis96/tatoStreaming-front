import { memo } from "react";

type MovieBlockDetailProps = {
    label: string
    textDetail: string
    isMainDetail?: boolean,
}

export const MovieBlockDetail = memo(function MovieBlockDetail({
    label,
    textDetail,
    isMainDetail = false
}: MovieBlockDetailProps) {
    return (
        <div className="flex flex-col items-start bg-card p-4 gap-2">
            <div className={
                `text-muted font-bold font-heading
                ${isMainDetail ? ' text-base' : 'text-xs'}`
            }>
                {label}
            </div>
            <div className={
                `font-heading ${isMainDetail ? 'text-base' : 'font-semibold text-sm'}`
            }>
                {textDetail}
            </div>
        </div>
    )
})