interface Job {
  id: string
  title: string
  company: string
}

interface JobApplicationProps {
  job: Job
}

export default function JobApplication({ job }: JobApplicationProps) {
  return (
    <div className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold mb-6">Apply for this Position</h3>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            required
            className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            required
            className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resume/CV *</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            required
            className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
          <textarea
            rows={4}
            className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="Tell us why you're interested in this position..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white py-3 px-6 font-semibold hover:from-sky-600 hover:to-cyan-500 transition-colors"
        >
          Submit Application
        </button>
      </form>
    </div>
  )
}
