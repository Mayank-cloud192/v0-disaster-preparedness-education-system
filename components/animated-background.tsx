"use client"

import { useEffect, useState } from "react"

interface FloatingShape {
  id: number
  type: "circle" | "square" | "triangle"
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: string
}

export function AnimatedBackground() {
  const [floatingShapes, setFloatingShapes] = useState<FloatingShape[]>([])

  useEffect(() => {
    const shapes: FloatingShape[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      type: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as "circle" | "square" | "triangle",
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4, // 4-12px
      duration: Math.random() * 15 + 25, // 25-40s
      delay: Math.random() * 10, // 0-10s delay
      color: ["blue", "orange", "green", "purple"][Math.floor(Math.random() * 4)],
    }))
    setFloatingShapes(shapes)
  }, [])

  const getShapeClasses = (shape: FloatingShape) => {
    const baseClasses = "absolute animate-float-icon opacity-40"
    const colorClasses = {
      blue: "bg-blue-400/60",
      orange: "bg-orange-400/60",
      green: "bg-green-400/60",
      purple: "bg-purple-400/60",
    }

    const shapeClasses = {
      circle: "rounded-full",
      square: "rounded-sm",
      triangle: "rounded-sm transform rotate-45",
    }

    return `${baseClasses} ${colorClasses[shape.color]} ${shapeClasses[shape.type]}`
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Continuous Gradient Background */}
      <div className="absolute inset-0">
        {/* Primary gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-orange-900/40 animate-gradient-shift" />

        {/* Secondary gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-tl from-orange-800/35 via-blue-800/25 to-green-800/35 animate-gradient-shift-reverse" />

        {/* Tertiary flowing gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600/20 to-transparent animate-gradient-shift"
          style={{ animationDuration: "25s" }}
        />
      </div>

      {/* Flowing SVG Lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="rgb(147, 51, 234)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(249, 115, 22)" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="flowGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="flowGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(249, 115, 22)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="rgb(34, 197, 94)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Continuous flowing paths */}
        <path
          d="M-100,200 Q200,100 500,300 T1100,200 Q1400,100 1700,400"
          fill="none"
          stroke="url(#flowGradient1)"
          strokeWidth="3"
          className="animate-flow-continuous-1"
        />
        <path
          d="M-100,400 Q300,200 600,500 T1200,300 Q1500,200 1800,600"
          fill="none"
          stroke="url(#flowGradient2)"
          strokeWidth="2.5"
          className="animate-flow-continuous-2"
        />
        <path
          d="M-100,600 Q400,300 700,700 T1300,500 Q1600,300 1900,800"
          fill="none"
          stroke="url(#flowGradient3)"
          strokeWidth="2"
          className="animate-flow-continuous-3"
        />
        <path
          d="M1900,100 Q1600,300 1300,200 T700,400 Q400,500 100,300"
          fill="none"
          stroke="url(#flowGradient1)"
          strokeWidth="2.5"
          className="animate-flow-reverse-1"
        />
      </svg>

      {floatingShapes.map((shape) => (
        <div
          key={shape.id}
          className={getShapeClasses(shape)}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            animationDuration: `${shape.duration}s`,
            animationDelay: `${shape.delay}s`,
          }}
        />
      ))}

      {/* Enhanced Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/25 to-purple-500/25 rounded-full blur-3xl animate-float-enhanced" />
      <div
        className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/25 to-red-500/25 rounded-full blur-3xl animate-float-enhanced"
        style={{ animationDelay: "10s", animationDuration: "25s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-green-500/25 to-blue-500/25 rounded-full blur-3xl animate-float-enhanced"
        style={{ animationDelay: "5s", animationDuration: "30s" }}
      />

      {/* Particle System */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 bg-blue-400/50 rounded-full animate-particle-enhanced"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  )
}
