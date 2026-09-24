import { useContext } from "react";
import styles from "./cart.module.css";
import { CartContext } from "../../context/cartContext";
import { Link } from "react-router";
import { FiShoppingBag, FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { MdOutlinePets } from "react-icons/md";
import { FaBone } from "react-icons/fa";
import toast from "react-hot-toast";

export function Cart() {
    const { cart, total, addItemCart, removeItemCart } = useContext(CartContext);

    function alerta(){
        toast.success("Produto comprado com sucesso", {
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
    }

    return (
        <main className={styles.container}>
            <div className={styles.headerTitleContainer}>
                <FaBone className={styles.titleDecoration} />
                <h1 className={styles.titulo}>
                    Meu Carrinho
                </h1>
                <FaBone className={styles.titleDecoration} />
            </div>

            {cart.length === 0 ? (
                <div className={styles.carrinhoVazio}>
                    <MdOutlinePets size={50} color="#ffae00" />
                    <h2>Seu carrinho está vazio!</h2>
                    <p>Que tal escolher alguns mimos para o seu pet?</p>
                    <Link to="/" className={styles.btnVoltar}>
                        Ver produtos em alta
                    </Link>
                </div>
            ) : (
                <>
                    <div className={styles.listaProdutos}>
                        {cart.map((item) => (
                            <section key={item.id} className={styles.sessaoProdutos}>
                                <div className={styles.infoPrincipal}>
                                    <img
                                        className={styles.imagem}
                                        src={item.cover}
                                        alt={item.title}
                                    />
                                    <div className={styles.detalhesItem}>
                                        <h3 className={styles.tituloItem}>{item.title}</h3>
                                        <span className={styles.precoUnitario}>
                                            Preço: {item.price.toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL"
                                            })}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.controlesQuantidade}>
                                    <button
                                        onClick={() => removeItemCart(item)}
                                        className={styles.btnAcao}
                                        title={item.amount === 1 ? "Remover item" : "Diminuir quantidade"}
                                    >
                                        {item.amount === 1 ? <FiTrash2 size={16} /> : <FiMinus size={16} />}
                                    </button>
                                    
                                    <span className={styles.quantidade}>{item.amount}</span>

                                    <button
                                        onClick={() => addItemCart(item)}
                                        className={styles.btnAcao}
                                        title="Aumentar quantidade"
                                    >
                                        <FiPlus size={16} />
                                    </button>
                                </div>

                                <div className={styles.subtotalContainer}>
                                    <span className={styles.labelSubtotal}>Subtotal</span>
                                    <strong className={styles.valorSubtotal}>
                                        {item.total.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL"
                                        })}
                                    </strong>
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className={styles.resumoCarrinho}>
                        <div className={styles.totalBox}>
                            <span className={styles.labelTotal}>Total da Compra:</span>
                            <strong className={styles.valorTotal}>{total}</strong>
                        </div>

                        <button 
                        onClick={()=> alerta()}
                        className={styles.btnFinalizar}>
                            <FiShoppingBag size={20} /> Finalizar Compra
                        </button>
                    </div>
                </>
            )}
        </main>
    );
}