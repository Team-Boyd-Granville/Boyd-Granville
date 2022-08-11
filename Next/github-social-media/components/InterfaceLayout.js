import styles from '../styles/Interface.module.css'
import Nav from './Nav'


function InterfaceLayout({ children }) {
    return (
        <>
        <Nav/>
        <div className={styles.container}>
            <main className={styles.main}>
                {children}
            </main>
        </div>
        </>
    )
}

export default InterfaceLayout