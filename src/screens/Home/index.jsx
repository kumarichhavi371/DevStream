import React, {useContext} from 'react'
import styled from 'styled-components'
import LeftComponent from './LeftComponent'
import RightComponent from './RightComponent'
import Modal from '../../components/Modal'
import { ModalContext } from '../../context/ModalContext'

// 🎨 Theme Colors:
// Background: #121212 (Deep Black)
// Accent/Primary Color: #FF7F00 (Bright Orange)

const StyledHome = styled.div`
  width: 100%;
  min-height: 100vh;
  
  // ⬅️ THEME CHANGE HERE 
  background-color: #121212; 
  // Setting the main text color to the bright orange as requested:
  color: #FF7F00; 
`

const Home = () => {
  const {isOpenModal} = useContext(ModalContext);
  
  return (
    <StyledHome>
      <LeftComponent />
      <RightComponent />
      { isOpenModal.show && <Modal />}
    </StyledHome>
  )
}

export default Home