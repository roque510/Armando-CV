import { Box, Stack, Text, Image, HStack, Link, Badge } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

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
  return (
    <Box bg={cardBg} borderRadius={8} boxShadow="md" overflow="hidden" p={4}>
      <Image src={image} alt={title} borderRadius={6} mb={3} w="100%" h="180px" objectFit="cover" />
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