import { cn } from "@/lib/utils";

export type FormCardProps = {
    title?: string;     
    children: React.ReactNode;
    customClasses?: string | string[];
}

export function FormCard({ children, customClasses }: FormCardProps) {
    return (
        <section className={cn("w-100 max-w-[412px] flex-initial radius-sm bg-card h-auto flex-center-center", customClasses)}>
            {children}
        </section>
    )
}