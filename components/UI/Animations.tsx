"use client";

import "aos/dist/aos.css";
import { ReactNode } from "react";

interface FadeColorItemProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export const FadeColorItem = ({
  children,
  delay = 200,
  duration = 600,
}: FadeColorItemProps) => {
  return (
    <div
      className="fade-color-item color-"
      data-aos="fade-up"
      data-aos-delay={delay}
      data-aos-duration={duration}
      data-aos-easing="ease-in-sine"
      data-aos-once="false"
    >
      {children}
    </div>
  );
};

export const FadeInItem = ({ children }: FadeColorItemProps) => {
  return (
    <div
      data-aos="fade-in"
      data-aos-duration="1200"
      data-aos-easing="ease-in-sine"
      data-aos-once="false"
    >
      {children}
    </div>
  );
};

export const FadeUpSlowItem = ({
  children,
  delay = 200,
}: FadeColorItemProps) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      data-aos-duration="1200"
      data-aos-easing="ease-in-sine"
      data-aos-once="false"
    >
      {children}
    </div>
  );
};

export const FadeUpFastItem = ({
  children,
  delay = 800,
}: FadeColorItemProps) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      data-aos-duration="1200"
      data-aos-easing="ease-in-sine"
      data-aos-once="false"
    >
      {children}
    </div>
  );
};

export const SlideRightItem = ({
  children,
  delay = 100,
}: FadeColorItemProps) => {
  return (
    <div
      data-aos="fade-left"
      data-aos-delay={delay}
      data-aos-duration="600"
      data-aos-easing="ease-in-sine"
      data-aos-once="false"
    >
      {children}
    </div>
  );
};
