import { FiShoppingCart } from "react-icons/fi"
import styles from "./header.module.css"
import { Link } from "react-router"
import { useContext } from "react"
import { CartContext } from "../../context/cartContext"
import { MdOutlinePets } from "react-icons/md"
import { FaDog } from "react-icons/fa"

export function Header(){
    const { cartAmount } = useContext(CartContext)

    return(
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to="/" className={styles.logoLink}>
                    <h1 className={styles.title}>
                        <FaDog className={styles.iconDog} />
                        PetShop 
                        <MdOutlinePets className={styles.iconPaws} />
                    </h1> 
                </Link>
                
                <div className={styles.cart}>
                    <Link to="/cart" className={styles.cartLink}>
                        <FiShoppingCart className={styles.carrinho} size={28} color="#ffffff"/>
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