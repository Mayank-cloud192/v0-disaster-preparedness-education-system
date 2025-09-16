"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Maximize,
  MapPin,
  AlertTriangle,
  Shield,
  Users,
  Stars as Stairs,
  DoorOpen,
} from "lucide-react"

interface EmergencyPoint {
  id: string
  type: "exit" | "assembly" | "fire_extinguisher" | "first_aid" | "stairs"
  x: number
  y: number
  label: string
}

interface BuildingMapViewerProps {
  mapUrl: string
  floorName: string
  emergencyPoints?: EmergencyPoint[]
}

const mockEmergencyPoints: EmergencyPoint[] = [
  { id: "1", type: "exit", x: 15, y: 25, label: "Main Exit" },
  { id: "2", type: "exit", x: 85, y: 25, label: "Emergency Exit" },
  { id: "3", type: "assembly", x: 50, y: 10, label: "Assembly Point" },
  { id: "4", type: "fire_extinguisher", x: 30, y: 50, label: "Fire Extinguisher" },
  { id: "5", type: "fire_extinguisher", x: 70, y: 50, label: "Fire Extinguisher" },
  { id: "6", type: "first_aid", x: 50, y: 75, label: "First Aid Station" },
  { id: "7", type: "stairs", x: 20, y: 60, label: "Staircase A" },
  { id: "8", type: "stairs", x: 80, y: 60, label: "Staircase B" },
]

const pointTypeConfig = {
  exit: { icon: DoorOpen, color: "text-accent", bgColor: "bg-accent/20", label: "Emergency Exit" },
  assembly: { icon: Users, color: "text-primary", bgColor: "bg-primary/20", label: "Assembly Point" },
  fire_extinguisher: { icon: Shield, color: "text-secondary", bgColor: "bg-secondary/20", label: "Fire Extinguisher" },
  first_aid: { icon: AlertTriangle, color: "text-destructive", bgColor: "bg-destructive/20", label: "First Aid" },
  stairs: { icon: Stairs, color: "text-muted-foreground", bgColor: "bg-muted/40", label: "Staircase" },
}

export function BuildingMapViewer({
  mapUrl,
  floorName,
  emergencyPoints = mockEmergencyPoints,
}: BuildingMapViewerProps) {
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [selectedPoint, setSelectedPoint] = useState<EmergencyPoint | null>(null)
  const [showPoints, setShowPoints] = useState(true)
  const mapRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5))
  const handleReset = () => {
    setZoom(1)
    setRotation(0)
    setSelectedPoint(null)
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = mapUrl
    link.download = `${floorName}-floor-plan.jpg`
    link.click()
  }

  const handleFullscreen = () => {
    if (mapRef.current) {
      mapRef.current.requestFullscreen()
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{floorName}</h3>
              <Badge variant="secondary">Interactive View</Badge>
            </div>

            <div className="flex items-center gap-2">
              <Select value={showPoints ? "show" : "hide"} onValueChange={(value) => setShowPoints(value === "show")}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="show">Show Points</SelectItem>
                  <SelectItem value="hide">Hide Points</SelectItem>
                </SelectContent>
              </Select>

              <Separator orientation="vertical" className="h-6" />

              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-mono min-w-12 text-center">{Math.round(zoom * 100)}%</span>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>

              <Separator orientation="vertical" className="h-6" />

              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleFullscreen}>
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Map Viewer */}
        <div className="lg:col-span-3">
          <Card className="glass-strong overflow-hidden">
            <CardContent className="p-0">
              <div
                ref={mapRef}
                className="relative bg-muted/20 min-h-[500px] overflow-hidden cursor-move"
                style={{ height: "600px" }}
              >
                {/* Map Image */}
                <div
                  className="absolute inset-0 transition-transform duration-200 ease-out"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`,
                    transformOrigin: "center center",
                  }}
                >
                  <img
                    src={mapUrl || "/placeholder.svg"}
                    alt={`${floorName} floor plan`}
                    className="w-full h-full object-contain"
                    draggable={false}
                  />

                  {/* Emergency Points Overlay */}
                  {showPoints &&
                    emergencyPoints.map((point) => {
                      const config = pointTypeConfig[point.type]
                      const Icon = config.icon

                      return (
                        <button
                          key={point.id}
                          className={`absolute w-8 h-8 rounded-full ${config.bgColor} ${config.color} 
                          flex items-center justify-center border-2 border-background shadow-lg
                          hover:scale-110 transition-all duration-200 z-10
                          ${selectedPoint?.id === point.id ? "ring-2 ring-primary scale-110" : ""}`}
                          style={{
                            left: `${point.x}%`,
                            top: `${point.y}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                          onClick={() => setSelectedPoint(point)}
                        >
                          <Icon className="h-4 w-4" />
                        </button>
                      )
                    })}
                </div>

                {/* Zoom indicator */}
                <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>Zoom: {Math.round(zoom * 100)}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Points Legend & Details */}
        <div className="space-y-6">
          {/* Selected Point Details */}
          {selectedPoint && (
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle className="text-lg">Point Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const config = pointTypeConfig[selectedPoint.type]
                      const Icon = config.icon
                      return (
                        <div className={`p-2 rounded-lg ${config.bgColor}`}>
                          <Icon className={`h-5 w-5 ${config.color}`} />
                        </div>
                      )
                    })()}
                    <div>
                      <div className="font-medium">{selectedPoint.label}</div>
                      <div className="text-sm text-muted-foreground">{pointTypeConfig[selectedPoint.type].label}</div>
                    </div>
                  </div>

                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Position:</span>
                      <span className="font-mono">
                        {selectedPoint.x}%, {selectedPoint.y}%
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => setSelectedPoint(null)}
                  >
                    Close Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Legend */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Emergency Points Legend</CardTitle>
              <CardDescription>Click on points in the map to view details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(pointTypeConfig).map(([type, config]) => {
                  const Icon = config.icon
                  const count = emergencyPoints.filter((p) => p.type === type).length

                  return (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${config.bgColor}`}>
                          <Icon className={`h-4 w-4 ${config.color}`} />
                        </div>
                        <span className="text-sm">{config.label}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {count}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Safety Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Emergency Points</span>
                  <span className="font-semibold">{emergencyPoints.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Emergency Exits</span>
                  <span className="font-semibold text-accent">
                    {emergencyPoints.filter((p) => p.type === "exit").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Assembly Points</span>
                  <span className="font-semibold text-primary">
                    {emergencyPoints.filter((p) => p.type === "assembly").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Safety Equipment</span>
                  <span className="font-semibold text-secondary">
                    {emergencyPoints.filter((p) => p.type === "fire_extinguisher" || p.type === "first_aid").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
