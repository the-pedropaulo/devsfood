import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    CartArea, 
    CartBody,
    CartHeader,
    CartIcon,
    CartText,
    ProductsArea,
    ProductItem,
    ProductPhoto,
    ProductInfoArea,
    ProductName,
    ProductPrice,
    ProductQuantityArea,
    ProductQtIcon,
    ProductQtText
} from './styled';

export default () => {
    const dispatch = useDispatch();
    const [showCart, setShowCart] = useState(false);

    const products = useSelector(state => state.cart.products);

    function handleShowCart() {
        setShowCart(!showCart);
    }

    function handleProductChange(index, type) {
        dispatch({
            type: 'CHANGE_PRODUCT',
            payload: {
                key: index,
                type
            }
        })
    }

    return (
        <CartArea>
            <CartHeader onClick={handleShowCart}>
                <CartIcon src={"/assets/cart.png"}></CartIcon>
                <CartText>Meu carrinho ({products.length})</CartText>
                {showCart && (
                    <CartIcon src="/assets/down.png"/>
                )}
            </CartHeader>
            <CartBody show={showCart}>
                <ProductsArea>
                    {products.map((product,index) => (
                    <ProductItem>
                        <ProductPhoto src={product.image}/>
                        <ProductInfoArea>
                            <ProductName>{product.name}</ProductName>
                            <ProductPrice>R$ {product.price}</ProductPrice>
                        </ProductInfoArea>
                        <ProductQuantityArea>
                            <ProductQtIcon 
                                src="/assets/minus.png"
                                onClick={() => handleProductChange(index, '-')}
                            />
                            <ProductQtText>{product.qt}</ProductQtText>
                            <ProductQtIcon 
                                src="/assets/plus.png"
                                onClick={() => handleProductChange(index, '+')}
                            />
                        </ProductQuantityArea>
                    </ProductItem>
                    ))}
                </ProductsArea>
            </CartBody>
        </CartArea>
    )
}