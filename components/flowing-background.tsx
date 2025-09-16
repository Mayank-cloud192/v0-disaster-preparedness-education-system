"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  color: string
}

interface SafetyIcon {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  icon: string
  rotation: number
}

export function FlowingBackground() {
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [safetyIcons, setSafetyIcons] = useState<SafetyIcon[]>([])

  useEffect(() => {
    // Create floating gradient elements
    const newElements: FloatingElement[] = []
    const colors = [
      "rgba(59, 130, 246, 0.1)", // Blue
      "rgba(16, 185, 129, 0.08)", // Green
      "rgba(245, 101, 101, 0.06)", // Red
      "rgba(251, 191, 36, 0.07)", // Yellow
    ]

    for (let i = 0; i < 12; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 80 + 40,
        speed: Math.random() * 25 + 15,
        opacity: Math.random() * 0.08 + 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const newSafetyIcons: SafetyIcon[] = []
    const icons = ["🛡️", "📚", "🚨", "⚡", "🏥", "🔥", "💧", "🌪️", "📋", "🎯"]

    for (let i = 0; i < 8; i++) {
      newSafetyIcons.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 16,
        speed: Math.random() * 40 + 30,
        opacity: Math.random() * 0.15 + 0.05,
        icon: icons[Math.floor(Math.random() * icons.length)],
        rotation: Math.random() * 360,
      })
    }

    setElements(newElements)
    setSafetyIcons(newSafetyIcons)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-green-500/5 animate-gradient-shift" />
      <div className="absolute inset-0 bg-gradient-to-tl from-red-500/3 via-transparent to-yellow-500/4 animate-gradient-shift-reverse" />

      {/* Enhanced floating gradient orbs */}
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute rounded-full blur-2xl animate-float-enhanced"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            background: `radial-gradient(circle, ${element.color} 0%, transparent 70%)`,
            opacity: element.opacity,
            animationDuration: `${element.speed}s`,
            animationDelay: `${element.id * 0.8}s`,
          }}
        />
      ))}

      {safetyIcons.map((icon) => (
        <div
          key={`safety-${icon.id}`}
          className="absolute animate-float-icon select-none"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            fontSize: `${icon.size}px`,
            opacity: icon.opacity,
            animationDuration: `${icon.speed}s`,
            animationDelay: `${icon.id * 1.2}s`,
            transform: `rotate(${icon.rotation}deg)`,
          }}
        >
          {icon.icon}
        </div>
      ))}

      {/* Enhanced flowing lines with multiple layers */}
      <svg className="absolute inset-0 w-full h-full opacity-8">
        <defs>
          <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="rgb(16, 185, 129)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="flowGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="rgb(245, 101, 101)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="rgb(251, 191, 36)" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        <path
          d="M-200,150 Q200,80 500,150 T1200,150"
          stroke="url(#flowGradient1)"
          strokeWidth="1.5"
          fill="none"
          className="animate-flow-continuous-1"
        />
        <path
          d="M-200,350 Q300,280 600,350 T1300,350"
          stroke="url(#flowGradient2)"
          strokeWidth="1"
          fill="none"
          className="animate-flow-continuous-2"
        />
        <path
          d="M-200,550 Q250,480 550,550 T1100,550"
          stroke="url(#flowGradient1)"
          strokeWidth="0.8"
          fill="none"
          className="animate-flow-continuous-3"
        />
        <path
          d="M1400,200 Q1100,130 800,200 T-100,200"
          stroke="url(#flowGradient2)"
          strokeWidth="1.2"
          fill="none"
          className="animate-flow-reverse-1"
        />
      </svg>

      {/* Enhanced particle system with varied sizes */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute bg-blue-400/10 rounded-full animate-particle-enhanced"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${Math.random() * 8 + 12}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
