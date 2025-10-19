import React from 'react'
import styled from 'styled-components'
import { BiImport } from 'react-icons/bi'

// 🎨 Theme Colors:
// Console Background: #1A1A1A
// Header Background: #252525
// TextArea Background: #121212
// Accent/Text: #FF7F00 (Orange)
// General Text: #E0E0E0 (Light Gray)

export const Console = styled.div`
  // ⬅️ THEME CHANGE 1: Dark gray console background
  background: #1A1A1A; 
  display: flex;
  flex-direction: column;
  // ⬅️ THEME: Default text color is light gray
  color: #E0E0E0; 
  border-bottom: 1px solid #FF7F00; /* Add separator line */
`

export const Header = styled.div`
  // ⬅️ THEME CHANGE 2: Darker header background
  background: #252525; 
  height: 4rem;
  // ⬅️ THEME: Orange shadow for accent
  box-shadow: 0 4px 4px rgba(255, 127, 0, 0.2); 
  padding: 0 1rem;
  z-index: 2;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // ⬅️ THEME: Header text color is Orange
  color: #FF7F00; 
  input{
    display: none;
  }
  label, a{
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    // ⬅️ THEME: Import label text and icon are Orange
    color: #FF7F00; 
  }
`

export const TextArea = styled.textarea`
  flex-grow: 1;
  resize: none;
  // ⬅️ THEME CHANGE 3: Deep black background for text area
  background: #121212; 
  border: 0;
  outline: 0;
  padding: 0.25rem;
  padding-top: 0.5rem;
  font-size: 1.1rem;
  min-height: 250px;
  // ⬅️ THEME: Text color is light gray
  color: #E0E0E0; 
`

const InputConsole = ({ currentInput, setCurrentInput, getFile }) => {
  return (
    <Console>
      <Header>
        Input: 
        <label htmlFor="inputfile">
          <input type="file" accept="." id="inputfile" onChange={(e) => getFile(e, setCurrentInput)} /> <BiImport /> Import Input
        </label>
      </Header>
      <TextArea
        onChange={(e) => setCurrentInput(e.target.value)}
        value={currentInput}
      />
    </Console>
  )
}

export default InputConsole