import React from 'react'

type Course = any

export default function CourseContent({ course }: { course: Course }) {
  return (
    <section>
      <p className="text-gray-700">{course?.description ?? 'Course description goes here.'}</p>
    </section>
  )
}
