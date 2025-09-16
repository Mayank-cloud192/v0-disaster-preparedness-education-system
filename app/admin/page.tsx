"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Settings,
  Building,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  BarChart3,
} from "lucide-react"

// Mock data for admin panel
const pendingRegistrations = [
  {
    id: "reg-001",
    institutionName: "St. Mary's High School",
    location: "Mumbai, Maharashtra",
    submittedDate: "2024-01-15",
    contactPerson: "Dr. Priya Sharma",
    studentCount: 850,
    status: "pending",
    documents: 3,
  },
  {
    id: "reg-002",
    institutionName: "Delhi Technical Institute",
    location: "New Delhi, Delhi",
    submittedDate: "2024-01-14",
    contactPerson: "Prof. Rajesh Kumar",
    studentCount: 1200,
    status: "under-review",
    documents: 5,
  },
  {
    id: "reg-003",
    institutionName: "Chennai Engineering College",
    location: "Chennai, Tamil Nadu",
    submittedDate: "2024-01-13",
    contactPerson: "Dr. Lakshmi Iyer",
    studentCount: 2500,
    status: "approved",
    documents: 4,
  },
]

const buildingMaps = [
  {
    id: "map-001",
    institutionName: "St. Mary's High School",
    floorName: "Ground Floor",
    uploadDate: "2024-01-15",
    status: "pending",
    fileSize: "2.4 MB",
    emergencyPoints: 8,
  },
  {
    id: "map-002",
    institutionName: "Delhi Technical Institute",
    floorName: "First Floor",
    uploadDate: "2024-01-14",
    status: "approved",
    fileSize: "3.1 MB",
    emergencyPoints: 12,
  },
  {
    id: "map-003",
    institutionName: "Chennai Engineering College",
    floorName: "Library Building",
    uploadDate: "2024-01-13",
    status: "rejected",
    fileSize: "1.8 MB",
    emergencyPoints: 6,
  },
]

const systemStats = [
  { label: "Total Institutions", value: "2,847", change: "+12%", trend: "up" },
  { label: "Pending Approvals", value: "23", change: "-8%", trend: "down" },
  { label: "Active Users", value: "15,247", change: "+25%", trend: "up" },
  { label: "System Uptime", value: "99.9%", change: "0%", trend: "stable" },
]

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-accent/20 text-accent"
      case "pending":
        return "bg-secondary/20 text-secondary"
      case "under-review":
        return "bg-primary/20 text-primary"
      case "rejected":
        return "bg-destructive/20 text-destructive"
      default:
        return "bg-muted/20 text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "under-review":
        return <Eye className="h-4 w-4" />
      case "rejected":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-balance">Admin Panel</h1>
        <p className="text-muted-foreground text-pretty mt-2">
          Manage institutions, verify building maps, and oversee system operations
        </p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-8">
        {systemStats.map((stat, index) => (
          <Card key={index} className="glass">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p
                    className={`text-sm flex items-center mt-1 ${
                      stat.trend === "up"
                        ? "text-accent"
                        : stat.trend === "down"
                          ? "text-destructive"
                          : "text-muted-foreground"
                    }`}
                  >
                    <BarChart3 className="h-3 w-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 glass">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="maps">Building Maps</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Activity */}
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system activities and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-lg bg-accent/20">
                    <CheckCircle className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Institution Approved</p>
                    <p className="text-xs text-muted-foreground">Chennai Engineering College - 2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-lg bg-secondary/20">
                    <FileText className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New Registration</p>
                    <p className="text-xs text-muted-foreground">St. Mary's High School - 4 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Building className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Building Map Uploaded</p>
                    <p className="text-xs text-muted-foreground">Delhi Technical Institute - 6 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Institution
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Review Pending Maps
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Manage User Roles
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export System Report
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* System Health */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Monitor system performance and resource usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Server Load</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Database Usage</span>
                    <span>67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage Usage</span>
                    <span>32%</span>
                  </div>
                  <Progress value={32} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Registrations Tab */}
        <TabsContent value="registrations" className="space-y-6">
          {/* Filters */}
          <Card className="glass">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search institutions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Registrations Table */}
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle>Institution Registrations</CardTitle>
              <CardDescription>Review and manage institution registration requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingRegistrations.map((registration) => (
                  <div
                    key={registration.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Building className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{registration.institutionName}</h4>
                        <p className="text-sm text-muted-foreground">{registration.location}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>Contact: {registration.contactPerson}</span>
                          <span>Students: {registration.studentCount.toLocaleString()}</span>
                          <span>Documents: {registration.documents}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(registration.status)}>
                        {getStatusIcon(registration.status)}
                        <span className="ml-1 capitalize">{registration.status.replace("-", " ")}</span>
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        {registration.status === "pending" && (
                          <>
                            <Button variant="outline" size="sm" className="text-accent bg-transparent">
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Building Maps Tab */}
        <TabsContent value="maps" className="space-y-6">
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle>Building Maps Review</CardTitle>
              <CardDescription>Review and approve uploaded building maps and floor plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {buildingMaps.map((map) => (
                  <div key={map.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-secondary/10">
                        <FileText className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{map.institutionName}</h4>
                        <p className="text-sm text-muted-foreground">{map.floorName}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>Size: {map.fileSize}</span>
                          <span>Emergency Points: {map.emergencyPoints}</span>
                          <span>Uploaded: {new Date(map.uploadDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(map.status)}>
                        {getStatusIcon(map.status)}
                        <span className="ml-1 capitalize">{map.status}</span>
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                        {map.status === "pending" && (
                          <>
                            <Button variant="outline" size="sm" className="text-accent bg-transparent">
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">User Management</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced user management features will be available in the next update.
                </p>
                <Button variant="outline" className="bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New User
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
