'use client'

import { Box, Button, Container, Heading, Highlight, HStack, Stack, Text, useBreakpointValue } from "@chakra-ui/react"
import { Avatar } from "../ui/avatar"
import { StarryBackground } from "../ui/starry-background"
import { useColorModeValue } from "../ui/color-mode"
import { ExperienceEntry } from "../ui/experience-entry"

export default function Home() {

    const colors = useColorModeValue("teal.800", "teal.200")
    const bg = useColorModeValue("teal.200", "teal.800")
    const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <StarryBackground />
      <Container maxW={'container.xl'} py={[5,24]} px={[2, 12]}>
        <Stack direction={{ base: "column", lg: "row" }} >
          <Stack flex={1} p={8} borderRadius={8} gap={'1rem'} >
              <Stack direction={'row'} gap={'1rem'} alignItems={'center'}>
                  <Avatar name="Armando Roque Barahona" src="/images/profile.png" size="2xl" />
                  <Heading fontWeight={'800'} fontSize={'3em'} lineHeight={'1.2'}>
                      Armando Roque
                  </Heading>
              </Stack>
              <Text fontWeight={'700'}>
                  Full Stack Software Engineer
              </Text>
              <Text fontWeight={'300'}>
                  I'm a full stack software engineer with a passion for building scalable and efficient web applications.
              </Text>            
          </Stack>
          <Stack flex={1}  p={8} borderRadius={8}>
              <Heading fontWeight={'800'} fontSize={'1em'} lineHeight={'1.2'}>
                  Profile
              </Heading>
              <Text fontWeight="300">
              <Highlight styles={{ color: colors, bg: bg }} query="spearheading">
                I'm a Full Stack Developer with 10+ years of experience building fast, responsive apps across industries. I work with tools like Next.js, React, Angular, and Node.js to create clean, scalable solutions that users love. Whether I'm spearheading new projects or modernizing legacy systems, I focus on delivering great UX with solid performance.
              </Highlight>
                </Text>
                <Text fontWeight="300" mt={4}>
                I've led full product builds—from real-time scheduling platforms to admin dashboards and Stripe integrations—using PostgreSQL, Prisma, GraphQL, and more. I move fast, communicate clearly, and bring long-term thinking to every build. If you're looking for someone who can ship, improve, and scale with your team, that's what I do best.
                </Text>
                <Text fontWeight="300" mt={4}>
                <Highlight styles={{ color: colors, bg: bg }} query={["Qualpay", "Squarecodex", "Condoit", "Liberty Furniture", "UptimePM"]}>
                Over the years, I've built impactful software for companies like Qualpay, Squarecodex,
                Condoit, Liberty Furniture, and UptimePM. At Qualpay,
                I improved real-time reporting for their payment platform,
                helping businesses track transactions with greater accuracy.
                At Squarecodex, I built a seamless scheduling app with Stripe for certified professionals.
                At Condoit, I launched a full admin system with Next.js. 
                I've also modernized legacy systems at Liberty Furniture and delivered mobile-first tools at 
                UptimePM—each project pushing me to write cleaner, smarter code that drives results.
                </Highlight>
                </Text>

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
                            "AWS"
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
                            "Docker"
                        ]}
                    />
                </Stack>
            </Stack>
            
      </Stack>
      </Container>
    </>
  )
}
