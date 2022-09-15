import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'

function Nav() {
return (
    <div className={navStyles.nav}>
        <ul>
            <li>
                <Link href='/home'>Home</Link>
            </li>
            {/* <li>
                <Link href='/topics'>Topics</Link>
            </li>
            <li>
                <Link href='/trending'>Trending</Link>
            </li>
            <li>
                <Link href='/collections'>Collections</Link>
            </li>
            <li>
                <Link href='/events'>Events</Link>
            </li> */}
            <li>
                <Link href='/logout'>Logout</Link>
            </li>
            
        </ul>
    </div>
)
}

export default Nav