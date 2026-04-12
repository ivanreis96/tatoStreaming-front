import { cn } from "../../lib/utils";

export type FormCardProps = {
    title?: string;     
    children: React.ReactNode;
    customClasses?: string | string[];
}

export default function FormCard(Props: FormCardProps) {
    return (

        <div className={cn("w-100 max-w-[412px] flex-initial radius-sm bg-card h-auto flex-center-center", Props.customClasses)} {...Props} >
            {Props.children}
        </div>
    )
}