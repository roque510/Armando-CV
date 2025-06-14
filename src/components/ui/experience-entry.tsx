'use client'

import { Box, HStack, Stack, Text, IconButton } from "@chakra-ui/react"
import { useRef } from "react"
import { useColorModeValue } from "../ui/color-mode"

interface ExperienceEntryProps {
  timeframe: string
  title: string
  description: string
  techStack: string[]
}

export const ExperienceEntry = ({ timeframe, title, description, techStack }: ExperienceEntryProps) => {
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

  return (
    <Box>
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
            {techStack.map((tech, index) => (
              <Box 
                key={index}
                px={2}
                py={0.5}
                borderRadius="full"
                bg="teal.500"
                color="white"
                fontSize="xs"
                whiteSpace="nowrap"
                flexShrink={0}
                minWidth="fit-content"
              >
                {tech}
              </Box>
            ))}
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