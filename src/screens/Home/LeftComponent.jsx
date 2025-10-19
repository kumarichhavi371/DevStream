import React, { useContext } from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.jpg' 
import { ModalContext } from '../../context/ModalContext'
import { useNavigate } from 'react-router-dom'; // Hook for navigation

// 🎨 Theme Colors:
// Background: #121212 (Deep Black)
// Accent/Primary Color: #FF7F00 (Bright Orange)

const StyledLeftComponent = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 40%;
    height: 100vh;
    background-color: #121212; 

    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;

    @media (max-width: 768px){
        position: relative;
        width: 100%;
    }
`
const ContentContainer = styled.div`
    text-align: center;
`

const Logo = styled.img`
    width: 165px;
    margin-bottom: 1rem;
`

const MainHeading = styled.h1`
    font-size: 2.5rem;
    font-weight: 400;
    color: #FF7F00; 
    margin-bottom: 0.75rem;

    span{
        font-weight: 700;
    }
`
const SubHeading = styled.div`
    font-size: 1.5rem;
    color: #E0E0E0; 
    opacity: 0.9;
    margin-bottom: 1.5rem;
`

const AddNewButton = styled.button`
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 30px;
    background-color: #FF7F00;
    color: #121212; 
    box-shadow: 0px 0px 4px 2px #FF7F00; 
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    transition: all 0.2s ease-in-out;
    margin-top: 2rem; 
    
    span{
        font-size: 2rem;
        font-weight: 700;
    }

    &:hover{
        cursor: pointer;
        scale: 1.05;
        box-shadow: 0px 0px 8px 3px #FF7F00; 
    }
`

const FooterButton = styled.button`
    position: absolute;
    bottom: 20px;
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    background: none;
    border: 1px solid #FF7F00; 
    color: #FF7F00; 
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #FF7F00;
        color: #121212;
    }
`

const LeftComponent = () => {
    const { openModal } = useContext(ModalContext);
    const navigate = useNavigate();

    // Function to navigate to the new /about route
    const handleAboutClick = () => {
        navigate('/about');
    }
    
    return (
        <StyledLeftComponent>
            <ContentContainer>
                {/* ⬅️ REVERTED TO USING IMPORTED MODULE 'logo' */}
                <Logo src={logo} alt="DevStream Logo" /> 
                
                <MainHeading>DevStream</MainHeading>
                
                <SubHeading>Code. Stream. Create.</SubHeading>
                
                <AddNewButton onClick={() => openModal({
                    show: true,
                    modalType: 3,
                    identifiers: {
                        folderId: "",
                        cardId: "",
                    }
                })} ><span>+</span> Create New Playground</AddNewButton>
            </ContentContainer>
            
            <FooterButton onClick={handleAboutClick}>
                About DevStream
            </FooterButton>
        </StyledLeftComponent>
    )
}

export default LeftComponent