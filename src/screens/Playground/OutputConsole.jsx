import React from 'react'
import { Console, Header, TextArea } from './InputConsole'
import { BiExport } from 'react-icons/bi'
// Note: Console, Header, and TextArea inherit the following styles:
// Console Background: #1A1A1A (Dark Gray)
// Header Background: #252525 (Darker Gray)
// Header Text/Icon Color: #FF7F00 (Orange)
// TextArea Background: #121212 (Deep Black)
// TextArea Text Color: #E0E0E0 (Light Gray)

const OutputConsole = ({ currentOutput }) => {
  return (
    <Console>
      <Header>
        Output:

        <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(currentOutput)}`} download="output.txt">
          <BiExport /> Export Output
        </a>

      </Header>
      <TextArea
        value={currentOutput}
        disabled
      />
    </Console>
  )
}

export default OutputConsole // Corrected export to match filename