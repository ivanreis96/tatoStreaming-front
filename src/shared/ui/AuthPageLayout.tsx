import { FormCard } from '@/shared'

type AuthPageLayoutProps = {
    title: string
    description?: string
    children: React.ReactNode
}

export function AuthPageLayout({ title, description, children }: AuthPageLayoutProps) {
    return (
        <div className="flex min-h-[calc(100vh-149px)] items-center justify-center px-4 py-8">
            <FormCard customClasses={["w-full", "p-4"]}>
                <div className="flex w-full flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
                        {description ? (
                            <p className="text-sm text-muted-foreground">{description}</p>
                        ) : null}
                    </div>
                    {children}
                </div>
            </FormCard>
        </div>
    )
}