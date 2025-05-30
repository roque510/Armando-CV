'use client'

import { Box } from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
import { useColorModeValue } from "../ui/color-mode"
import { useEffect, useState, useCallback } from "react"

const createShootingStarAnimation = (startX: number, startY: number) => keyframes`
  0% {
    transform: translateX(${startX}px) translateY(${startY}px) rotate(45deg);
    opacity: 1;
  }
  100% {
    transform: translateX(${startX + 1000}px) translateY(${startY + 1000}px) rotate(45deg);
    opacity: 0;
  }
`

const ShootingStar = ({ startX, startY }: { startX: number; startY: number }) => {
  const starColor = useColorModeValue('teal.800', 'white');
  const starGlow = useColorModeValue('0 0 10px blue.500', '0 0 10px white');
  const animation = createShootingStarAnimation(startX, startY);

  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      width="100px"
      height="2px"
      bg={starColor}
      boxShadow={starGlow}
      animation={`${animation} 1s linear`}
    />
  );
};

// Pre-generated star positions for consistent server/client rendering
const initialStars = Array.from({ length: 100 }, (_, i) => ({
  x: (i * 7) % 100, // Deterministic positioning
  y: (i * 11) % 100,
  size: 1 + (i % 2)
}));

export const StarryBackground = () => {
  const [stars] = useState(initialStars);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [shootingStarVisible, setShootingStarVisible] = useState(false);
  const [shootingStarPosition, setShootingStarPosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const starColor = useColorModeValue('teal.800', 'white');
  const starGlow = useColorModeValue('0 0 10px blue.500', '0 0 10px white');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const triggerShootingStar = useCallback(() => {
    if (!isClient) return;
    
    const startX = Math.random() * (window.innerWidth * 0.8) + (window.innerWidth * 0.1);
    const startY = Math.random() * (window.innerHeight * 0.3);
    setShootingStarPosition({ x: startX, y: startY });
    setShootingStarVisible(true);
    setTimeout(() => {
      setShootingStarVisible(false);
    }, 1000);
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    // Initial trigger
    triggerShootingStar();

    const interval = setInterval(() => {
      triggerShootingStar();
    }, 10000);

    // Handle window resize
    const handleResize = () => {
      if (shootingStarVisible) {
        setShootingStarVisible(false);
        setTimeout(triggerShootingStar, 100);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [triggerShootingStar, shootingStarVisible, isClient]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={-1}
      bg={bgColor}
    >
      {stars.map((star, index) => (
        <Box
          key={index}
          position="absolute"
          left={`${star.x}%`}
          top={`${star.y}%`}
          width={`${star.size}px`}
          height={`${star.size}px`}
          borderRadius="50%"
          bg={starColor}
          opacity={hoveredStar === index ? 1 : 0.5}
          transition="all 0.3s ease"
          _hover={{
            opacity: 1,
            transform: 'scale(1.5)',
            boxShadow: starGlow
          }}
          onMouseEnter={() => setHoveredStar(index)}
          onMouseLeave={() => setHoveredStar(null)}
        />
      ))}
      {isClient && shootingStarVisible && (
        <ShootingStar startX={shootingStarPosition.x} startY={shootingStarPosition.y} />
      )}
    </Box>
  );
}; 