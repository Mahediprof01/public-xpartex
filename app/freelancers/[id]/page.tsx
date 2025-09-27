"use client"

import { motion } from "framer-motion"
import { notFound } from "next/navigation"
import { 
  Star, 
  MapPin, 
  Clock, 
  Badge, 
  MessageCircle, 
  Heart,
  Share2,
  Award,
  CheckCircle,
  Calendar,
  DollarSign,
  Users,
  Briefcase,
  Globe,
  Phone,
  Mail
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Mock data for freelancer profile
const getFreelancerData = (id: string) => {
  const freelancers = {
    "1": {
      id: "1",
      name: "Sarah Ahmed",
      title: "Senior Fashion Designer",
      avatar: "/placeholder-user.jpg",
      coverImage: "/placeholder.jpg",
      location: "Dhaka, Bangladesh",
      rating: 4.9,
      reviewCount: 127,
      hourlyRate: 45,
      completedJobs: 89,
      totalEarnings: 78500,
      responseTime: "Within 2 hours",
      skills: [
        { name: "Fashion Design", level: 95 },
        { name: "Adobe Illustrator", level: 90 },
        { name: "Pattern Making", level: 85 },
        { name: "Trend Analysis", level: 88 },
        { name: "3D Design", level: 75 }
      ],
      languages: ["English (Fluent)", "Bengali (Native)", "Hindi (Basic)"],
      isOnline: true,
      lastActive: "Online now",
      joinedDate: "January 2022",
      verified: true,
      topRated: true,
      description: "Experienced fashion designer with 8+ years in the garment industry. Specialized in women's apparel and sustainable fashion solutions. I've worked with international brands and helped launch over 50 successful collections.",
      experience: [
        {
          title: "Senior Fashion Designer",
          company: "Apex Textiles Ltd.",
          duration: "2020 - Present",
          description: "Leading design team for women's ready-to-wear collections. Increased sales by 35% through innovative designs."
        },
        {
          title: "Fashion Designer",
          company: "Creative Fashions",
          duration: "2018 - 2020",
          description: "Designed seasonal collections for multiple brands. Specialized in sustainable fashion approaches."
        }
      ],
      portfolio: [
        {
          id: "1",
          title: "Summer Collection 2024",
          image: "/placeholder.jpg",
          description: "Sustainable women's wear collection featuring organic cotton and innovative dyeing techniques."
        },
        {
          id: "2",
          title: "Corporate Uniforms Design",
          image: "/placeholder.jpg",
          description: "Professional uniform designs for major banking corporation, focusing on comfort and style."
        },
        {
          id: "3",
          title: "Traditional Fusion Wear",
          image: "/placeholder.jpg",
          description: "Modern interpretation of traditional Bangladeshi garments for international market."
        }
      ],
      reviews: [
        {
          id: "1",
          name: "John Smith",
          company: "Fashion House Ltd.",
          rating: 5,
          comment: "Sarah's design work exceeded our expectations. Professional, creative, and delivered on time. Highly recommended!",
          date: "2 weeks ago"
        },
        {
          id: "2",
          name: "Maria Rodriguez",
          company: "Trendy Apparel",
          rating: 5,
          comment: "Exceptional attention to detail and great communication throughout the project. Will definitely work with her again.",
          date: "1 month ago"
        }
      ]
    }
  }
  
  return freelancers[id as keyof typeof freelancers]
}

export default async function FreelancerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const freelancer = getFreelancerData(resolvedParams.id)

  if (!freelancer) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Section */}
      <div className="relative h-64 bg-gradient-to-br from-sky-400 to-blue-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end gap-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                  <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
                  <AvatarFallback>{freelancer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                {freelancer.isOnline && (
                  <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-green-500 border-4 border-white rounded-full flex items-center justify-center">
                    <div className="h-3 w-3 bg-white rounded-full" />
                  </div>
                )}
              </motion.div>
              
              <div className="flex-1 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{freelancer.name}</h1>
                  {freelancer.verified && (
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  )}
                  {freelancer.topRated && (
                    <Award className="h-6 w-6 text-yellow-400" />
                  )}
                </div>
                <p className="text-xl text-sky-100 mb-2">{freelancer.title}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{freelancer.rating}</span>
                    <span className="text-sky-100">({freelancer.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{freelancer.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{freelancer.lastActive}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-3xl font-bold text-white">${freelancer.hourlyRate}</p>
                <p className="text-sky-100">per hour</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button className="gradient-primary gradient-primary-hover text-white px-6">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact
            </Button>
            <Button variant="outline">
              <Heart className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span>{freelancer.completedJobs} jobs completed</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>${freelancer.totalEarnings.toLocaleString()} earned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{freelancer.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {freelancer.skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{skill.name}</span>
                            <span className="text-sm text-gray-500">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {freelancer.portfolio.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-video bg-gray-100">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                {freelancer.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{review.name}</h4>
                            <span className="text-gray-500 text-sm">• {review.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                {freelancer.experience.map((exp, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 bg-sky-100 rounded-lg flex items-center justify-center">
                          <Briefcase className="h-6 w-6 text-sky-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{exp.title}</h3>
                          <p className="text-sky-600 font-medium mb-1">{exp.company}</p>
                          <p className="text-gray-500 text-sm mb-3">{exp.duration}</p>
                          <p className="text-gray-700">{exp.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-medium">{freelancer.responseTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Joined</span>
                  <span className="font-medium">{freelancer.joinedDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-medium text-green-600">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Repeat Clients</span>
                  <span className="font-medium">76%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {freelancer.languages.map((language, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{language}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{freelancer.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">sarah.ahmed@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">+880 1XX XXX XXXX</span>
                  </div>
                </div>
                
                <Button className="w-full gradient-primary gradient-primary-hover text-white">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}