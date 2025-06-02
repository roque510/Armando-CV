import { Box, Stack, Text, Image, HStack, Link, Badge } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { useState } from "react";

interface ProjectEntryProps {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  link: string;
}

export const ProjectEntry = ({ title, description, image, techStack, link }: ProjectEntryProps) => {
  const textColor = useColorModeValue("gray.800", "white");
  const cardBg = useColorModeValue("white", "gray.800");
  const overlayColor = useColorModeValue("rgba(56, 178, 172, 0.7)", "rgba(45, 212, 191, 0.6)"); // more opaque teal
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Box bg={cardBg} borderRadius={8} boxShadow="md" overflow="hidden" p={4}>
      <Box
        position="relative"
        borderRadius={6}
        overflow="hidden"
        mb={3}
        cursor="pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image src={image} alt={title} borderRadius={6} w="100%" h="180px" objectFit="cover" display="block" />
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg={overlayColor}
          opacity={isHovered ? 0 : 1}
          transition="opacity 0.4s cubic-bezier(0.4,0,0.2,1)"
          pointerEvents="none"
        />
      </Box>
      <Stack gap={2}>
        <Text fontWeight="bold" fontSize="lg" color={textColor}>{title}</Text>
        <Text color={textColor} fontSize="sm">{description}</Text>
        <HStack gap={2} flexWrap="wrap">
          {techStack.map((tech, idx) => (
            <Badge key={idx} colorScheme="teal">{tech}</Badge>
          ))}
        </HStack>
        <Link href={link} color="teal.400" target="_blank" rel="noopener noreferrer" fontWeight="bold" fontSize="sm">View Project</Link>
      </Stack>
    </Box>
  );
}; 