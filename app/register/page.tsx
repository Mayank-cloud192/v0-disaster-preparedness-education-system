"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Building, Upload, MapPin, FileText, CheckCircle, AlertCircle } from "lucide-react"

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Puducherry",
]

const institutionTypes = [
  "Primary School",
  "Secondary School",
  "Higher Secondary School",
  "College",
  "University",
  "Technical Institute",
  "Vocational Training Center",
  "Other",
]

interface FormData {
  institutionName: string
  institutionType: string
  address: string
  city: string
  state: string
  pincode: string
  contactPerson: string
  email: string
  phone: string
  studentCount: string
  staffCount: string
  buildingFloors: string
  hasEmergencyPlan: boolean
  hasSafetyEquipment: boolean
  conductsDrills: boolean
  description: string
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    institutionName: "",
    institutionType: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    contactPerson: "",
    email: "",
    phone: "",
    studentCount: "",
    staffCount: "",
    buildingFloors: "",
    hasEmergencyPlan: false,
    hasSafetyEquipment: false,
    conductsDrills: false,
    description: "",
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setUploadedFiles((prev) => [...prev, ...Array.from(files)])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", formData, uploadedFiles)
    alert("Registration submitted successfully! You will receive a confirmation email shortly.")
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-balance">Register Your Institution</h1>
        <p className="text-muted-foreground text-pretty mt-2">
          Join the disaster preparedness network and enhance your institution's safety
        </p>
      </div>

      {/* Progress Bar */}
      <Card className="glass mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Registration Progress</span>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Basic Info</span>
            <span>Contact Details</span>
            <span>Safety Assessment</span>
            <span>Documents</span>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-2xl mx-auto">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Basic Institution Information
              </CardTitle>
              <CardDescription>Provide basic details about your educational institution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="institutionName">Institution Name *</Label>
                <Input
                  id="institutionName"
                  placeholder="Enter your institution name"
                  value={formData.institutionName}
                  onChange={(e) => handleInputChange("institutionName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="institutionType">Institution Type *</Label>
                <Select
                  value={formData.institutionType}
                  onValueChange={(value) => handleInputChange("institutionType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select institution type" />
                  </SelectTrigger>
                  <SelectContent>
                    {institutionTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentCount">Number of Students *</Label>
                  <Input
                    id="studentCount"
                    type="number"
                    placeholder="e.g., 500"
                    value={formData.studentCount}
                    onChange={(e) => handleInputChange("studentCount", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="staffCount">Number of Staff *</Label>
                  <Input
                    id="staffCount"
                    type="number"
                    placeholder="e.g., 50"
                    value={formData.staffCount}
                    onChange={(e) => handleInputChange("staffCount", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="buildingFloors">Number of Building Floors *</Label>
                <Input
                  id="buildingFloors"
                  type="number"
                  placeholder="e.g., 3"
                  value={formData.buildingFloors}
                  onChange={(e) => handleInputChange("buildingFloors", e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={nextStep}>Next Step</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Contact & Location */}
        {currentStep === 2 && (
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Contact & Location Details
              </CardTitle>
              <CardDescription>Provide contact information and location details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">Complete Address *</Label>
                <Textarea
                  id="address"
                  placeholder="Enter complete address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="Enter city name"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code *</Label>
                  <Input
                    id="pincode"
                    placeholder="e.g., 110001"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange("pincode", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person Name *</Label>
                <Input
                  id="contactPerson"
                  placeholder="Enter contact person name"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@institution.edu"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Previous
                </Button>
                <Button onClick={nextStep}>Next Step</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Safety Assessment */}
        {currentStep === 3 && (
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Current Safety Assessment
              </CardTitle>
              <CardDescription>Help us understand your current disaster preparedness status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasEmergencyPlan"
                    checked={formData.hasEmergencyPlan}
                    onCheckedChange={(checked) => handleInputChange("hasEmergencyPlan", checked as boolean)}
                  />
                  <Label htmlFor="hasEmergencyPlan" className="text-sm">
                    We have a documented emergency response plan
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasSafetyEquipment"
                    checked={formData.hasSafetyEquipment}
                    onCheckedChange={(checked) => handleInputChange("hasSafetyEquipment", checked as boolean)}
                  />
                  <Label htmlFor="hasSafetyEquipment" className="text-sm">
                    We have basic safety equipment (fire extinguishers, first aid kits, etc.)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="conductsDrills"
                    checked={formData.conductsDrills}
                    onCheckedChange={(checked) => handleInputChange("conductsDrills", checked as boolean)}
                  />
                  <Label htmlFor="conductsDrills" className="text-sm">
                    We regularly conduct emergency drills
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Additional Information</Label>
                <Textarea
                  id="description"
                  placeholder="Describe any existing safety measures, concerns, or special requirements..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Safety Score Preview</h4>
                <div className="flex items-center gap-2">
                  <Progress
                    value={
                      (Number(formData.hasEmergencyPlan) +
                        Number(formData.hasSafetyEquipment) +
                        Number(formData.conductsDrills)) *
                      33.33
                    }
                    className="flex-1"
                  />
                  <span className="text-sm font-medium">
                    {Math.round(
                      (Number(formData.hasEmergencyPlan) +
                        Number(formData.hasSafetyEquipment) +
                        Number(formData.conductsDrills)) *
                        33.33,
                    )}
                    %
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Based on your current safety measures</p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Previous
                </Button>
                <Button onClick={nextStep}>Next Step</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Document Upload */}
        {currentStep === 4 && (
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Documents
              </CardTitle>
              <CardDescription>Upload building maps, floor plans, and other relevant documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload Building Maps & Floor Plans</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supported formats: PDF, JPG, PNG (Max 10MB per file)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </Label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Uploaded Files:</h4>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">{file.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {(file.size / 1024 / 1024).toFixed(1)} MB
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium text-accent">Ready to Submit</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your registration will be reviewed within 2-3 business days. You'll receive email updates on the
                      status.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Previous
                </Button>
                <Button onClick={handleSubmit} className="bg-accent hover:bg-accent/90">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Registration
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
