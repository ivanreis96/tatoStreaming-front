import { FieldError } from '@/components/ui/field'
import type { AuthResetStatus } from '../model/types'

type AuthResetStatusMessageProps = {
    status: AuthResetStatus | null
}

export function AuthResetStatusMessage({ status }: AuthResetStatusMessageProps) {
    if (!status) {
        return null
    }

    if (status.type === 'error') {
        return <FieldError>{status.message}</FieldError>
    }

    return (
        <div className="rounded-sm border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
            {status.message}
        </div>
    )
}