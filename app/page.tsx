"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"

const stats = [
  { label: "Registered Institutions", value: "2,847" },
  { label: "Students Trained", value: "1.2M+" },
  { label: "States Covered", value: "28" },
  { label: "Emergency Drills", value: "15,000+" },
]

const features = [
  {
    title: "State-wise Dashboard",
    description:
      "Interactive map showing disaster preparedness coverage across all Indian states with real-time statistics.",
  },
  {
    title: "Institution Registration",
    description: "Easy registration process for schools and colleges with building map uploads and safety assessments.",
  },
  {
    title: "Learning Modules",
    description:
      "Comprehensive disaster preparedness courses, emergency protocols, and interactive training materials.",
  },
  {
    title: "Emergency Response",
    description: "Real-time emergency alerts, evacuation procedures, and coordination with local authorities.",
  },
]

const testimonials = [
  {
    name: "Dr. Priya Sharma",
    role: "Principal, Delhi Public School",
    content:
      "This platform has transformed how we approach disaster preparedness. Our students are now confident and well-trained for any emergency situation.",
  },
  {
    name: "Prof. Rajesh Kumar",
    role: "Safety Officer, IIT Mumbai",
    content:
      "The comprehensive modules and interactive training have significantly improved our institution's emergency response capabilities.",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="backdrop-blur-lg bg-background/95 border border-border/60 shadow-2xl">
              <CardContent className="py-16">
                <div className="mx-auto max-w-4xl text-center">
                  <Badge
                    variant="secondary"
                    className="mb-6 bg-orange-500/90 text-white border-orange-400/30 backdrop-blur-sm"
                  >
                    ⚠️ Emergency Preparedness for Educational Institutions
                  </Badge>

                  <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl text-foreground">
                    <span className="text-foreground">Building Safer</span>
                    <span className="text-blue-400"> Schools</span> <span className="text-foreground">&</span>
                    <span className="text-orange-400"> Colleges</span>
                  </h1>

                  <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty max-w-2xl mx-auto">
                    Comprehensive disaster preparedness and response education system designed specifically for
                    educational institutions across India. Train, prepare, and protect your students with our
                    cutting-edge platform.
                  </p>

                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/register">
                      <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                        🏢 Register Your Institution →
                      </Button>
                    </Link>
                    <Link href="/modules">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto bg-background/90 border-border hover:bg-background text-foreground"
                      >
                        📚 Explore Resources
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="glass-strong border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="glass mb-16 border-white/10">
              <CardContent className="py-8">
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                    Comprehensive Emergency Preparedness Platform
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground text-pretty">
                    Everything your institution needs to build a robust disaster response system
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="glass-strong border-white/10 hover:border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105"
                >
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-300">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-pretty text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="glass mb-16 border-white/10">
              <CardContent className="py-8">
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                    Trusted by Educational Leaders
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground text-pretty">
                    See how institutions across India are transforming their emergency preparedness
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-2">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="glass-strong border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 backdrop-blur-sm">
                        🏆
                      </div>
                      <div className="flex-1">
                        <p className="text-pretty mb-4 text-muted-foreground">"{testimonial.content}"</p>
                        <div>
                          <div className="font-semibold text-blue-300">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="glass-strong border-white/10 shadow-2xl">
              <CardContent className="py-16 text-center">
                <div className="mx-auto max-w-2xl">
                  <div className="text-6xl mb-6">🎯</div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance mb-4">
                    Ready to Enhance Your Institution's Safety?
                  </h2>
                  <p className="text-lg text-muted-foreground text-pretty mb-8">
                    Join thousands of educational institutions across India in building a safer, more prepared learning
                    environment.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/register">
                      <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                        🏢 Get Started Today
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto bg-background/90 border-border hover:bg-background text-foreground"
                      >
                        🗺️ View Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
