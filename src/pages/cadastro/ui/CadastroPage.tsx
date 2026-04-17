import FormCard, { type FormCardProps } from '../../../shared/ui/FormCard'
import styles from '../style.module.css'
import { FormCadastro } from './FormCadastro'

var childrenCard: FormCardProps = {
    children:
        <FormCadastro />    
    ,
    customClasses: ["p-4"],
}


export function CadastroPage() {
    return (
        <div className={styles.cadastroPage}>
            <FormCard {...childrenCard} />
        </div>
    )
}