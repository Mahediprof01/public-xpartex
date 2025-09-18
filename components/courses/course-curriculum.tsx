import React from 'react'

type Course = any

export default function CourseCurriculum({ course }: { course: Course }) {
  return (
    <section>
      <h2 className="text-lg font-semibold">Curriculum</h2>
      <ul className="list-disc pl-5">
        {(course?.curriculum || []).map((item: any, idx: number) => (
          <li key={idx} className="py-1">{item.title} — {item.duration}</li>
        ))}
      </ul>
    </section>
  )
}
