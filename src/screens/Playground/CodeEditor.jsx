import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CodeMirror from '@uiw/react-codemirror'

// theme
import { githubDark, githubLight } from '@uiw/codemirror-theme-github'
import { bespin } from '@uiw/codemirror-theme-bespin'
import { duotoneDark, duotoneLight } from '@uiw/codemirror-theme-duotone'
import { dracula } from '@uiw/codemirror-theme-dracula' // ⬅️ Good dark/vibrant base
import { xcodeDark, xcodeLight } from '@uiw/codemirror-theme-xcode'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { okaidia } from '@uiw/codemirror-theme-okaidia'

// language
import { cpp } from '@codemirror/lang-cpp'
import { java } from '@codemirror/lang-java'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'

//configuration
import { indentUnit } from '@codemirror/language'
import { EditorState } from '@codemirror/state'

const CodeEditor = ({
    currentLanguage,
    currentTheme,
    currentCode,
    setCurrentCode
}) => {

    // ⬅️ CHANGE 1: Set the default theme to dracula (a good dark/vibrant base)
    // and initialize with a suitable dark theme.
    const [theme, setTheme] = useState(dracula); 
    const [language, setLanguage] = useState(javascript);

    useEffect(() => {
        if (currentLanguage === 'cpp') setLanguage(cpp);
        if (currentLanguage === 'java') setLanguage(java);
        if (currentLanguage === 'javascript') setLanguage(javascript);
        if (currentLanguage === 'python') setLanguage(python);
    }, [currentLanguage])


    useEffect(() => {
        // ⬅️ CHANGE 2: Replace 'githubDark' with your new theme name: 'devStreamDark'
        if (currentTheme === 'devStreamDark') setTheme(dracula); // Use dracula as the visual replacement
        if (currentTheme === 'githubLight') setTheme(githubLight);
        if (currentTheme === 'bespin') setTheme(bespin);
        if (currentTheme === 'duotoneDark') setTheme(duotoneDark);
        if (currentTheme === 'duotoneLight') setTheme(duotoneLight);
        if (currentTheme === 'dracula') setTheme(dracula);
        if (currentTheme === 'xcodeDark') setTheme(xcodeDark);
        if (currentTheme === 'xcodeLight') setTheme(xcodeLight);
        if (currentTheme === 'vscodeDark') setTheme(vscodeDark);
        if (currentTheme === 'okaidia') setTheme(okaidia);
        // Fallback for any old theme name that might not be in the list
        if (!currentTheme) setTheme(dracula); 
    }, [currentTheme])

    return (
        <CodeMirror
            value={currentCode}
            height="100%"
            theme={theme} // Uses the theme set above
            extensions={[
                language,
                indentUnit.of("        "),
                EditorState.tabSize.of(8),
                EditorState.changeFilter.of(() => true)
            ]}
            onChange={(value) => setCurrentCode(value)}
            basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightSpecialChars: true,
                history: true,
                foldGutter: true,
                drawSelection: true,
                dropCursor: true,
                allowMultipleSelections: true,
                indentOnInput: true,
                syntaxHighlighting: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: true,
                rectangularSelection: true,
                crosshairCursor: true,
                highlightActiveLine: true,
                highlightSelectionMatches: true,
                closeBracketsKeymap: true,
                defaultKeymap: true,
                searchKeymap: true,
                historyKeymap: true,
                foldKeymap: true,
                completionKeymap: true,
                lintKeymap: true,
            }}
        />
    )
}

export default CodeEditor

