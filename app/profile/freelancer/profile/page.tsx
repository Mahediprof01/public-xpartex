"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  User,
  MapPin,
  Globe,
  Star,
  Plus,
  X,
  Upload,
  Edit,
  Save,
  Eye,
  Camera,
  Briefcase,
  GraduationCap,
  Award,
  Link as LinkIcon
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock profile data
const profileData = {
  personal: {
    fullName: "Alex Johnson",
    title: "Full-Stack Developer & UI/UX Designer",
    location: "New York, NY, USA",
    hourlyRate: "$45",
    availability: "Available 30+ hrs/week",
    profileImage: "",
    bio: "Passionate full-stack developer with 5+ years of experience in creating modern web applications for fashion and textile industries. I specialize in React, Node.js, and creating beautiful user experiences that drive business results.",
    languages: ["English (Native)", "Spanish (Conversational)", "French (Basic)"]
  },
  skills: [
    { name: "React", level: "Expert", years: 4 },
    { name: "Node.js", level: "Expert", years: 4 },
    { name: "TypeScript", level: "Advanced", years: 3 },
    { name: "UI/UX Design", level: "Advanced", years: 3 },
    { name: "MongoDB", level: "Intermediate", years: 2 },
    { name: "Python", level: "Intermediate", years: 2 }
  ],
  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "New York University",
      year: "2019",
      description: "Focused on software engineering and web development"
    },
    {
      degree: "UX Design Certificate",
      institution: "Google Career Certificate",
      year: "2020",
      description: "Comprehensive UX design methodology and tools"
    }
  ],
  experience: [
    {
      title: "Senior Full-Stack Developer",
      company: "TechStyle Solutions",
      period: "2022 - Present",
      description: "Lead developer for e-commerce platforms in fashion industry. Built scalable React applications serving 100k+ users."
    },
    {
      title: "Frontend Developer",
      company: "Digital Fashion Co",
      period: "2020 - 2022",
      description: "Developed responsive web applications for fashion brands. Specialized in modern UI frameworks and design systems."
    }
  ],
  portfolio: [
    {
      id: 1,
      title: "Fashion E-commerce Platform",
      description: "Complete e-commerce solution for fashion brands with modern UI and advanced filtering",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/placeholder.jpg",
      link: "https://example.com"
    },
    {
      id: 2,
      title: "Textile Supply Chain Dashboard",
      description: "Real-time dashboard for tracking textile manufacturing and supply chain operations",
      technologies: ["Vue.js", "Laravel", "MySQL", "Chart.js"],
      image: "/placeholder.jpg",
      link: "https://example.com"
    },
    {
      id: 3,
      title: "Fashion Brand Mobile App",
      description: "Mobile app design and development for sustainable fashion brand",
      technologies: ["React Native", "Firebase", "Figma"],
      image: "/placeholder.jpg",
      link: "https://example.com"
    }
  ],
  certifications: [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      year: "2023",
      credentialId: "AWS-DEV-2023-001"
    },
    {
      name: "Google UX Design Certificate",
      issuer: "Google",
      year: "2020",
      credentialId: "GOOGLE-UX-2020-045"
    }
  ],
  stats: {
    completedProjects: 47,
    clientRating: 4.9,
    responseTime: "< 2 hours",
    repeatClients: "85%"
  }
}

export default function FreelancerProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profileData)
  const [newSkill, setNewSkill] = useState("")
  const [newSkillLevel, setNewSkillLevel] = useState("Beginner")

  const handleSave = () => {
    console.log("Saving profile:", editedProfile)
    setIsEditing(false)
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      const skill = {
        name: newSkill,
        level: newSkillLevel,
        years: 1
      }
      setEditedProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }))
      setNewSkill("")
      setNewSkillLevel("Beginner")
    }
  }

  const removeSkill = (index: number) => {
    setEditedProfile(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  const getSkillColor = (level: string) => {
    switch (level) {
      case "Expert": return "bg-green-100 text-green-700"
      case "Advanced": return "bg-blue-100 text-blue-700"
      case "Intermediate": return "bg-yellow-100 text-yellow-700"
      case "Beginner": return "bg-gray-100 text-gray-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Freelancer Profile</h1>
          <p className="text-gray-600 mt-1">Showcase your skills and experience to attract clients</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview Public Profile
          </Button>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-blue-500 text-white text-2xl font-bold">
                  AJ
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={editedProfile.personal.fullName}
                        onChange={(e) => setEditedProfile(prev => ({
                          ...prev,
                          personal: { ...prev.personal, fullName: e.target.value }
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        value={editedProfile.personal.title}
                        onChange={(e) => setEditedProfile(prev => ({
                          ...prev,
                          personal: { ...prev.personal, title: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={editedProfile.personal.location}
                        onChange={(e) => setEditedProfile(prev => ({
                          ...prev,
                          personal: { ...prev.personal, location: e.target.value }
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hourlyRate">Hourly Rate</Label>
                      <Input
                        id="hourlyRate"
                        value={editedProfile.personal.hourlyRate}
                        onChange={(e) => setEditedProfile(prev => ({
                          ...prev,
                          personal: { ...prev.personal, hourlyRate: e.target.value }
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="availability">Availability</Label>
                      <Input
                        id="availability"
                        value={editedProfile.personal.availability}
                        onChange={(e) => setEditedProfile(prev => ({
                          ...prev,
                          personal: { ...prev.personal, availability: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      value={editedProfile.personal.bio}
                      onChange={(e) => setEditedProfile(prev => ({
                        ...prev,
                        personal: { ...prev.personal, bio: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{profileData.personal.fullName}</h2>
                  <p className="text-lg text-blue-600 mb-3">{profileData.personal.title}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{profileData.personal.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{profileData.stats.clientRating}</span>
                      <span>({profileData.stats.completedProjects} projects)</span>
                    </div>
                    <div>
                      <span className="font-medium text-green-600">{profileData.personal.hourlyRate}/hour</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{profileData.personal.bio}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{profileData.personal.availability}</Badge>
                    <Badge variant="secondary">Response: {profileData.stats.responseTime}</Badge>
                    <Badge variant="secondary">{profileData.stats.repeatClients} repeat clients</Badge>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            Skills & Expertise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(isEditing ? editedProfile.skills : profileData.skills).map((skill, index) => (
                <div key={index} className="relative group">
                  <Badge className={`${getSkillColor(skill.level)} flex items-center gap-1`}>
                    {skill.name} ({skill.level})
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(index)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                </div>
              ))}
            </div>
            
            {isEditing && (
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label htmlFor="newSkill">Add Skill</Label>
                  <Input
                    id="newSkill"
                    placeholder="e.g., React, Python, UI Design"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Level</Label>
                  <Select value={newSkillLevel} onValueChange={setNewSkillLevel}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={addSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Portfolio
            </CardTitle>
            {isEditing && (
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileData.portfolio.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <Camera className="h-8 w-8" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <LinkIcon className="h-3 w-3 mr-2" />
                    View Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Work Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profileData.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-blue-200 pl-4">
                <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                <p className="text-blue-600 font-medium">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                <p className="text-sm text-gray-700">{exp.description}</p>
              </div>
            ))}
            {isEditing && (
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Education & Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              Education & Certifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Education</h4>
              {profileData.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <p className="text-blue-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500 mb-1">{edu.year}</p>
                  <p className="text-sm text-gray-700">{edu.description}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Certifications</h4>
              {profileData.certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-yellow-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-600">{cert.issuer} • {cert.year}</p>
                    <p className="text-xs text-gray-500">ID: {cert.credentialId}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {isEditing && (
              <div className="space-y-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Certification
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}