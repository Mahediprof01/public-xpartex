import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, MessageCircle } from "lucide-react"

export function CustomizationCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-sky-500 to-cyan-400">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Start Your Custom Project?</h2>
        <p className="text-xl text-sky-100 mb-8 max-w-3xl mx-auto">
          Get in touch with our customization experts and bring your garment ideas to life with fast turnaround times
          and premium quality.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-sky-600 hover:bg-gray-100 px-8 py-3">
            <MessageCircle className="mr-2 h-5 w-5" />
            Start Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-sky-600 px-8 py-3 bg-transparent"
          >
            <Phone className="mr-2 h-5 w-5" />
            Call Us Now
          </Button>
        </div>

        <div className="mt-8 text-sky-100">
          <p className="text-sm">📞 +880-2-123-4567 | ✉️ customization@Xpartex.com | ⏰ Response within 2 hours</p>
        </div>
      </div>
    </section>
  )
}
