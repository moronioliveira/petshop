import { BsCartPlus } from "react-icons/bs"
import styles from "./home.module.css"
import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { CartContext } from "../../context/cartContext";
import toast from "react-hot-toast";
import { MdOutlinePets } from "react-icons/md";
import { FaCat } from "react-icons/fa";


export interface ProductsProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
}




export function Home(){
    const {addItemCart} = useContext(CartContext)
     const [products, setProducts] = useState<ProductsProps[]>([])

     useEffect(()=>{
        async function getProducts() {
            const response = await api.get("/products")
            setProducts(response.data)
        }
        getProducts();
     },[])

     function handleAddCardItem(products: ProductsProps){
        toast.success("Produto adicionado no carrinho", {
            style:{
                backgroundColor:" #ffae00",
                borderRadius: 10,
                color:" #fff",
                padding: "30px 30px",
                fontSize: 17,
                border: "2px solid #fff",
            }
            
        })
        addItemCart(products)

        
    }

    return(
        <div className={styles.container}>

            <br /><h1 className={styles.titulo}><FaCat /> Produtos em Alta <FaCat /> </h1><br /><br />
            
            <div className={styles.grid}>

           {products.map((products)=>(
            <section key={products.id} className={styles.sessaoProdutos}>
            <div className={styles.imgBotao}>
             <img
            className={styles.imagem}
             src={products.cover}
             alt={products.title} />
             <button 
             onClick={()=> handleAddCardItem(products)}
             className={styles.botao}>
                <BsCartPlus size={27} color="#fefefe"/>
                </button>
            </div>

            <div className={styles.preco}>
             <span className={styles.tituloProduto}>{products.title}</span>
                    <strong className={styles.quantia}><span> {products.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
             })}</span></strong>
            
           </div>
           </section>
           ))}
            </div>
        </div>
    )
}