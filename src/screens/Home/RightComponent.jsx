import React, { useContext } from 'react'
import styled from 'styled-components'
import { IoTrashOutline } from 'react-icons/io5'
import { BiEditAlt } from 'react-icons/bi'
import { FcOpenedFolder } from 'react-icons/fc'
import logo from '../../assets/logo.jpg'
import { ModalContext } from '../../context/ModalContext'
import { PlaygroundContext } from '../../context/PlaygroundContext'
import { useNavigate } from 'react-router-dom'

// 🎨 Theme Colors:
// Background: #1A1A1A
// Card Background: #252525
// Accent/Primary Color: #FF7F00 (Bright Orange)
// General Text: #E0E0E0 (Light Gray)

const StyledRightComponent = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    padding: 2rem;
    
    // ⬅️ FIX: Extends background to the bottom
    min-height: 100vh; 
    background-color: #1A1A1A; 

    @media (max-width: 768px){
        position: relative;
        width: 100%;
        padding: 1rem 0.5rem;
        min-height: 100%; 
    }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.75rem 0;
  // ⬅️ THEME: Orange border for separation
  border-bottom: 1px solid #FF7F00; 
  margin-bottom: 1rem;
`

const Heading = styled.h3`
  font-size: ${props => props.size === 'small' ? "1.25rem" : "1.75rem"};
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  // ⬅️ THEME: Heading text is Orange
  color: #FF7F00; 
  
  span{
    font-weight: 700;
  }
`

const AddButton = styled.div`
    padding: 0.25rem 0.75rem;
    font-size: 1rem;
    // ⬅️ THEME: Orange background, black text for contrast button
    background-color: #FF7F00;
    color: #121212; 
    border-radius: 30px;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    
    span{
        font-size: 1.5rem;
        font-weight: 700;
    }

    &:hover{
        cursor: pointer;
        box-shadow: 0px 0px 4px 1px #FF7F00; 
    }
`

const FolderCard = styled.div`
    margin-bottom: 1rem;
`

const FolderIcons = styled.div`
    display: flex;
    align-items: center;
    gap: 0.7rem;
    cursor: pointer;
    // ⬅️ THEME: Icons are orange
    color: #FF7F00; 
`

const PlayGroundCards = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 428px){
        grid-template-columns: 1fr;
    }     
`

const Card = styled.div`
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    // ⬅️ THEME: Darker card background and orange shadow
    background-color: #252525; 
    box-shadow: 0 0 4px 0px #FF7F00; 
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    
    // General text color on card
    color: #E0E0E0; 

    &:hover{
      scale: 1.05;
      box-shadow: 0 0 8px 0px #FF7F00;
    }
`

const CardContainer = styled.div`
  display: flex;
  align-items: center;
`

const CardContent = styled.div`
  p {
    margin: 0;
    &:first-child { 
        // ⬅️ THEME: Playground title is orange
        color: #FF7F00;
        font-weight: 600;
    }
  }
`

const Logo = styled.img`
    width: 70px;
    margin-right: 1rem;

    @media (max-width: 425px){
        width: 50px;
        margin-right: 0.5rem;
    }
`
const RightComponent = () => {
  const navigate = useNavigate();

  const { openModal } = useContext(ModalContext);
  const { folders, deleteFolder, deleteCard } = useContext(PlaygroundContext);

  return (
    <StyledRightComponent>
      <Header>
        <Heading size="large">
          My <span>DevStream</span>
        </Heading>
        <AddButton onClick={() => openModal({
          show: true,
          modalType: 1,
          identifiers: {
            folderId: "",
            cardId: "",
          }
        })}> <span>+</span> New Folder</AddButton>
      </Header>

      {
        Object.entries(folders).map(([folderId, folder]) => (
          <FolderCard key={folderId}>
            <Header>
              <Heading size="small">
                <FcOpenedFolder /> {folder.title}
              </Heading>
              <FolderIcons>
                <IoTrashOutline onClick={() => deleteFolder(folderId)} />
                <BiEditAlt onClick={() => openModal({
                  show: true,
                  modalType: 4,
                  identifiers: {
                    folderId: folderId,
                    cardId: "",
                  }
                })} />
                <AddButton onClick={() => openModal({
                  show: true,
                  modalType: 2,
                  identifiers: {
                    folderId: folderId,
                    cardId: "",
                  }
                })}><span>+</span> New Playground</AddButton>
              </FolderIcons>
            </Header>

            <PlayGroundCards>
              {
                Object.entries(folder['playgrounds']).map(([playgroundId, playground]) => (
                  <Card key={playgroundId} onClick={() => {
                    navigate(`/playground/${folderId}/${playgroundId}`)
                  }}>
                    <CardContainer>
                      <Logo src={logo} />
                      <CardContent>
                        <p>{playground.title}</p>
                        <p>Language: {playground.language}</p>
                      </CardContent>
                    </CardContainer>
                    <FolderIcons onClick={(e) => {
                      e.stopPropagation(); //stop click propagation from child to parent
                    }}>
                      <IoTrashOutline onClick={() => deleteCard(folderId, playgroundId)} />
                      <BiEditAlt onClick={() => openModal({
                        show: true,
                        modalType: 5,
                        identifiers: {
                          folderId: folderId,
                          cardId: playgroundId,
                        }
                      })} />
                    </FolderIcons>
                  </Card>
                ))
              }
            </PlayGroundCards>
          </FolderCard>
        ))
      }
    </StyledRightComponent>
  )
}

export default RightComponent;
