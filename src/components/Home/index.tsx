"use client";

import {
  Box,
  Container,
  Heading,
  Highlight,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import { StarryBackground } from "../ui/starry-background";
import { ColorModeButton, useColorModeValue } from "../ui/color-mode";
import { ExperienceEntry } from "../ui/experience-entry";
import { useRef, useState } from "react";

export default function Home() {
  const colors = useColorModeValue("teal.800", "teal.200");
  const bg = useColorModeValue("teal.200", "teal.800");

  // Section refs for scrolling
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("experience");

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    let ref = aboutRef;
    if (section === "experience") ref = experienceRef;
    if (section === "projects") ref = projectsRef;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
            position={{ base: 'static', lg: 'sticky' }}
            top={{ base: 0, lg: 0 }}
            alignSelf={{ base: 'auto', lg: 'flex-start' }}
            height={{ base: 'auto', lg: 'fit-content' }}
            zIndex={1}
          >
            <Stack direction={"row"} gap={"1rem"} alignItems={"center"}>
              <Avatar
                name="Armando Roque Barahona"
                src="/images/profile.png"
                size="2xl"
              />
              <Heading fontWeight={"800"} fontSize={"3em"} lineHeight={"1.2"}>
                Armando Roque
              </Heading>
            </Stack>
            <HStack>
              <ColorModeButton />
              <Text fontWeight={"700"}>Full Stack Software Engineer</Text>
            </HStack>
            <Text fontWeight={"300"}>
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
                '-ms-overflow-style': 'none',
                'scrollbar-width': 'none',
              }
            }}
          >
            {/* About Section */}
            <Box ref={aboutRef} mb={12} />
            <Heading fontWeight={"800"} fontSize={"1em"} lineHeight={"1.2"}>
              About Me
            </Heading>
            <Text fontWeight="300">
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
            <Text fontWeight="300" mt={4}>
              I&apos;ve led full product builds—from real-time scheduling platforms
              to admin dashboards and Stripe integrations—using PostgreSQL,
              Prisma, GraphQL, and more. I move fast, communicate clearly, and
              bring long-term thinking to every build. If you&apos;re looking for
              someone who can ship, improve, and scale with your team, that&apos;s
              what I do best.
            </Text>
            <Text fontWeight="300" mt={4}>
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

            {/* Experience Section */}
            <Box ref={experienceRef} mb={12} />
            <Stack mt={10} gap={8}>
              <ExperienceEntry
                timeframe="2023 - 2025"
                title="Fullstack Engineer at Qualpay"
                description="At Qualpay, I improved real-time reporting and reconciliation tools used by businesses to track payments. I optimized backend performance and streamlined frontend workflows for faster insights. My work helped reduce operational friction and improved data accuracy for merchants. It was a key contribution to a high-performance, enterprise-grade payment platform."
                techStack={[
                  "Next.js",
                  "React",
                  "TypeScript",
                  "Node.js",
                  "PostgreSQL",
                  "Prisma",
                  "GraphQL",
                  "AWS",
                ]}
              />
              <ExperienceEntry
                timeframe="2022 - 2023"
                title="Senior Developer at AnswersNow"
                description="Led the development of a dynamic web application for certified professionals, implementing real-time scheduling and payment processing. Built a responsive interface using React and TypeScript, integrated Stripe for payments, and optimized database performance with PostgreSQL."
                techStack={[
                  "React",
                  "TypeScript",
                  "Stripe",
                  "PostgreSQL",
                  "Node.js",
                  "Express",
                  "Socket.io",
                  "Docker",
                ]}
              />
              <ExperienceEntry
                timeframe="2023"
                title="NextJS Developer at Condoit"
                description="As a Senior Developer at Condoit, I spearheaded the development of a groundbreaking application for administration, project management, user management, and subscription handling. Leveraging Next.js (App Router), Stripe.js, Chakra UI, and Tanstack's Table and Query, I single-handedly built the application from scratch, significantly improving administrative processes and user experience."
                techStack={[
                  "Next.js",
                  "Stripe.js",
                  "Chakra UI",
                  "Tanstack Table",
                  "Tanstack Query",
                ]}
              />
              <ExperienceEntry
                timeframe="2022"
                title="NextJS Developer at Uptimepm"
                description="As a Full Stack Engineer, I drove the upgrade of key applications using modern web and mobile technologies, enhancing a platform dedicated to vehicle maintenance management. Developed robust features for maintenance and cost tracking, and contributed to a React Native app for mechanics and operators."
                techStack={[
                  "Next.js",
                  "React Native",
                  "TypeScript",
                  "GraphQL",
                  "Node.js",
                  "AWS S3",
                  "RavenDB",
                ]}
              />
              <ExperienceEntry
                timeframe="2021"
                title="React FullStack Developer at Liberty Furniture"
                description="As a Full Stack Engineer, I upgraded existing applications using modern technologies, ensuring seamless performance and enhanced user experience. Revitalized Next.js-based applications with bug fixes and new features using TypeScript, GraphQL, Node.js, and MongoDB."
                techStack={[
                  "Next.js",
                  "TypeScript",
                  "GraphQL",
                  "Node.js",
                  "MongoDB",
                ]}
              />
              <ExperienceEntry
                timeframe="2020 - 2021"
                title="Angular 6 Developer at Number 8"
                description="As a Senior Frontend Engineer, I advanced Angular applications by integrating innovative features and rigorous UX/UI designs. Enhanced applications using Angular, TypeScript, and RxJS by addressing bugs and incorporating new features. Collaborated with design teams to implement high-quality, user-centric interfaces and delivered solutions effectively within a Scrum environment."
                techStack={["Angular 6", "TypeScript", "RxJS"]}
              />
              <ExperienceEntry
                timeframe="2019 - 2020"
                title="Software Developer at Gildan"
                description="I was instrumental in establishing a unified look and feel across company applications by developing a complete style guide. Designed and implemented a comprehensive style guide to ensure consistency across Angular, Node.js, SQL Server, RxJS, and TypeScript applications. Translated mockups into fully coded, professional applications enhancing both aesthetics and functionality."
                techStack={[
                  "Angular",
                  "Node.js",
                  "SQL Server",
                  "RxJS",
                  "TypeScript",
                ]}
              />
              <ExperienceEntry
                timeframe="2019"
                title="Angular Developer at Serpico Dev"
                description="I focused on optimizing an existing Angular project by resolving issues and integrating real-time communication features. Addressed critical bugs while implementing new functionalities to improve the overall application. Integrated Redux and Twilio for a real-time chat feature, ensuring efficient data flow with a NoSQL Firebase database."
                techStack={["Angular", "Redux", "Twilio", "Firebase", "RxJS"]}
              />
              <ExperienceEntry
                timeframe="2018 - 2019"
                title="Software Developer at New Generation Software"
                description="As a Junior .NET Developer, I built a strong foundation in software development and database management while gaining exposure to front-end design. Crafted clean and efficient backend code using .NET technologies with Oracle as the primary database. Dabbled in Microsoft framework-based front-end development, enhancing overall system integration."
                techStack={[".NET", "Oracle", "Microsoft Framework"]}
              />
              <ExperienceEntry
                timeframe="2017 - 2018"
                title="Frontend Developer at Mercer"
                description="I contributed to developing and maintaining multiple React.js web applications, focusing on delivering pixel-perfect interfaces. Engineered and maintained high-performing web applications using React.js. Worked closely with the design team to achieve pixel-perfect user interfaces and leveraged state management libraries to implement complex, responsive features."
                techStack={["React.js", "State Management"]}
              />
              <ExperienceEntry
                timeframe="2014 - 2017"
                title="Frontend Developer at PartnerHero"
                description="I built a full-stack solution from the ground up that empowered call centers with real-time sales tracking and performance evaluation. Developed an application using ReactJS, Firebase, and RESTful services to track sales and manage call center operations. Ensured a responsive, user-friendly interface that facilitated real-time monitoring and pipeline management."
                techStack={["ReactJS", "Firebase", "RESTful Services"]}
              />
              <ExperienceEntry
                timeframe="2013"
                title="Frontend Developer at San Services"
                description="I played a key role in designing CRM solutions and was an early adopter of React.js, laying the groundwork for future frontend innovations. Designed, developed, and implemented CRM applications using Node.js with an Oracle Database. Contributed to the early adoption of React.js by creating reusable components and optimizing performance."
                techStack={["Node.js", "Oracle", "React.js"]}
              />
            </Stack>

            {/* Projects Section Placeholder */}
            <Box ref={projectsRef} mb={12} />
            <Heading fontWeight="800" fontSize="1em" lineHeight="1.2" color="gray.500" mb={4}>
              Projects (Coming Soon)
            </Heading>
            {/* <Box h={32} bg="gray.800" borderRadius={8} opacity={0.3} display="flex" alignItems="center" justifyContent="center">
              <Text color="gray.400">Projects section will be added here.</Text>
            </Box> */}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
