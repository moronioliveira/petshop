import { BsCartPlus } from "react-icons/bs"
import styles from "./home.module.css"
import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { CartContext } from "../../context/cartContext";
import toast from "react-hot-toast";
import { MdOutlinePets } from "react-icons/md";
import { FaCat, FaBone } from "react-icons/fa";

export interface ProductsProps {
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
}

export function Home(){
    const { addItemCart } = useContext(CartContext);
    const [products, setProducts] = useState<ProductsProps[]>([]);

    useEffect(() => {
        async function getProducts() {
            const response = await api.get("/products");
            setProducts(response.data);
        }
        getProducts();
    }, []);

    function handleAddCardItem(product: ProductsProps) {
        toast.success("Produto adicionado no carrinho 🐾", {
            style: {
                backgroundColor: "#ffae00",
                borderRadius: "12px",
                color: "#ffffff",
                padding: "16px 24px",
                fontSize: "15px",
                fontWeight: "600",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }
        });
        addItemCart(product);
    }

    return(
        <main className={styles.container}>
            <div className={styles.headerTitleContainer}>
                <FaBone className={styles.titleDecoration} />
                <h1 className={styles.titulo}>
                    <FaCat className={styles.titleIcon} /> 
                    Produtos em Alta 
                    <MdOutlinePets className={styles.titleIcon} />
                </h1>
                <FaBone className={styles.titleDecoration} />
            </div>
            
            <div className={styles.grid}>
                {products.map((product) => (
                    <section key={product.id} className={styles.sessaoProdutos}>
                        {/* Tag decorativa no card */}
                        <div className={styles.badgePet}>
                            <MdOutlinePets size={14} /> Pet
                        </div>

                        <div className={styles.imgContainer}>
                            <img
                                className={styles.imagem}
                                src={product.cover}
                                alt={product.title} 
                            />
                            <button 
                                onClick={() => handleAddCardItem(product)}
                                className={styles.botao}
                                title="Adicionar ao carrinho"
                            >
                                <BsCartPlus size={22} color="#ffffff"/>
                            </button>
                        </div>

                        <div className={styles.infoContainer}>
                            <span className={styles.tituloProduto}>{product.title}</span>
                            <div className={styles.precoContainer}>
                                <strong className={styles.quantia}>
                                    {product.price.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    })}
                                </strong>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}