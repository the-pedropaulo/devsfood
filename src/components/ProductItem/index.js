import React from 'react';
import { 
    Container, 
    ProductPhotoArea, 
    ProductPhoto, 
    ProductInfoArea,
    ProductName,
    ProductPrice,
    ProductIngredients,
    ProductButtonArea,
    ProductButton
} from './styled';

export default ({data, handleOpenModal}) => {

    function handleClickOpenModal() {
        handleOpenModal(data);
    }

    return (
        <Container onClick={handleClickOpenModal}>
            <ProductPhotoArea>
                <ProductPhoto src={data.image}/>
            </ProductPhotoArea>
            <ProductInfoArea>
                <ProductName>{data.name}</ProductName>
                <ProductPrice>{data.price}</ProductPrice>
                <ProductIngredients>{data.ingredients}</ProductIngredients>
            </ProductInfoArea>
            <ProductButtonArea>
                <ProductButton src="/assets/next.png"/>
            </ProductButtonArea>
        </Container>
    )
}