"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Card3DProps {
    children: React.ReactNode
    className?: string
    containerClassName?: string
}

export const Card3D = ({ children, className, containerClassName }: Card3DProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [rotateX, setRotateX] = useState(0)
    const [rotateY, setRotateY] = useState(0)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateXValue = ((y - centerY) / centerY) * -10
        const rotateYValue = ((x - centerX) / centerX) * 10

        setRotateX(rotateXValue)
        setRotateY(rotateYValue)
    }

    const handleMouseLeave = () => {
        setRotateX(0)
        setRotateY(0)
    }

    return (
        <div className={cn("perspective-1000", containerClassName)}>
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{
                    rotateX,
                    rotateY,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                }}
                style={{
                    transformStyle: "preserve-3d",
                }}
                className={cn("relative", className)}
            >
                {children}
            </motion.div>
        </div>
    )
}

interface FloatingCardProps {
    children: React.ReactNode
    className?: string
    delay?: number
}

export const FloatingCard = ({ children, className, delay = 0 }: FloatingCardProps) => {
    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{
                y: [-10, 10, -10],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

interface GlowCardProps {
    children: React.ReactNode
    className?: string
    glowColor?: string
}

export const GlowCard = ({ children, className, glowColor = "139, 92, 246" }: GlowCardProps) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    return (
        <div
            className={cn("relative overflow-hidden rounded-xl", className)}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {isHovering && (
                <div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${glowColor}, 0.15), transparent 40%)`,
                    }}
                />
            )}
            {children}
        </div>
    )
}
