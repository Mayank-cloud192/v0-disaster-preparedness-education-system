"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BuildingMapViewer } from "@/components/building-map-viewer"
import { Building, Upload, Eye, Edit, Trash2, Plus } from "lucide-react"

// Mock data for building maps
const mockBuildings = [
  {
    id: "main-building",
    name: "Main Academic Building",
    floors: [
      {
        id: "ground-floor",
        name: "Ground Floor",
        mapUrl: "/placeholder.svg?height=600&width=800&text=Ground+Floor+Plan",
        uploadDate: "2024-01-15",
        status: "approved",
      },
      {
        id: "first-floor",
        name: "First Floor",
        mapUrl: "/placeholder.svg?height=600&width=800&text=First+Floor+Plan",
        uploadDate: "2024-01-15",
        status: "approved",
      },
      {
        id: "second-floor",
        name: "Second Floor",
        mapUrl: "/placeholder.svg?height=600&width=800&text=Second+Floor+Plan",
        uploadDate: "2024-01-15",
        status: "pending",
      },
    ],
  },
  {
    id: "library-building",
    name: "Library Building",
    floors: [
      {
        id: "lib-ground",
        name: "Ground Floor",
        mapUrl: "/placeholder.svg?height=600&width=800&text=Library+Ground+Floor",
        uploadDate: "2024-01-20",
        status: "approved",
      },
    ],
  },
]

export default function MapsPage() {
  const [selectedBuilding, setSelectedBuilding] = useState(mockBuildings[0].id)
  const [selectedFloor, setSelectedFloor] = useState(mockBuildings[0].floors[0].id)
  const [viewMode, setViewMode] = useState<"list" | "viewer">("list")

  const currentBuilding = mockBuildings.find((b) => b.id === selectedBuilding)
  const currentFloor = currentBuilding?.floors.find((f) => f.id === selectedFloor)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-accent/20 text-accent"
      case "pending":
        return "bg-secondary/20 text-secondary"
      case "rejected":
        return "bg-destructive/20 text-destructive"
      default:
        return "bg-muted/20 text-muted-foreground"
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-balance">Building Maps & Floor Plans</h1>
        <p className="text-muted-foreground text-pretty mt-2">
          View and manage your institution's building maps and emergency evacuation plans
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Select value={viewMode} onValueChange={(value: "list" | "viewer") => setViewMode(value)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Select view mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="list">List View</SelectItem>
            <SelectItem value="viewer">Map Viewer</SelectItem>
          </SelectContent>
        </Select>

        {viewMode === "viewer" && (
          <>
            <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select building" />
              </SelectTrigger>
              <SelectContent>
                {mockBuildings.map((building) => (
                  <SelectItem key={building.id} value={building.id}>
                    {building.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedFloor} onValueChange={setSelectedFloor}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select floor" />
              </SelectTrigger>
              <SelectContent>
                {currentBuilding?.floors.map((floor) => (
                  <SelectItem key={floor.id} value={floor.id}>
                    {floor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}

        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Upload New Map
        </Button>
      </div>

      {/* Content */}
      {viewMode === "list" ? (
        /* List View */
        <div className="space-y-6">
          {mockBuildings.map((building) => (
            <Card key={building.id} className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      {building.name}
                    </CardTitle>
                    <CardDescription>
                      {building.floors.length} floor{building.floors.length !== 1 ? "s" : ""} mapped
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Add Floor
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {building.floors.map((floor) => (
                    <Card key={floor.id} className="glass-strong">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{floor.name}</h4>
                            <Badge className={getStatusColor(floor.status)}>{floor.status}</Badge>
                          </div>

                          <div className="aspect-video bg-muted/20 rounded-lg overflow-hidden">
                            <img
                              src={floor.mapUrl || "/placeholder.svg"}
                              alt={`${floor.name} plan`}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="text-xs text-muted-foreground">
                            Uploaded: {new Date(floor.uploadDate).toLocaleDateString()}
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 bg-transparent"
                              onClick={() => {
                                setSelectedBuilding(building.id)
                                setSelectedFloor(floor.id)
                                setViewMode("viewer")
                              }}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Viewer Mode */
        currentFloor && (
          <BuildingMapViewer
            mapUrl={currentFloor.mapUrl}
            floorName={`${currentBuilding?.name} - ${currentFloor.name}`}
          />
        )
      )}
    </div>
  )
}
