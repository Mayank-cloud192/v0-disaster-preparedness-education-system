"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Play,
  Clock,
  Users,
  Award,
  Search,
  CheckCircle,
  Shield,
  Heart,
  Waves,
  Wind,
  Flame,
  Mountain,
} from "lucide-react"

const disasterTypes = [
  { id: "earthquake", name: "Earthquake", icon: Mountain, color: "text-chart-1" },
  { id: "fire", name: "Fire Emergency", icon: Flame, color: "text-secondary" },
  { id: "flood", name: "Flood", icon: Waves, color: "text-chart-2" },
  { id: "cyclone", name: "Cyclone", icon: Wind, color: "text-chart-3" },
  { id: "medical", name: "Medical Emergency", icon: Heart, color: "text-destructive" },
  { id: "security", name: "Security Threat", icon: Shield, color: "text-primary" },
]

const learningModules = [
  {
    id: "earthquake-basics",
    title: "Earthquake Preparedness Fundamentals",
    description:
      "Learn the basics of earthquake safety, including drop-cover-hold techniques and building evacuation procedures.",
    category: "earthquake",
    difficulty: "Beginner",
    duration: "45 min",
    participants: 1247,
    rating: 4.8,
    progress: 0,
    status: "available",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Earthquake+Safety",
    lessons: 8,
    certificate: true,
  },
  {
    id: "fire-safety-advanced",
    title: "Advanced Fire Safety & Evacuation",
    description:
      "Comprehensive fire safety training including fire types, extinguisher usage, and emergency evacuation leadership.",
    category: "fire",
    difficulty: "Advanced",
    duration: "90 min",
    participants: 892,
    rating: 4.9,
    progress: 65,
    status: "in-progress",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Fire+Safety",
    lessons: 12,
    certificate: true,
  },
  {
    id: "first-aid-basics",
    title: "Basic First Aid & CPR",
    description:
      "Essential first aid skills including CPR, wound care, and emergency response for common medical situations.",
    category: "medical",
    difficulty: "Beginner",
    duration: "60 min",
    participants: 2156,
    rating: 4.7,
    progress: 100,
    status: "completed",
    thumbnail: "/placeholder.svg?height=200&width=300&text=First+Aid",
    lessons: 10,
    certificate: true,
  },
  {
    id: "flood-response",
    title: "Flood Emergency Response",
    description:
      "Learn how to respond to flood emergencies, including evacuation procedures and water safety protocols.",
    category: "flood",
    difficulty: "Intermediate",
    duration: "50 min",
    participants: 634,
    rating: 4.6,
    progress: 0,
    status: "available",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Flood+Response",
    lessons: 9,
    certificate: true,
  },
  {
    id: "cyclone-preparedness",
    title: "Cyclone & Storm Preparedness",
    description:
      "Comprehensive guide to preparing for and responding to cyclones, including early warning systems and shelter protocols.",
    category: "cyclone",
    difficulty: "Intermediate",
    duration: "70 min",
    participants: 445,
    rating: 4.5,
    progress: 0,
    status: "available",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Cyclone+Safety",
    lessons: 11,
    certificate: true,
  },
  {
    id: "security-protocols",
    title: "Campus Security & Threat Response",
    description:
      "Learn to identify and respond to security threats, including lockdown procedures and emergency communication.",
    category: "security",
    difficulty: "Advanced",
    duration: "80 min",
    participants: 723,
    rating: 4.8,
    progress: 30,
    status: "in-progress",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Security+Protocols",
    lessons: 14,
    certificate: true,
  },
]

export default function ModulesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredModules = learningModules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || module.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || module.difficulty === selectedDifficulty
    const matchesStatus = selectedStatus === "all" || module.status === selectedStatus

    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-accent" />
      case "in-progress":
        return <Play className="h-4 w-4 text-secondary" />
      default:
        return <BookOpen className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-accent/20 text-accent"
      case "in-progress":
        return "bg-secondary/20 text-secondary"
      default:
        return "bg-muted/20 text-muted-foreground"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-accent/20 text-accent"
      case "Intermediate":
        return "bg-secondary/20 text-secondary"
      case "Advanced":
        return "bg-destructive/20 text-destructive"
      default:
        return "bg-muted/20 text-muted-foreground"
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-balance">Learning Modules</h1>
        <p className="text-muted-foreground text-pretty mt-2">
          Comprehensive disaster preparedness training modules for educational institutions
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-8">
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Modules</p>
                <p className="text-2xl font-bold">{learningModules.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-accent">
                  {learningModules.filter((m) => m.status === "completed").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-secondary">
                  {learningModules.filter((m) => m.status === "in-progress").length}
                </p>
              </div>
              <Play className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Certificates</p>
                <p className="text-2xl font-bold text-primary">
                  {learningModules.filter((m) => m.certificate && m.status === "completed").length}
                </p>
              </div>
              <Award className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search modules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {disasterTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Disaster Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Disaster Categories</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {disasterTypes.map((type) => {
            const Icon = type.icon
            const moduleCount = learningModules.filter((m) => m.category === type.id).length

            return (
              <Card
                key={type.id}
                className={`glass cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${
                  selectedCategory === type.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedCategory(selectedCategory === type.id ? "all" : type.id)}
              >
                <CardContent className="pt-6 text-center">
                  <div
                    className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50 ${type.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-sm">{type.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{moduleCount} modules</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Learning Modules Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredModules.map((module) => {
          const categoryType = disasterTypes.find((t) => t.id === module.category)
          const CategoryIcon = categoryType?.icon || BookOpen

          return (
            <Card
              key={module.id}
              className="glass-strong hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={module.thumbnail || "/placeholder.svg"}
                  alt={module.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CategoryIcon className={`h-4 w-4 ${categoryType?.color || "text-muted-foreground"}`} />
                    <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                  </div>
                  <Badge className={getStatusColor(module.status)}>
                    {getStatusIcon(module.status)}
                    <span className="ml-1 capitalize">{module.status.replace("-", " ")}</span>
                  </Badge>
                </div>

                <CardTitle className="text-lg text-balance">{module.title}</CardTitle>
                <CardDescription className="text-pretty">{module.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Bar (if in progress or completed) */}
                {module.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>
                )}

                {/* Module Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{module.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{module.participants.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>★ {module.rating}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full" variant={module.status === "completed" ? "outline" : "default"}>
                  {module.status === "completed" ? (
                    <>
                      <Award className="h-4 w-4 mr-2" />
                      View Certificate
                    </>
                  ) : module.status === "in-progress" ? (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </>
                  ) : (
                    <>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start Module
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* No Results */}
      {filteredModules.length === 0 && (
        <Card className="glass text-center py-12">
          <CardContent>
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No modules found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or browse all available modules.</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedDifficulty("all")
                setSelectedStatus("all")
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
