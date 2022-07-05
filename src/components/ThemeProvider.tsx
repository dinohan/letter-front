/* External dependencies */
import { BezierProvider, ChildrenProps, DarkFoundation, GlobalStyle, LightFoundation } from '@channel.io/bezier-react'
import React, { useEffect, useState } from 'react'

export function getQuery(colorScheme: 'light' | 'dark') {
  return window.matchMedia(`(prefers-color-scheme: ${colorScheme})`)
}

interface ThemeProviderProps extends ChildrenProps {}

function ThemeProvider({
  children
}: ThemeProviderProps) {

  const [darkMode, setDarkMode] = useState(getQuery('dark').matches)

  const foundation = darkMode ? DarkFoundation : LightFoundation

  useEffect(function addChangeFoundationEventListener() {
    const darkQuery = getQuery('dark')

    function changeFoundationFromMatches({ matches }: MediaQueryListEvent) {
      setDarkMode(matches)
    }

    darkQuery.addEventListener('change', changeFoundationFromMatches)

    return function cleanUp() {
      darkQuery.removeEventListener('change', changeFoundationFromMatches)
    }
  }, [])

  return (
    <BezierProvider foundation={foundation}>
      <GlobalStyle foundation={foundation} />
      { children }
    </BezierProvider>
  )
}

export default ThemeProvider
