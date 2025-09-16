"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Users, Shield, AlertTriangle, TrendingUp, MapPin, School, GraduationCap } from "lucide-react"
import InteractiveIndiaMap from "@/components/interactive-india-map"

// Mock data for Indian states
const stateData = [
  {
    id: "maharashtra",
    name: "Maharashtra",
    institutions: 342,
    students: 125000,
    drills: 1250,
    preparedness: 85,
    color: "hsl(var(--chart-1))",
  },
  {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    institutions: 298,
    students: 98000,
    drills: 980,
    preparedness: 78,
    color: "hsl(var(--chart-2))",
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    institutions: 267,
    students: 89000,
    drills: 890,
    preparedness: 82,
    color: "hsl(var(--chart-3))",
  },
  {
    id: "karnataka",
    name: "Karnataka",
    institutions: 234,
    students: 76000,
    drills: 760,
    preparedness: 80,
    color: "hsl(var(--chart-4))",
  },
  {
    id: "gujarat",
    name: "Gujarat",
    institutions: 189,
    students: 65000,
    drills: 650,
    preparedness: 88,
    color: "hsl(var(--chart-5))",
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    institutions: 156,
    students: 54000,
    drills: 540,
    preparedness: 75,
    color: "hsl(var(--primary))",
  },
]

const overallStats = [
  { label: "Total Institutions", value: "2,847", change: "+12%", icon: Building, color: "text-primary" },
  { label: "Students Trained", value: "1.2M", change: "+18%", icon: Users, color: "text-accent" },
  { label: "Emergency Drills", value: "15,247", change: "+25%", icon: Shield, color: "text-secondary" },
  { label: "Avg. Preparedness", value: "81%", change: "+5%", icon: TrendingUp, color: "text-primary" },
]

export default function DashboardPage() {
  const [selectedState, setSelectedState] = useState<string | null>("all")
  const [viewMode, setViewMode] = useState<"overview" | "detailed">("overview")

  const selectedStateData =
    selectedState && selectedState !== "all" ? stateData.find((state) => state.id === selectedState) : null

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-balance">State-wise Dashboard</h1>
        <p className="text-muted-foreground text-pretty mt-2">
          Monitor disaster preparedness across educational institutions in India
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Select value={viewMode} onValueChange={(value: "overview" | "detailed") => setViewMode(value)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Select view mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overview">Overview</SelectItem>
            <SelectItem value="detailed">Detailed View</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            {stateData.map((state) => (
              <SelectItem key={state.id} value={state.id}>
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-8">
        {overallStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="glass">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.color} flex items-center mt-1`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-muted/50 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Interactive Map Section */}
        <div className="lg:col-span-2">
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                India Map - Institution Locations
              </CardTitle>
              <CardDescription>Click on markers to view institution details</CardDescription>
            </CardHeader>
            <CardContent>
              <InteractiveIndiaMap />
            </CardContent>
          </Card>
        </div>

        {/* State Details Panel */}
        <div>
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                {selectedStateData ? selectedStateData.name : "State Details"}
              </CardTitle>
              <CardDescription>
                {selectedStateData ? "Detailed preparedness statistics" : "Select a state to view details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedStateData ? (
                <div className="space-y-6">
                  {/* Preparedness Score */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Preparedness Score</span>
                      <span className="text-2xl font-bold text-primary">{selectedStateData.preparedness}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${selectedStateData.preparedness}%` }}
                      />
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        <School className="h-4 w-4 text-primary" />
                        <span className="text-sm">Institutions</span>
                      </div>
                      <span className="font-semibold">{selectedStateData.institutions.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-accent" />
                        <span className="text-sm">Students Trained</span>
                      </div>
                      <span className="font-semibold">{selectedStateData.students.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-secondary" />
                        <span className="text-sm">Emergency Drills</span>
                      </div>
                      <span className="font-semibold">{selectedStateData.drills.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-4">
                    <Button className="w-full" size="sm">
                      <Building className="h-4 w-4 mr-2" />
                      View Institutions
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Emergency Protocols
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Select a state from the map to view detailed statistics and preparedness metrics.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* State Comparison Table */}
      <Card className="glass mt-8">
        <CardHeader>
          <CardTitle>State Comparison</CardTitle>
          <CardDescription>Compare preparedness metrics across all states</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">State</th>
                  <th className="text-right py-3 px-4">Institutions</th>
                  <th className="text-right py-3 px-4">Students</th>
                  <th className="text-right py-3 px-4">Drills</th>
                  <th className="text-right py-3 px-4">Preparedness</th>
                </tr>
              </thead>
              <tbody>
                {stateData.map((state) => (
                  <tr
                    key={state.id}
                    className={`border-b hover:bg-muted/50 cursor-pointer ${
                      selectedState === state.id ? "bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedState(state.id)}
                  >
                    <td className="py-3 px-4 font-medium">{state.name}</td>
                    <td className="text-right py-3 px-4">{state.institutions.toLocaleString()}</td>
                    <td className="text-right py-3 px-4">{state.students.toLocaleString()}</td>
                    <td className="text-right py-3 px-4">{state.drills.toLocaleString()}</td>
                    <td className="text-right py-3 px-4">
                      <Badge variant="secondary" style={{ backgroundColor: `${state.color}20`, color: state.color }}>
                        {state.preparedness}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
