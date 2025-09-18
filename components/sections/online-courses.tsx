import { Clock, Users, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function OnlineCourses() {
  const courses = [
    {
      id: "1",
      title: "Fashion Design Fundamentals",
      instructor: "Sarah Ahmed",
      rating: 4.8,
      students: 1250,
      duration: "8 weeks",
      price: 4500,
      image: "/fashion-design-course.jpg",
      level: "Beginner",
    },
    {
      id: "2",
      title: "Textile Production Management",
      instructor: "Mohammad Rahman",
      rating: 4.9,
      students: 890,
      duration: "12 weeks",
      price: 6500,
      image: "/textile-production-course.jpg",
      level: "Intermediate",
    },
    {
      id: "3",
      title: "Quality Control in Garments",
      instructor: "Fatima Khan",
      rating: 4.7,
      students: 650,
      duration: "6 weeks",
      price: 3500,
      image: "/quality-control-course.jpg",
      level: "Advanced",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Online Courses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enhance your skills with expert-led courses designed for the garment industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="relative">
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="sm" className="gradient-primary gradient-primary-hover text-white">
                    <Play className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-white text-gray-700 text-xs rounded-full font-medium">
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sky-600 font-medium mb-3">by {course.instructor}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900">BDT {course.price.toLocaleString()}</div>
                  <Button className="gradient-primary gradient-primary-hover text-white">Enroll Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="px-8 py-3 bg-transparent">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  )
}
