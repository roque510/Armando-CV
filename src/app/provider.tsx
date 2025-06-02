"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider } from "@/components/ui/color-mode"
import { ThemeProviderProps } from "next-themes"
import { JSX } from "react"

export default function Provider(props: JSX.IntrinsicAttributes & ThemeProviderProps) {
  return (
    <ColorModeProvider defaultTheme="dark" {...props}>
      <ChakraProvider value={defaultSystem}>
        {props.children}
      </ChakraProvider>
    </ColorModeProvider>
  )
}