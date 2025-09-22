"use client";

import {
  Box,
  Container,
  Heading,
  Highlight,
  HStack,
  Stack,
  Text,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import { StarryBackground } from "../ui/starry-background";
import { ColorModeButton, useColorModeValue } from "../ui/color-mode";
import { ExperienceEntry } from "../ui/experience-entry";
import { SkillsSection } from "../ui/skills-section";
import { useRef, useState } from "react";
import { LuDownload } from "react-icons/lu";
import { FaLinkedin, FaGithub, FaCodepen } from "react-icons/fa";
import experienceData from "../../data/experience.json";
import { ProjectEntry } from "../ui/project-entry";
import projectsData from "../../data/projects.json";

export default function Home() {
  const colors = useColorModeValue("teal.800", "teal.200");
  const bg = useColorModeValue("teal.200", "teal.800");  
  const socialIconColor = useColorModeValue('#000', '#fff');
  const seeMoreBtnBg = useColorModeValue("#319795", "#234E52");

  // Section refs for scrolling
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("experience");
  const [visibleExperienceCount, setVisibleExperienceCount] = useState(5);
  const [highlightedTech, setHighlightedTech] = useState<string | null>(null);
  const [highlightedExperiences, setHighlightedExperiences] = useState<number[]>([]);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    let ref = aboutRef;
    if (section === "skills") ref = skillsRef;
    if (section === "experience") ref = experienceRef;
    if (section === "projects") ref = projectsRef;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSeeMore = () => setVisibleExperienceCount((prev) => prev + 5);

  const handleSkillClick = (skillName: string) => {
    // Find experiences that use this skill
    const matchingExperiences: number[] = [];
    experienceData.experience.forEach((exp, index) => {
      const hasSkill = exp.techStack.some(tech => 
        tech.toLowerCase().includes(skillName.toLowerCase()) ||
        skillName.toLowerCase().includes(tech.toLowerCase())
      );
      if (hasSkill) {
        matchingExperiences.push(index);
      }
    });

    if (matchingExperiences.length > 0) {
      // Set highlighting
      setHighlightedTech(skillName);
      setHighlightedExperiences(matchingExperiences);
      
      // Navigate to experience section
      setActiveSection("experience");
      experienceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Expand experience section if needed to show all matching experiences
      const maxMatchingIndex = Math.max(...matchingExperiences);
      if (maxMatchingIndex >= visibleExperienceCount) {
        setVisibleExperienceCount(Math.max(visibleExperienceCount, maxMatchingIndex + 1));
      }

      // Clear highlighting after 5 seconds
      setTimeout(() => {
        setHighlightedTech(null);
        setHighlightedExperiences([]);
      }, 5000);
    }
  };

  return (
    <>
      <StarryBackground />
      <Container 
        maxW={"container.xl"} py={[5, 24]} px={[2, 12]} 
        height={{ base: 'auto', lg: '100vh' }}
        overflow={{ base: 'visible', lg: 'hidden' }}
      >
        <Stack 
          direction={{ base: "column", lg: "row" }} 
          gap={4} 
          height={{ base: 'auto', lg: '100%' }}
        >
          {/* Left Column */}
          <Stack
            flexBasis={{ base: "100%", lg: "40%" }}
            p={8}
            borderRadius={8}
            gap="1rem"
            position="relative"
            top={{ base: 0, lg: undefined }}
            alignSelf={{ base: 'auto', lg: 'flex-start' }}
            display="flex"
            flexDirection="column"
            zIndex={1}
          >
            <Stack direction={"row"} gap={"1rem"} alignItems={"center"}>
              <Avatar
                name="Armando Roque Barahona"
                src="/images/profile.png"
                size="2xl"
              />
              <Heading fontWeight={"800"} fontSize={"3em"} lineHeight={"1.2"} color={useColorModeValue("gray.800", "white")}>
                Armando Roque
              </Heading>
            </Stack>
            <HStack>
              <ColorModeButton />
              <Text fontWeight={"700"} color={useColorModeValue("gray.800", "white")}>Full Stack Software Engineer</Text>
            </HStack>
            <HStack>
              <Link
                href="/Armando-cv.pdf"
                download
                display="flex"
                alignItems="center"
                gap={2}
                _hover={{ opacity: 0.8 }}
              >
                <IconButton
                  aria-label="Download Resume"
                  variant="ghost"
                  size="sm"
                  css={{
                    _icon: {
                      width: "5",
                      height: "5",
                    },
                  }}
                >
                  <LuDownload />
                </IconButton>
                <Text fontWeight={"500"} color={useColorModeValue("gray.800", "white")}>Download Resume</Text>
              </Link>
            </HStack>
            <Text fontWeight={"300"} color={useColorModeValue("gray.800", "white")}>
              I&apos;m a full stack software engineer with a passion for building
              scalable and efficient web applications.
            </Text>
            
            {/* Responsive Section Navigation */}
            <Stack
              mt={{ base: 0, lg: 8 }}
              gap={{ base: 0, lg: 2 }}
              direction={{ base: "row", lg: "column" }}
              as="nav"
              aria-label="Section navigation"
              position={{ base: "fixed", lg: "static" }}
              top={{ base: 0, lg: undefined }}
              left={{ base: 0, lg: undefined }}
              width={{ base: "100vw", lg: "auto" }}
              zIndex={100}              
              px={{ base: 2, lg: 0 }}
              py={{ base: 2, lg: 0 }}              
            >
              {[
                { label: "About", key: "about" },
                { label: "Skills", key: "skills" },
                { label: "Experience", key: "experience" },
                { label: "Projects", key: "projects" },
              ].map((item) => (
                <HStack
                  key={item.key}
                  gap={3}
                  alignItems="center"
                  cursor="pointer"
                  opacity={activeSection === item.key ? 1 : 0.5}
                  fontWeight={activeSection === item.key ? 700 : 400}
                  color={activeSection === item.key ? colors : "gray.400"}
                  onClick={() => handleNavClick(item.key)}
                  flex={{ base: 1, lg: undefined }}
                  justifyContent={{ base: "center", lg: "flex-start" }}
                  py={{ base: 2, lg: 0 }}
                >
                  <Box
                    w={{ base: "2px", lg: "32px" }}
                    h={{ base: "24px", lg: "2px" }}
                    bg={activeSection === item.key ? colors : "gray.600"}
                    borderRadius="full"
                    transition="all 0.2s"
                    mr={{ base: 0, lg: 2 }}
                    mb={{ base: 0, lg: 0 }}
                  />
                  <Text
                    fontSize="sm"
                    letterSpacing={2}
                    textTransform="uppercase"
                    transition="all 0.2s"
                  >
                    {item.label}
                  </Text>
                </HStack>
              ))}
            </Stack>
            {/* Social Links at the bottom */}
            <HStack
              gap={3}              
              left={0}
              height={{base: "auto", lg: "90vh"}}
              bottom={0}
              width="100%"
              justifyContent="center"
              mt={{ base: 8, lg: 0 }}
            >
              <Link href="https://www.linkedin.com/in/armando-roque-547914133/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin size={36} color={socialIconColor} />
              </Link>
              <Link href="https://github.com/roque510" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub size={36} color={socialIconColor} />
              </Link>
              <Link href="https://codepen.io/aroque" target="_blank" rel="noopener noreferrer" aria-label="CodePen">
                <FaCodepen size={36} color={socialIconColor} />
              </Link>
            </HStack>
          </Stack>

          {/* Right Column */}
          <Stack
            flex={1}
            p={8}
            borderRadius={8}
            overflowY={{ base: 'visible', lg: 'auto' }}
            maxHeight={{ base: 'none', lg: '100vh' }}
            pt={{ base: '64px', lg: 0 }}
            css={{
              "@media (min-width: 62em)": {
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }
            }}
          >
            {/* About Section */}
            <Box ref={aboutRef} mb={12} />
            <Heading fontWeight={"800"} fontSize={"1em"} lineHeight={"1.2"} color={useColorModeValue("gray.800", "white")}>
              About Me
            </Heading>
            <Text fontWeight="300" color={useColorModeValue("gray.800", "white")}>
              <Highlight
                styles={{ color: colors, bg: bg }}
                query="spearheading"
              >
                I&apos;m a Full Stack Developer with 10+ years of experience building
                fast, responsive apps across industries. I work with tools like
                Next.js, React, Angular, and Node.js to create clean, scalable
                solutions that users love. Whether I&apos;m spearheading new projects
                or modernizing legacy systems, I focus on delivering great UX
                with solid performance.
              </Highlight>
            </Text>
            
            <Text fontWeight="300" mt={4} color={useColorModeValue("gray.800", "white")}>
              I&apos;ve led full product builds—from real-time scheduling platforms
              to admin dashboards and Stripe integrations—using PostgreSQL,
              Prisma, GraphQL, and more. I move fast, communicate clearly, and
              bring long-term thinking to every build. If you&apos;re looking for
              someone who can ship, improve, and scale with your team, that&apos;s
              what I do best.
            </Text>
            <Text fontWeight="300" mt={4} color={useColorModeValue("gray.800", "white")}>
              <Highlight
                styles={{ color: colors, bg: bg }}
                query={[
                  "LangChain",
                  "Ollama",
                  "LLaMA 3",
                  "OpenAI's GPT series",
                ]}
              >
                I&apos;ve also built projects leveraging AI technologies, including LangChain and Ollama, integrating models like LLaMA 3 and OpenAI&apos;s GPT series. I&apos;m an active member of the Hugging Face community, where I explore and contribute to the latest in open-source machine learning tools.
              </Highlight>
            </Text>
            <Text fontWeight="300" mt={4} color={useColorModeValue("gray.800", "white")}>
              <Highlight
                styles={{ color: colors, bg: bg }}
                query={[
                  "Qualpay",
                  "Squarecodex",
                  "Condoit",
                  "Liberty Furniture",
                  "UptimePM",
                ]}
              >
                Over the years, I&apos;ve built impactful software for companies like
                Qualpay, Squarecodex, Condoit, Liberty Furniture, and UptimePM.
                At Qualpay, I improved real-time reporting for their payment
                platform, helping businesses track transactions with greater
                accuracy. At Squarecodex, I built a seamless scheduling app with
                Stripe for certified professionals. At Condoit, I launched a
                full admin system with Next.js. I&apos;ve also modernized legacy
                systems at Liberty Furniture and delivered mobile-first tools at
                UptimePM—each project pushing me to write cleaner, smarter code
                that drives results.
              </Highlight>
            </Text>

            {/* Skills Section */}
            <Box ref={skillsRef} mt={10} mb={8}>
              <SkillsSection onSkillClick={handleSkillClick} />
            </Box>

            {/* Experience Section */}
            <Box ref={experienceRef} mb={12} />
            <Stack mt={10} gap={8}>
              {experienceData.experience.slice(0, visibleExperienceCount).map((entry, index) => (
                <ExperienceEntry
                  key={index}
                  timeframe={entry.timeframe}
                  title={entry.title}
                  description={entry.description}
                  techStack={entry.techStack}
                  highlightedTech={highlightedTech || undefined}
                  isHighlighted={highlightedExperiences.includes(index)}
                />
              ))}
              {visibleExperienceCount < experienceData.experience.length && (
                <HStack justifyContent="center">
                  <button
                    style={{
                      background: seeMoreBtnBg,
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      padding: "8px 20px",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontSize: 14,
                      marginTop: 8,
                      transition: "background 0.2s"
                    }}
                    onClick={handleSeeMore}
                  >
                    See more
                  </button>
                </HStack>
              )}
            </Stack>

            {/* Projects Section Placeholder */}
            <Box ref={projectsRef} mb={12} />
            <Heading fontWeight="800" fontSize="1em" lineHeight="1.2" color={useColorModeValue("gray.500", "gray.200") } mb={4}>
              Projects
            </Heading>
            <Stack gap={8}>
              {projectsData.projects.map((project, idx) => (
                <ProjectEntry
                  key={idx}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  techStack={project.techStack}
                  link={project.link}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
