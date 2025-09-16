"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react"

// Sample institution data with coordinates
const institutions = [
  {
    id: 1,
    name: "Delhi Public School",
    type: "school",
    state: "Delhi",
    address: "Mathura Road, New Delhi",
    contact: "+91-11-2634-5678",
    email: "info@dpsdelhi.edu.in",
    coordinates: [77.209, 28.6139], // [longitude, latitude]
    preparedness: 92,
  },
  {
    id: 2,
    name: "Indian Institute of Technology",
    type: "college",
    state: "Delhi",
    address: "Hauz Khas, New Delhi",
    contact: "+91-11-2659-1000",
    email: "info@iitd.ac.in",
    coordinates: [77.1925, 28.5458],
    preparedness: 95,
  },
  {
    id: 3,
    name: "St. Xavier's School",
    type: "school",
    state: "Maharashtra",
    address: "Fort, Mumbai",
    contact: "+91-22-2266-0969",
    email: "info@stxaviers.edu",
    coordinates: [72.8777, 19.076],
    preparedness: 88,
  },
  {
    id: 4,
    name: "University of Mumbai",
    type: "college",
    state: "Maharashtra",
    address: "Kalina, Mumbai",
    contact: "+91-22-2652-5000",
    email: "info@mu.ac.in",
    coordinates: [72.8777, 19.076],
    preparedness: 90,
  },
  {
    id: 5,
    name: "Kendriya Vidyalaya",
    type: "school",
    state: "Karnataka",
    address: "Malleswaram, Bangalore",
    contact: "+91-80-2334-5678",
    email: "info@kvbangalore.edu.in",
    coordinates: [77.5946, 12.9716],
    preparedness: 85,
  },
  {
    id: 6,
    name: "Indian Institute of Science",
    type: "college",
    state: "Karnataka",
    address: "CV Raman Avenue, Bangalore",
    contact: "+91-80-2293-2001",
    email: "info@iisc.ac.in",
    coordinates: [77.5946, 12.9716],
    preparedness: 97,
  },
  {
    id: 7,
    name: "Presidency College",
    type: "college",
    state: "West Bengal",
    address: "College Street, Kolkata",
    contact: "+91-33-2241-1000",
    email: "info@presidency.edu.in",
    coordinates: [88.3639, 22.5726],
    preparedness: 89,
  },
  {
    id: 8,
    name: "DAV Public School",
    type: "school",
    state: "Punjab",
    address: "Model Town, Ludhiana",
    contact: "+91-161-2345-678",
    email: "info@davludhiana.edu.in",
    coordinates: [75.8573, 30.901],
    preparedness: 86,
  },
]

const indiaMapPath =
  "M158.8,146.8c1.5-2.3,4.1-3.8,6.9-4.1c2.8-0.3,5.7,0.6,8.1,2.4c2.4,1.8,4.2,4.4,5.1,7.3c0.9,2.9,1,6,0.3,8.9c-0.7,2.9-2.2,5.6-4.3,7.7c-2.1,2.1-4.8,3.6-7.7,4.3c-2.9,0.7-6,0.6-8.9-0.3c-2.9-0.9-5.5-2.7-7.3-5.1c-1.8-2.4-2.7-5.3-2.4-8.1C148.9,150.9,150.4,148.3,158.8,146.8z M200,50c50,0,100,20,140,60c40,40,60,90,60,140c0,50-20,100-60,140c-40,40-90,60-140,60c-50,0-100-20-140-60c-40-40-60-90-60-140c0-50,20-100,60-140C100,70,150,50,200,50z M80,120c0,0,20-20,40-20s40,20,40,20s20,40,20,60s-20,40-20,40s-40,20-40,20s-40-20-40-20s-20-40-20-40S80,140,80,120z M280,120c0,0,20-20,40-20s40,20,40,20s20,40,20,60s-20,40-20,40s-40,20-40,20s-40-20-40-20s-20-40-20-40S280,140,280,120z M120,280c0,0,20-20,40-20s40,20,40,20s20,40,20,60s-20,40-20,40s-40,20-40,20s-40-20-40-20s-20-40-20-40S120,300,120,280z M240,280c0,0,20-20,40-20s40,20,40,20s20,40,20,60s-20,40-20,40s-40,20-40,20s-40-20-40-20s-20-40-20-40S240,300,240,280z"

// Accurate India states with proper SVG paths
const indiaStates = [
  {
    id: "rajasthan",
    name: "Rajasthan",
    path: "M120,80 L180,80 L200,120 L180,160 L120,160 L100,120 Z",
    color: "hsl(var(--primary))",
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    path: "M140,180 L220,180 L240,220 L200,260 L140,240 L120,200 Z",
    color: "hsl(var(--chart-1))",
  },
  {
    id: "karnataka",
    name: "Karnataka",
    path: "M160,260 L220,260 L240,300 L180,320 L140,300 L160,260 Z",
    color: "hsl(var(--chart-2))",
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    path: "M180,320 L240,320 L260,360 L200,380 L160,360 L180,320 Z",
    color: "hsl(var(--chart-3))",
  },
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    path: "M220,260 L280,260 L300,300 L260,340 L220,320 L220,260 Z",
    color: "hsl(var(--chart-4))",
  },
  {
    id: "odisha",
    name: "Odisha",
    path: "M280,200 L320,200 L340,240 L320,280 L280,260 L280,200 Z",
    color: "hsl(var(--chart-5))",
  },
  {
    id: "west-bengal",
    name: "West Bengal",
    path: "M320,160 L360,160 L380,200 L360,240 L320,220 L320,160 Z",
    color: "hsl(var(--accent))",
  },
  {
    id: "bihar",
    name: "Bihar",
    path: "M280,120 L340,120 L360,160 L320,180 L280,160 L280,120 Z",
    color: "hsl(var(--secondary))",
  },
  {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    path: "M200,100 L280,100 L300,140 L260,180 L200,160 L180,120 Z",
    color: "hsl(var(--muted))",
  },
  {
    id: "madhya-pradesh",
    name: "Madhya Pradesh",
    path: "M180,140 L260,140 L280,180 L240,220 L180,200 L160,160 Z",
    color: "hsl(var(--destructive))",
  },
  {
    id: "gujarat",
    name: "Gujarat",
    path: "M80,160 L140,160 L160,200 L120,240 L80,220 L60,180 Z",
    color: "hsl(var(--warning))",
  },
  {
    id: "punjab",
    name: "Punjab",
    path: "M140,60 L180,60 L200,100 L160,120 L140,100 L120,80 Z",
    color: "hsl(var(--success))",
  },
  {
    id: "haryana",
    name: "Haryana",
    path: "M180,80 L220,80 L240,120 L200,140 L180,120 L180,80 Z",
    color: "hsl(var(--info))",
  },
  {
    id: "delhi",
    name: "Delhi",
    path: "M200,100 L220,100 L230,120 L210,140 L190,120 L200,100 Z",
    color: "hsl(var(--primary))",
  },
]

interface TooltipData {
  institution: (typeof institutions)[0]
  x: number
  y: number
}

export default function InteractiveIndiaMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null)

  const convertCoordinates = (lng: number, lat: number) => {
    // India bounds: lng 68-97, lat 8-37
    const x = ((lng - 68) / (97 - 68)) * 400 + 50
    const y = ((37 - lat) / (37 - 8)) * 350 + 50
    return [x, y]
  }

  const handleMarkerClick = (institution: (typeof institutions)[0], event: React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    setTooltip({
      institution,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  const handleMarkerHover = (institutionId: number) => {
    setHoveredMarker(institutionId)
  }

  const handleMarkerLeave = () => {
    setHoveredMarker(null)
  }

  const closeTooltip = () => {
    setTooltip(null)
  }

  return (
    <div className="relative">
      {/* Main Map Container */}
      <div className="relative bg-background/50 dark:bg-background/80 border border-border/50 rounded-xl p-6 min-h-[600px] overflow-hidden backdrop-blur-sm">
        <svg viewBox="0 0 500 450" className="w-full h-full" style={{ minHeight: "600px" }}>
          <rect width="500" height="450" fill="hsl(var(--muted)/0.1)" />

          <rect width="500" height="450" fill="hsl(var(--primary)/0.05)" />

          {/* State boundaries with better visibility */}
          {indiaStates.map((state) => (
            <path
              key={state.id}
              d={state.path}
              fill={hoveredState === state.id ? `${state.color}60` : `${state.color}30`}
              stroke="hsl(var(--foreground))"
              strokeWidth="1.5"
              className="cursor-pointer transition-all duration-300 hover:opacity-80"
              onMouseEnter={() => setHoveredState(state.id)}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => setSelectedState(state.id)}
            />
          ))}

          {indiaStates.map((state) => {
            // Calculate center of each state path for label placement
            const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
            pathElement.setAttribute("d", state.path)
            const bbox = pathElement.getBBox?.() || { x: 0, y: 0, width: 0, height: 0 }
            const centerX = bbox.x + bbox.width / 2
            const centerY = bbox.y + bbox.height / 2

            return (
              <text
                key={`${state.id}-label`}
                x={centerX}
                y={centerY}
                textAnchor="middle"
                fontSize="10"
                fill="hsl(var(--foreground)/0.7)"
                className="pointer-events-none select-none font-medium"
              >
                {state.name.split(" ")[0]}
              </text>
            )
          })}

          {/* Institution markers with improved visibility */}
          {institutions.map((institution) => {
            const [x, y] = convertCoordinates(institution.coordinates[0], institution.coordinates[1])
            const isHovered = hoveredMarker === institution.id

            return (
              <g key={institution.id}>
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? "16" : "14"}
                  fill="hsl(var(--background))"
                  stroke={institution.type === "school" ? "hsl(var(--primary))" : "hsl(var(--accent))"}
                  strokeWidth="3"
                  className={`cursor-pointer transition-all duration-300 ${
                    isHovered ? "animate-marker-glow animate-marker-float" : ""
                  }`}
                  style={{
                    filter: isHovered
                      ? "drop-shadow(0 0 12px rgba(59, 130, 246, 0.8))"
                      : "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                    transform: isHovered ? "scale(1.2)" : "scale(1)",
                  }}
                  onClick={(e) => handleMarkerClick(institution, e)}
                  onMouseEnter={() => handleMarkerHover(institution.id)}
                  onMouseLeave={handleMarkerLeave}
                />

                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fontSize={isHovered ? "16" : "14"}
                  className={`cursor-pointer select-none transition-all duration-300 ${
                    isHovered ? "animate-marker-bounce" : ""
                  }`}
                  onClick={(e) => handleMarkerClick(institution, e)}
                  onMouseEnter={() => handleMarkerHover(institution.id)}
                  onMouseLeave={handleMarkerLeave}
                >
                  {institution.type === "school" ? "🏫" : "🎓"}
                </text>

                <circle
                  cx={x}
                  cy={y}
                  r="24"
                  fill="none"
                  stroke={institution.type === "school" ? "hsl(var(--primary))" : "hsl(var(--accent))"}
                  strokeWidth="2"
                  opacity={isHovered ? "0.6" : "0"}
                  className={`pointer-events-none transition-all duration-300 ${
                    isHovered ? "animate-marker-pulse" : ""
                  }`}
                />
              </g>
            )
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute z-50 bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-4 max-w-sm animate-in fade-in-0 zoom-in-95"
            style={{
              left: tooltip.x + 10,
              top: tooltip.y - 10,
              transform: tooltip.x > 250 ? "translateX(-100%)" : "none",
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-sm">{tooltip.institution.name}</h3>
                <p className="text-xs text-muted-foreground">{tooltip.institution.state}</p>
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={closeTooltip}>
                ×
              </Button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span>{tooltip.institution.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3 text-muted-foreground" />
                <span>{tooltip.institution.contact}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3 text-muted-foreground" />
                <span className="truncate">{tooltip.institution.email}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-medium">Preparedness:</span>
                <Badge variant="secondary" className="text-xs">
                  {tooltip.institution.preparedness}%
                </Badge>
              </div>

              <Button size="sm" className="w-full mt-2 h-7 text-xs">
                <ExternalLink className="h-3 w-3 mr-1" />
                View Details
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Legend with better dark theme visibility */}
      <Card className="absolute bottom-4 right-4 bg-background/90 dark:bg-background/95 backdrop-blur-sm border border-border/50">
        <CardContent className="p-4">
          <h4 className="font-semibold text-sm mb-3 text-foreground">Legend</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-lg">🏫</span>
              <span className="text-foreground">School</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">🎓</span>
              <span className="text-foreground">College</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-background/90 dark:bg-background/95 backdrop-blur-sm border-border/50"
          onClick={() => setSelectedState(null)}
        >
          Reset View
        </Button>
      </div>
    </div>
  )
}
