import React, { useContext, useState } from 'react'
import CodeEditor from './CodeEditor'
import styled from 'styled-components'
import { BiEditAlt, BiImport, BiExport, BiFullscreen } from 'react-icons/bi'
// ⬅️ NEW IMPORT: Import the Share icon
import { IoShareSocialOutline } from 'react-icons/io5' 
import { ModalContext } from '../../context/ModalContext'
import Select from 'react-select';
import { languageMap } from '../../context/PlaygroundContext'

// 🎨 Theme Colors:
// Background: #121212 (Deep Black)
// Accent/Primary Color: #FF7F00 (Bright Orange)
// Secondary/Button Background: #252525 (Dark Gray for toolbars)
// Text/Icons: #E0E0E0 (Light Gray)

const StyledEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  // ⬅️ THEME: Main background is deep black
  background-color: #121212; 
  min-height: ${({ isFullScreen }) => isFullScreen ? '100vh' : 'calc(100vh - 4.5rem)'};
`

const UpperToolBar = styled.div`
  // ⬅️ THEME: Dark gray background for toolbars, orange border
  background: #252525;
  border-bottom: 1px solid #FF7F00;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0.8rem 0.4rem;

  @media (max-width: 540px){
    height: 8rem;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 540px){
    width: 100%;
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: 2.3rem;
  font-size: 1.3rem;
  // ⬅️ THEME: Title color is light gray, Edit icon is orange
  color: #E0E0E0;

  & > svg {
      color: #FF7F00;
      cursor: pointer;
  }

  @media (min-width: 540px){
    margin-right: 1rem;
  }
`

const SelectBars = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  // 💡 Note: Select styling requires deep overrides (styles prop on Select component).
  // For now, we'll keep the default Select styling, focusing on the component's surrounding theme.

  & > div{
    width: 8rem;
  }

  & > div:last-child{
    width: 10rem;
  }
`

const Button = styled.button`
  padding: 0.7rem 0.4rem;
  width: 6.2rem;
  // ⬅️ THEME: Save button is Orange, text is black
  background: #FF7F00;
  color: #121212; 
  border: none;
  border-radius: 32px;
  font-weight: 700;
  cursor: pointer;
`

const CodeEditorContainer = styled.div`
    height: calc(100% - 4rem);

    & > div{
        height: 100%;
    }
`

const LowerToolBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  // ⬅️ THEME: Dark gray background for lower toolbar
  background: #252525;

  input{
    display: none;
  }

  label, a, button{
    font-size: 1.2rem;
    border: none;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    // ⬅️ THEME: Lower toolbar text and icons are Orange
    color: #FF7F00;
    background: none; /* Ensure buttons/links have no background */
    cursor: pointer;
  }

  button:first-child{
    background: none;
  }
  
  button:last-child{
    font-weight: 400;
    font-size: 1.1rem;
  }
`
const SaveAndRunButton = styled.button`
  padding: 0.6rem 1rem;
  // ⬅️ THEME: Run button is Orange, text is black
  background: #FF7F00;
  color: #121212;
  border: none;
  border-radius: 32px;
  font-weight: 700;
  cursor: pointer;
`

// ⬅️ NEW STYLED COMPONENT for the Share button to allow custom styling if needed
const ShareButton = styled.button`
    // Inherits styles from LowerToolBar children
`

const EditorContainer = ({
  title,
  currentLanguage,
  setCurrentLanguage,
  currentCode,
  setCurrentCode,
  folderId,
  playgroundId,
  saveCode,
  runCode,
  getFile,
  isFullScreen,
  setIsFullScreen
}) => {

  const { openModal } = useContext(ModalContext)
  
  // ⬅️ THEME CHANGE 1: Update the theme options, renaming the default dark option
  const themeOptions = [
    { value: 'devStreamDark', label: 'DevStream Dark' }, // ⬅️ NEW THEME NAME
    { value: 'githubLight', label: 'githubLight' },
    { value: 'bespin', label: 'bespin' },
    { value: 'duotoneDark', label: 'duotoneDark' },
    { value: 'duotoneLight', label: 'duotoneLight' },
    { value: 'dracula', label: 'dracula' },
    { value: 'xcodeDark', label: 'xcodeDark' },
    { value: 'xcodeLight', label: 'xcodeLight' },
    { value: 'vscodeDark', label: 'vscodeDark' },
    { value: 'vscodeLight', label: 'vscodeLight' },
    { value: 'okaidia', label: 'okaidia' },
  ]

  const languageOptions = [
    { value: 'cpp', label: 'cpp' },
    { value: 'javascript', label: 'javascript' },
    { value: 'java', label: 'java' },
    { value: 'python', label: 'python' },
  ]

  const handleThemeChange = (selectedOption) => {
    setCurrentTheme(selectedOption)
  }

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption)
    setCurrentLanguage(selectedOption.value)
    setCurrentCode(languageMap[selectedOption.value].defaultCode)
  }
  
  // ⬅️ NEW FUNCTIONALITY: Code Sharing Logic
  const shareCode = () => {
      // 1. Construct the shareable URL
      // Assuming your playground URL structure is: /playground/:folderId/:cardId
      const shareUrl = `${window.location.origin}/playground/${folderId}/${playgroundId}`;

      // 2. Copy the URL to the clipboard
      navigator.clipboard.writeText(shareUrl).then(() => {
          // You might want to show a toast/notification here
          alert("Share link copied to clipboard!"); 
      }).catch(err => {
          console.error('Could not copy text: ', err);
          alert("Failed to copy link. Please copy the URL from your browser's address bar.");
      });
  }

  // ⬅️ THEME CHANGE 2: Set the default theme to the new name
  const [currentTheme, setCurrentTheme] = useState({ value: 'devStreamDark', label: 'DevStream Dark' })
  
  const [language, setLanguage] = useState(() => {
    for (let i = 0; i < languageOptions.length; i++) {
      if (languageOptions[i].value === currentLanguage) {
        return languageOptions[i]
      }
    }
    return languageOptions[0];
  })

  return (
    <StyledEditorContainer isFullScreen={isFullScreen}>
      {!isFullScreen && <UpperToolBar>
        <Header>
          <Title>
            <h3>{title}</h3>
            <BiEditAlt onClick={() => openModal({
              show: true,
              modalType: 5,
              identifiers: {
                folderId: folderId,
                cardId: playgroundId,
              }
            })} />
          </Title>
          <Button onClick={saveCode}>Save code</Button>
        </Header>
        <SelectBars>
          <Select
            options={languageOptions}
            value={language}
            onChange={handleLanguageChange}
            // 💡 You can add styles prop here to customize the Select components color
          />
          <Select
            options={themeOptions}
            value={currentTheme}
            onChange={handleThemeChange}
            // 💡 You can add styles prop here to customize the Select components color
          />
        </SelectBars>
      </UpperToolBar>
      }
      <CodeEditorContainer>
        <CodeEditor
          currentLanguage={currentLanguage}
          currentTheme={currentTheme.value}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
        />
      </CodeEditorContainer>
      <LowerToolBar>
        <div>
          <button onClick={() => setIsFullScreen((isFullScreen) => !isFullScreen)}>
            <BiFullscreen /> {isFullScreen ? 'Minimize Screen' : 'Full Screen'}
          </button>
          {/* ⬅️ NEW FEATURE: Share Button */}
          <ShareButton onClick={shareCode}>
            <IoShareSocialOutline /> Share Code
          </ShareButton>
        </div>

        <div>
          <label htmlFor="codefile">
            <input type="file" accept="." id="codefile" onChange={(e) => getFile(e, setCurrentCode)} /> <BiImport /> Import Code
          </label>

          <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(currentCode)}`} download="code.txt">
            <BiExport /> Export Code
          </a>
          <SaveAndRunButton onClick={runCode}>Run Code</SaveAndRunButton>
        </div>
      </LowerToolBar>
    </StyledEditorContainer >
  )
}

export default EditorContainer