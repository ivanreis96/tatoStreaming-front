import FormCard, { type FormCardProps } from '../../../shared/ui/FormCard'
import styles from '../style.module.css'
import { FormLogin } from './FormLogin'

var childrenCard: FormCardProps = {
    children:
        <FormLogin />
    ,
    customClasses: ["p-4"],
}


export function LoginPage() {
    return (
        <div className={styles['align-login']}>
            <div className={styles['login-page']}>
                <FormCard {...childrenCard} />
            </div>
        </div>
    )
}