import React from 'react'

type Course = any

export default function CourseHeader({ course }: { course: Course }) {
  return (
    <header>
      <h1 className="text-2xl font-bold">{course?.title ?? 'Course Title'}</h1>
      <p className="text-sm text-gray-600">{course?.instructor ?? 'Instructor'}</p>
    </header>
  )
}
