import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'

function Nav() {
return (
    <div className={navStyles.nav}>
        <ul>
            <li>
                <Link href='/'>Home</Link>
            </li>
            <li>
                <Link href='/other'>Other</Link>
            </li>
        </ul>
    </div>
)
}

export default Nav