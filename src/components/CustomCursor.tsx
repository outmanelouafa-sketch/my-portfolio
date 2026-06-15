import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
    const trailX = useSpring(mouseX, springConfig);
    const trailY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer') ||
                target.classList.contains('animated-underline')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block overflow-hidden">
            <svg className="absolute inset-0 w-full h-full overflow-visible">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FF7A13" stopOpacity="0" />
                        <stop offset="50%" stopColor="#FF7A13" stopOpacity="1" />
                        <stop offset="100%" stopColor="#FF7A13" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* The Trailing Line - Primary Orange */}
                <motion.line
                    x1={trailX}
                    y1={trailY}
                    x2={mouseX}
                    y2={mouseY}
                    stroke="url(#lineGradient)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    animate={{
                        opacity: isHovering ? 0.2 : 0.8,
                        transition: { duration: 0.3 }
                    }}
                    filter="url(#glow)"
                />

                {/* Glowing Tip / Dot */}
                <motion.circle
                    cx={mouseX}
                    cy={mouseY}
                    r={isHovering ? 0 : 3}
                    fill="#FF7A13"
                    animate={{
                        scale: isHovering ? 0 : 1,
                        opacity: isHovering ? 0 : 1
                    }}
                    filter="url(#glow)"
                />
            </svg>

            {/* Modern Hover Circle Effect */}
            <AnimatePresence>
                {isHovering && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            transition: { type: "spring", damping: 15, stiffness: 150 }
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        style={{
                            translateX: mouseX,
                            translateY: mouseY,
                            left: -40,
                            top: -40,
                        }}
                        className="absolute w-20 h-20 flex items-center justify-center"
                    >
                        {/* Outer Expanding Ring */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 border-2 border-primary/50 rounded-full"
                        />
                        {/* Inner Soft Glow */}
                        <div className="absolute inset-2 bg-primary/10 rounded-full blur-md" />

                        {/* Center Magnetic Dot */}
                        <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_#FF7A13]" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Static Aura for general feedback */}
            <motion.div
                style={{
                    translateX: mouseX,
                    translateY: mouseY,
                    left: -10,
                    top: -10,
                }}
                animate={{
                    scale: isHovering ? 2 : 1,
                    opacity: isHovering ? 0.05 : 0.02,
                }}
                className="absolute w-20 h-20 bg-primary rounded-full blur-3xl pointer-events-none"
            />
        </div>
    );
};

export default CustomCursor;
