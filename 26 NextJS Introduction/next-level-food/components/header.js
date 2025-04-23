import Link from "next/link";
import Image from "next/image";

import logo from "@/assets/logo.png";
import styles from "@comp/header.module.css";
import HeaderBg from "@comp/header-bg";
import NavLink from "@comp/nav-link";

const Header = () => {
    return (
        <>
            <HeaderBg />
            <header className={styles.header}>
                <Link href="/" className={styles.logo}>
                    <Image src={logo} alt="A plate with food on it" priority />
                    NextLevel Food
                </Link>
                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <NavLink href="/meals">Browse Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href="/community">Foodie Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;
