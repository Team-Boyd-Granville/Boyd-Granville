import styles from '../styles/Layout.module.css'

function LoginLayout({ children }) {
    return (
        <>
        <div className={styles.container}>
            <main className={styles.main}>
                {children}
            </main>
        </div>
        </>
    )
}

export default LoginLayout