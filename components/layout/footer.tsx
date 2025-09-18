import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="w-full px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-35 h-8  flex items-center justify-center overflow-hidden">
                <Image src="/logo.png" alt="Xpartex logo" width={200} height={200} className="object-contain" />
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Leading B2B marketplace connecting garment manufacturers, suppliers, and buyers worldwide.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/products/apparel" className="hover:text-white">
                  Apparel
                </Link>
              </li>
              <li>
                <Link href="/products/fabrics" className="hover:text-white">
                  Fabrics
                </Link>
              </li>
              <li>
                <Link href="/products/accessories" className="hover:text-white">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/products/machinery" className="hover:text-white">
                  Machinery
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/rfq" className="hover:text-white">
                  Request for Quotation
                </Link>
              </li>
              <li>
                <Link href="/customization" className="hover:text-white">
                  Custom Manufacturing
                </Link>
              </li>
              <li>
                <Link href="/logistics" className="hover:text-white">
                  Logistics
                </Link>
              </li>
              <li>
                <Link href="/quality-control" className="hover:text-white">
                  Quality Control
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/help" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 Xpartex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
