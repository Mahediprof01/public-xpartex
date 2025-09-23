"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Award, 
  Download, 
  Share2, 
  Calendar, 
  User, 
  GraduationCap,
  Star,
  Search,
  Filter,
  ExternalLink,
  CheckCircle,
  Clock
} from "lucide-react"

export default function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const certificates = [
    {
      id: 1,
      title: "Advanced React Development",
      instructor: "Sarah Johnson",
      institution: "TechEd Academy",
      completedDate: "2025-01-15",
      issueDate: "2025-01-16",
      credentialId: "REACT-ADV-2025-001",
      score: 92,
      duration: "40 hours",
      skills: ["React", "JavaScript", "Performance Optimization", "Testing"],
      status: "issued",
      certificateUrl: "/certificates/react-advanced.pdf",
      verificationUrl: "https://verify.teched.com/REACT-ADV-2025-001",
      thumbnail: "/certificate-react.jpg"
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      instructor: "Mike Chen",
      institution: "CodeMaster Institute",
      completedDate: "2024-12-20",
      issueDate: "2024-12-21",
      credentialId: "JS-FUND-2024-156",
      score: 88,
      duration: "25 hours",
      skills: ["JavaScript", "ES6+", "DOM Manipulation", "Async Programming"],
      status: "issued",
      certificateUrl: "/certificates/js-fundamentals.pdf",
      verificationUrl: "https://verify.codemaster.com/JS-FUND-2024-156",
      thumbnail: "/certificate-js.jpg"
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      instructor: "Emma Wilson",
      institution: "Design Pro Academy",
      completedDate: "2025-01-10",
      issueDate: null,
      credentialId: null,
      score: 95,
      duration: "30 hours",
      skills: ["UI Design", "UX Research", "Prototyping", "User Testing"],
      status: "processing",
      certificateUrl: null,
      verificationUrl: null,
      thumbnail: "/certificate-design.jpg"
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      instructor: "David Rodriguez",
      institution: "ServerSide Academy",
      completedDate: null,
      issueDate: null,
      credentialId: null,
      score: null,
      duration: "35 hours",
      skills: ["Node.js", "Express", "MongoDB", "API Development"],
      status: "in-progress",
      progress: 75,
      certificateUrl: null,
      verificationUrl: null,
      thumbnail: "/certificate-nodejs.jpg"
    }
  ]

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.institution.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = selectedFilter === "all" || cert.status === selectedFilter
    
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'issued':
        return <CheckCircle className="h-4 w-4" />
      case 'processing':
        return <Clock className="h-4 w-4" />
      case 'in-progress':
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">My Certificates</h1>
        <p className="text-purple-100">View and download your earned certificates</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600">Earned</p>
                <p className="text-xl font-bold text-green-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-yellow-600">Processing</p>
                <p className="text-xl font-bold text-yellow-900">1</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600">In Progress</p>
                <p className="text-xl font-bold text-blue-900">1</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600">Avg Score</p>
                <p className="text-xl font-bold text-purple-900">90%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["all", "issued", "processing", "in-progress"].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className="capitalize"
                >
                  {filter === "all" ? "All" : filter.replace("-", " ")}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificates Grid */}
      <div className="grid gap-6">
        {filteredCertificates.map((certificate) => (
          <Card key={certificate.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Certificate Thumbnail */}
                <div className="lg:w-48 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300">
                  <div className="text-center">
                    <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-blue-600 font-medium">Certificate</p>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{certificate.title}</h3>
                      <p className="text-gray-600">by {certificate.instructor} • {certificate.institution}</p>
                    </div>
                    <Badge className={`${getStatusColor(certificate.status)} flex items-center gap-1`}>
                      {getStatusIcon(certificate.status)}
                      {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1).replace("-", " ")}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {certificate.completedDate && (
                      <div>
                        <p className="text-gray-500">Completed</p>
                        <p className="font-medium">{certificate.completedDate}</p>
                      </div>
                    )}
                    {certificate.score && (
                      <div>
                        <p className="text-gray-500">Score</p>
                        <p className="font-medium text-green-600">{certificate.score}%</p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p className="font-medium">{certificate.duration}</p>
                    </div>
                    {certificate.credentialId && (
                      <div>
                        <p className="text-gray-500">Credential ID</p>
                        <p className="font-medium text-xs">{certificate.credentialId}</p>
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Skills Covered</p>
                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Progress for in-progress certificates */}
                  {certificate.status === 'in-progress' && certificate.progress && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{certificate.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${certificate.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {certificate.status === 'issued' && (
                      <>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        {certificate.verificationUrl && (
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Verify
                          </Button>
                        )}
                      </>
                    )}
                    {certificate.status === 'processing' && (
                      <Button size="sm" variant="outline" disabled>
                        <Clock className="h-4 w-4 mr-2" />
                        Processing...
                      </Button>
                    )}
                    {certificate.status === 'in-progress' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Continue Course
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No certificates found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedFilter !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "Complete courses to earn your first certificate"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
