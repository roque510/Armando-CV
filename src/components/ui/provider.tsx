"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider } from "./color-mode"
import { ThemeProviderProps } from "next-themes"
import { JSX } from "react"

export function Provider(props: JSX.IntrinsicAttributes & ThemeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider defaultTheme="dark" {...props} />
    </ChakraProvider>
  )
}
