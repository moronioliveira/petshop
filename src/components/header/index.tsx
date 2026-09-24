import { FiShoppingCart } from "react-icons/fi"
import styles from "./header.module.css"
import { Link } from "react-router"
import { useContext } from "react"
import { CartContext } from "../../context/cartContext"
import { MdOutlinePets } from "react-icons/md";

export function Header(){

    const {cartAmount} = useContext(CartContext)
    return(
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to="/">
                <h1 className={styles.title}> PetShop <MdOutlinePets /></h1> 
                </Link>
              <div className={styles.cart}>
                <Link to="/cart">
                <FiShoppingCart className={styles.carrinho} size={30} color="#fefefe"/>
                {cartAmount > 0 && (
                    <span className={styles.contador}>
                    {cartAmount}
                </span>
                )}
                </Link>
              </div>
            </nav>
        </header>
    )
}