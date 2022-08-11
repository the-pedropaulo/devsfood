import React, {useState} from 'react';
import { Container, Logo, SearchInput } from './styled';

export default ({search, handleSearch }) => {

    const [inputActive, setInputActive] = useState();

    function handleInputFocus() {
        setInputActive(true);
    }

    function handleInputBlur() {
        if(search === "") {
            setInputActive(false);
        }
    }

    return ( 
        <Container>
            <Logo src="/assets/logo.png"/>
            <SearchInput 
                type="text" 
                placeholder="Digite aqui..."
                active={inputActive}
                value={search}
                onChange={(e)=> {handleSearch(e.target.value)}}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                />
        </Container>
    )
} 