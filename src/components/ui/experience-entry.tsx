'use client'

import { Box, HStack, Stack, Text, IconButton } from "@chakra-ui/react"
import { useRef } from "react"
import { useColorModeValue } from "../ui/color-mode"

interface ExperienceEntryProps {
  timeframe: string
  title: string
  description: string
  techStack: string[]
  highlightedTech?: string
  isHighlighted?: boolean
}

export const ExperienceEntry = ({ timeframe, title, description, techStack, highlightedTech, isHighlighted }: ExperienceEntryProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const textColor = useColorModeValue('gray.800', 'white')
  const secondaryTextColor = useColorModeValue('gray.500', 'gray.300')
  const highlightedBg = useColorModeValue("teal.50", "teal.900")
  const highlightedBorder = useColorModeValue("teal.200", "teal.600")

  return (
    <Box 
      p={isHighlighted ? 4 : 0}
      borderRadius={isHighlighted ? "lg" : "none"}
      bg={isHighlighted ? highlightedBg : "transparent"}
      border={isHighlighted ? "2px solid" : "none"}
      borderColor={isHighlighted ? highlightedBorder : "transparent"}
      transition="all 0.3s ease-in-out"
      animation={isHighlighted ? "pulse 2s ease-in-out" : "none"}
      css={{
        "@keyframes pulse": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)" }
        }
      }}
    >
      <Stack direction={{ base: "column", md: "row" }} gap={2}>
        <Text width={{ base: "100%", md: "100px" }} whiteSpace="nowrap" color={secondaryTextColor} fontSize="sm">{timeframe}</Text>
        <Stack gap={1} flex={1}>
          <Text fontWeight={'700'} fontStretch={'wider'} fontSize="md" color={textColor}>
            {title}
          </Text>
          <Text fontWeight={'200'} fontSize={'sm'} lineHeight={'1.4'} color={textColor}>
            {description}
          </Text>
        </Stack>                            
      </Stack>
      <HStack mt={2}>
        <IconButton
          aria-label="Scroll left"
          size="xs"
          variant="ghost"
          onClick={() => scroll('left')}
        >
          ←
        </IconButton>
        <Box 
          ref={scrollRef}
          width={{ base: '100%', md: '420px' }}
          maxW="100%"
          overflowX="auto"
          css={{
            scrollSnapType: 'x mandatory',
            scrollPadding: '0 1rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          <HStack 
            gap={1} 
            py={1} 
            css={{
              '& > *': {
                scrollSnapAlign: 'start',
              }
            }}
          >
            {techStack.map((tech, index) => {
              const isHighlightedTech = highlightedTech && tech.toLowerCase().includes(highlightedTech.toLowerCase())
              return (
                <Box 
                  key={index}
                  px={2}
                  py={0.5}
                  borderRadius="full"
                  bg={isHighlightedTech ? "orange.400" : "teal.500"}
                  color="white"
                  fontSize="xs"
                  whiteSpace="nowrap"
                  flexShrink={0}
                  minWidth="fit-content"
                  fontWeight={isHighlightedTech ? "bold" : "normal"}
                  transform={isHighlightedTech ? "scale(1.1)" : "scale(1)"}
                  transition="all 0.2s"
                  border={isHighlightedTech ? "2px solid" : "none"}
                  borderColor={isHighlightedTech ? "orange.200" : "transparent"}
                >
                  {tech}
                </Box>
              )
            })}
          </HStack>
        </Box>
        <IconButton
          aria-label="Scroll right"
          size="xs"
          variant="ghost"
          onClick={() => scroll('right')}
        >
          →
        </IconButton>
      </HStack>
    </Box>
  )
} 