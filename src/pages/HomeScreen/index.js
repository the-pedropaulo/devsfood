import React, { useEffect, useState } from 'react';
import { 
    Container, 
    CategoryArea, 
    CategoryList, 
    ProductArea, 
    ProductList,
    ProductPaginationArea,
    ProductPaginationItem
} from './styled';
import Header from '../../components/Header'
import api from '../../services/api'

import CategoryItem from '../../components/CategoryItem';
import ProductItem from '../../components/ProductItem';
import Modal from '../../components/Modal'
import ReactTooltip from 'react-tooltip';
import ModalProduct from '../../components/ModalProduct';

let searchTimer = null;

export default () => {

    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryActive, setCategoryActive] = useState(0)
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [activePage, setActivePage] = useState(1);
    const [activeSearch, setActiveSearch] = useState('');
    const [modalStatus, setModalStatus] = useState(false);
    const [modalData, setModalData] = useState({});

    function handleSearch(text) {
        setSearch(text);
    }

    async function getProducts(){
        const products_response = await api.getProducts(categoryActive, activePage, search);
        if(products_response.error === '') {
            setProducts(products_response.result.data);
            setTotalPages(products_response.result.pages);
            setActivePage(products_response.result.page);
        }
    }

    useEffect(() => {
        (async () => {
            const categories_response = await api.getCategories();
            if(categories_response.error === "") {
                setCategories(categories_response.result);
            }
            ReactTooltip.rebuild();
        })();

    }, []);

    useEffect(() => {
        setProducts([]);
        getProducts();
    }, [categoryActive, activePage, activeSearch])

    useEffect(() => {
        clearTimeout(searchTimer)
        searchTimer = setTimeout(() => {
            setActiveSearch(search);
            console.log(search);
        }, 2000)
    }, [search])

    function handleOpenModal(data) {
        setModalData(data);
        setModalStatus(true);
        console.log(data)
    }

    return (
        <Container>
            <Header search={search} handleSearch={handleSearch}/>

            {categories.length > 0 && (
                <CategoryArea>
                    Selecione uma categoria ({categoryActive})
                    <CategoryList>
                        <CategoryItem 
                            data={{
                                id: 0, 
                                name: 'Todas as categorias', 
                                image: '/assets/food-and-restaurant.png'
                            }}
                            categoryActive={categoryActive}
                            setCategoryActive={setCategoryActive}
                        />
                        {categories.map((categorie, index) => (
                            <CategoryItem 
                                key={index} 
                                data={categorie}
                                categoryActive={categoryActive}
                                setCategoryActive={setCategoryActive}
                            />
                        ))}
                    </CategoryList>
                </CategoryArea>
            )} 

            {products.length > 0 && (
              <ProductArea>
                  <ProductList>
                      {products.map((product, index) => (
                          <ProductItem 
                            data={product} 
                            key={index}
                            handleOpenModal={handleOpenModal}
                          />
                      ))}
                  </ProductList>
              </ProductArea>  
            )}

            {totalPages > 0 && (
            <ProductPaginationArea>
                {Array(totalPages).fill(0).map((item, index) => (
                <ProductPaginationItem 
                    key={index} 
                    active={activePage} 
                    current={index+1}
                    onClick={() => {setActivePage(index+1)}}
                >
                    {index +1}
                </ProductPaginationItem>
                ))
                }
            </ProductPaginationArea>
            )}
            <Modal status={modalStatus} close={setModalStatus}>
                <ModalProduct data={modalData}/>
            </Modal>
        </Container>
    );
}