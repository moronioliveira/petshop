import { useContext } from "react"
import styles from "./cart.module.css"
import { CartContext } from "../../context/cartContext"

export function Cart(){

    const{cart, total, addItemCart, removeItemCart} = useContext(CartContext)

    return(
        <div className={styles.container}>
            <h1 className={styles.titulo}>Meu carrinho</h1>
          {cart.map((item)=>(
             <section key={item.id} className={styles.sessaoProdutos}>
            <img 
            className={styles.imagem}
            src={item.cover} 
            alt={item.title} />
             <strong>Preço: {item.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}</strong>

            <div className={styles.botao}>
                <button 
                onClick={()=> removeItemCart(item)}
                className="">
                    -
                </button>
                {item.amount}
                <button 
                onClick={()=> addItemCart(item)}
                className="">
                    +
                </button>
            </div>

            <strong className="">
                SubTotal: {item.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            </strong>
            </section>
            ))}

           <strong className={styles.total}> {cart.length !== 0 && <p className="">Total: {total}</p>}</strong>
        </div>

    )
}