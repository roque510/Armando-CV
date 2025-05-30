import {
  Box,
  Button,
  Checkbox,
  ClientOnly,
  HStack,
  Heading,
  Progress,
  RadioGroup,
  Skeleton,
  VStack,
} from "@chakra-ui/react"
import Image from "next/image"
import { ColorModeToggle } from "@/components/color-mode-toggle"
import Home from "@/components/Home"


export default async function Page() {
  return (
    <>
    {/* <ColorModeButton /> */}
    <Home />
    </>
  )
}