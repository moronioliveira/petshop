import { createContext, useState } from "react";  
import type { ReactNode } from "react";
import type { ProductsProps } from "../pages/home";


interface CartContextData{
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductsProps) =>  void;
    removeItemCart: (products: CartProps) => void;
    total: string;

}

interface CartProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
    total: number;
}

interface CartProviderProps{
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({children}: CartProviderProps){
    const [cart, setCart] = useState<CartProps[]>([])
    const [total, setTotal] = useState("")

    function addItemCart(newItem: ProductsProps){
        const indexItem = cart.findIndex(item => item.id === newItem.id)

        if (indexItem !== -1) {
            const cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount +1
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price

            setCart(cartList)
            totalResultcart(cartList)
            return;
        }

        const data = {
             ...newItem,
             amount: 1,
             total: newItem.price
        }

        setCart(products => [...products, data])
        totalResultcart([...cart, data])
    }

    function removeItemCart(products: CartProps){
        const indexItem = cart.findIndex(item =>  item.id === products.id)

        if(cart[indexItem]?.amount > 1){
            const cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount -1;
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;

            setCart(cartList);
            totalResultcart(cartList)
            return;
        }

        const removeItem = cart.filter(item =>  item.id !== products.id)
        setCart(removeItem);
        totalResultcart(removeItem)
    }

    
    function totalResultcart(items: CartProps[]){
        const myCart = items;
        const result = myCart.reduce((acc, obj)=> {return acc + obj.total}, 0)
        const resultFormated = result.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
        setTotal(resultFormated);
    }

    return(
        <CartContext.Provider 
        value={{
            cart,
            cartAmount: cart.length,
            addItemCart,
            removeItemCart,
            total
            }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;