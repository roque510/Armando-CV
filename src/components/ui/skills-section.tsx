"use client";

import {
  Box,
  Input,
  Stack,
  Text,
  Badge,
  HStack,
  Heading,
  Wrap,
  WrapItem,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { useColorModeValue } from "../ui/color-mode";
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";
import skillsData from "../../data/skills.json";

interface Skill {
  name: string;
  category: string;
  experience: string;
}

interface SkillsData {
  [key: string]: Skill[];
}

interface SkillsSectionProps {
  onSkillClick?: (skillName: string) => void;
}

const experienceColors = {
  Expert: "green",
  Advanced: "blue", 
  Intermediate: "orange",
  Beginner: "gray"
};

export function SkillsSection({ onSkillClick }: SkillsSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const placeholderColor = useColorModeValue("gray.500", "gray.400");
  
  // Pre-calculate all color values to avoid hooks in callbacks
  const skillCardBg = useColorModeValue("gray.50", "gray.700");
  const skillCardBorder = useColorModeValue("gray.200", "gray.600");
  const skillCardHoverBorder = useColorModeValue("teal.300", "teal.500");
  const searchCardBg = useColorModeValue("teal.50", "teal.900");
  const searchCardBorder = useColorModeValue("teal.200", "teal.600");
  const searchCardHoverBorder = useColorModeValue("teal.400", "teal.400");
  const searchCardTextColor = useColorModeValue("teal.700", "teal.100");
  const sectionTitleColor = useColorModeValue("gray.600", "gray.300");
  const focusBorderColor = useColorModeValue("teal.500", "teal.300");
  const focusBoxShadow = useColorModeValue("#319795", "#4FD1C7");

  // Flatten all skills into a searchable array
  const allSkills = useMemo(() => {
    const skills: (Skill & { section: string })[] = [];
    Object.entries(skillsData.skills as SkillsData).forEach(([section, sectionSkills]) => {
      sectionSkills.forEach(skill => {
        skills.push({ ...skill, section });
      });
    });
    return skills;
  }, []);

  // Filter skills based on search term
  const filteredSkills = useMemo(() => {
    if (!searchTerm) return allSkills;
    
    return allSkills.filter(skill =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.experience.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allSkills]);

  // Group filtered skills by section
  const groupedFilteredSkills = useMemo(() => {
    const grouped: { [key: string]: (Skill & { section: string })[] } = {};
    filteredSkills.forEach(skill => {
      if (!grouped[skill.section]) {
        grouped[skill.section] = [];
      }
      grouped[skill.section].push(skill);
    });
    return grouped;
  }, [filteredSkills]);

  // Auto-expand when searching
  const shouldShowSkills = isExpanded || searchTerm.length > 0;

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 0) {
      setIsExpanded(true);
    }
  };

  const sectionTitles: { [key: string]: string } = {
    frontend: "Frontend",
    backend: "Backend",
    devops: "DevOps & Cloud",
    mobile: "Mobile",
    tools: "Tools & Libraries",
    languages: "Programming Languages",
    ai_ml: "AI & Machine Learning"
  };

  return (
    <VStack align="stretch" gap={6}>
      <Box>
        <Heading 
          fontWeight="800" 
          fontSize="1em" 
          lineHeight="1.2" 
          color={textColor} 
          mb={4}
        >
          Skills & Technologies
        </Heading>
        
        {/* Compact view with expand button */}
        {!shouldShowSkills && (
          <HStack justify="space-between" align="center">
            <Text color={placeholderColor} fontSize="sm">
              {allSkills.length} technologies across {Object.keys(skillsData.skills).length} categories
            </Text>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(true)}
              colorScheme="teal"
            >
              View Skills <FiChevronDown style={{ marginLeft: '8px' }} />
            </Button>
          </HStack>
        )}

        {/* Search input - shown when expanded */}
        {shouldShowSkills && (
          <VStack gap={3} align="stretch">
            <HStack>
              <Box position="relative" flex={1}>
                <Input
                  placeholder="Search technologies, languages, frameworks..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  bg={bgColor}
                  borderColor={borderColor}
                  color={textColor}
                  _placeholder={{ color: placeholderColor }}
                  _focus={{
                    borderColor: focusBorderColor,
                    boxShadow: `0 0 0 1px ${focusBoxShadow}`
                  }}
                  pl={10}
                />
                <Box
                  position="absolute"
                  left={3}
                  top="50%"
                  transform="translateY(-50%)"
                  color={placeholderColor}
                >
                  <FiSearch />
                </Box>
              </Box>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsExpanded(false);
                  setSearchTerm("");
                }}
                colorScheme="teal"
              >
                <FiChevronUp style={{ marginRight: '8px' }} /> Collapse
              </Button>
            </HStack>
            
            {searchTerm && (
              <Text fontSize="sm" color={placeholderColor}>
                {filteredSkills.length} skills found
              </Text>
            )}
          </VStack>
        )}
      </Box>

      {/* Skills content - only shown when expanded or searching */}
      {shouldShowSkills && (
        <>
          {searchTerm && filteredSkills.length === 0 && (
            <Text color={placeholderColor} textAlign="center" py={4}>
              No skills found matching &ldquo;{searchTerm}&rdquo;
            </Text>
          )}

          {!searchTerm && (
            <Stack gap={6}>
              {Object.entries(skillsData.skills as SkillsData).map(([section, skills]) => (
                <Box key={section}>
                  <Text 
                    fontSize="sm" 
                    fontWeight="600" 
                    color={sectionTitleColor} 
                    mb={3}
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    {sectionTitles[section]}
                  </Text>
                  <Wrap gap={2}>
                    {skills.map((skill, index) => (
                      <WrapItem key={index}>
                        <Box
                          bg={skillCardBg}
                          borderRadius="lg"
                          p={3}
                          border="1px solid"
                          borderColor={skillCardBorder}
                          _hover={{
                            borderColor: skillCardHoverBorder,
                            transform: "translateY(-1px)",
                            boxShadow: "sm",
                            cursor: onSkillClick ? "pointer" : "default"
                          }}
                          transition="all 0.2s"
                          onClick={() => onSkillClick?.(skill.name)}
                          title={onSkillClick ? `Click to see experiences using ${skill.name}` : undefined}
                        >
                          <VStack gap={1} align="center">
                            <Text
                              fontSize="sm"
                              fontWeight="600"
                              color={textColor}
                              textAlign="center"
                            >
                              {skill.name}
                            </Text>
                            <Badge
                              colorScheme={experienceColors[skill.experience as keyof typeof experienceColors]}
                              size="sm"
                              borderRadius="full"
                              fontSize="xs"
                              px={2}
                            >
                              {skill.experience}
                            </Badge>
                          </VStack>
                        </Box>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Box>
              ))}
            </Stack>
          )}

          {searchTerm && filteredSkills.length > 0 && (
            <Stack gap={6}>
              {Object.entries(groupedFilteredSkills).map(([section, skills]) => (
                <Box key={section}>
                  <Text 
                    fontSize="sm" 
                    fontWeight="600" 
                    color={sectionTitleColor} 
                    mb={3}
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    {sectionTitles[section]} ({skills.length})
                  </Text>
                  <Wrap gap={2}>
                    {skills.map((skill, index) => (
                      <WrapItem key={index}>
                        <Box
                          bg={searchCardBg}
                          borderRadius="lg"
                          p={3}
                          border="2px solid"
                          borderColor={searchCardBorder}
                          _hover={{
                            borderColor: searchCardHoverBorder,
                            transform: "translateY(-1px)",
                            boxShadow: "md",
                            cursor: onSkillClick ? "pointer" : "default"
                          }}
                          transition="all 0.2s"
                          onClick={() => onSkillClick?.(skill.name)}
                          title={onSkillClick ? `Click to see experiences using ${skill.name}` : undefined}
                        >
                          <VStack gap={1} align="center">
                            <Text
                              fontSize="sm"
                              fontWeight="600"
                              color={searchCardTextColor}
                              textAlign="center"
                            >
                              {skill.name}
                            </Text>
                            <Badge
                              colorScheme={experienceColors[skill.experience as keyof typeof experienceColors]}
                              size="sm"
                              borderRadius="full"
                              fontSize="xs"
                              px={2}
                            >
                              {skill.experience}
                            </Badge>
                          </VStack>
                        </Box>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Box>
              ))}
            </Stack>
          )}
        </>
      )}
    </VStack>
  );
}