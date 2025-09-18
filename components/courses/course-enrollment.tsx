import React from 'react'

type Course = any

export default function CourseEnrollment({ course }: { course: Course }) {
  return (
    <aside className="p-4 border rounded bg-white">
      <div className="text-xl font-bold">${course?.price ?? 0}</div>
      <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded">Enroll Now</button>
    </aside>
  )
}
