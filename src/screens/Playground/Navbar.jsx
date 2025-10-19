import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.jpg'
import { useNavigate } from 'react-router-dom'

// 🎨 Theme Colors:
// Background: #121212 (Deep Black)
// Accent/Primary Color: #FF7F00 (Bright Orange)

const NavbarContainer = styled.div`
  height: ${({isFullScreen}) => isFullScreen ? '0' : '4.5rem'};
  // ⬅️ THEME CHANGE 1: Deep Black background
  background: #121212; 
  display: flex;
  align-items: center;
  justify-content: center;
`

const NavbarContent = styled.button`
  background: transparent;
  border: 0;

  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`

const Logo = styled.img`
  width: 60px;
`

const MainHeading = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  // ⬅️ THEME CHANGE 2: Orange accent color
  color: #FF7F00; 

  span{
    font-weight: 700;
  }
`

const Navbar = ({ isFullScreen }) => {
  const navigate = useNavigate()
  return (
    <NavbarContainer isFullScreen={isFullScreen}>
      <NavbarContent onClick={() => {
        navigate('/')
      }}>
        <Logo src={logo} alt="DevStream Logo" />
        <MainHeading>
          {/* ⬅️ NAME CHANGE: Update to DevStream */}
          DevStream
        </MainHeading>
      </NavbarContent>
    </NavbarContainer>
  )
}

export default Navbar