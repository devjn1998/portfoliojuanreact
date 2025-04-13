import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface AnimatedImageProps {
  id: string;
  src: string;
  alt: string;
  delay?: number;
  className?: string;
}

const StyledImage = styled.img<{ scale: number }>`
  transform: scale(${(props) => props.scale});
  transition: transform 0.3s ease;
`;

export function AnimatedImage({
  id,
  src,
  alt,
  delay = 3000,
  className,
}: AnimatedImageProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const animateImage = async () => {
      // Delay inicial
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Animação de pulso duas vezes
      for (let i = 0; i < 2; i++) {
        setScale(1.1);
        await new Promise((resolve) => setTimeout(resolve, 300));
        setScale(1);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    };

    animateImage();
  }, [delay]);

  return (
    <StyledImage
      id={id}
      src={src}
      alt={alt}
      scale={scale}
      onMouseEnter={() => setScale(1.1)}
      onMouseLeave={() => setScale(1)}
      className={className}
    />
  );
}
