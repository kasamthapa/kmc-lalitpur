import Link from "next/link";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { ChevronRight, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-950 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-slate-300">
            <Link href="/" className="hover:text-gold-500 transition">
              Home
            </Link>
            <ChevronRight size={16} />
            <span className="text-gold-500 font-semibold">Contact</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            We&apos;re here to answer your questions and guide you through your
            journey with KMC Lalitpur
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 shadow-lg hover:shadow-2xl transition">
              <div className="w-16 h-16 bg-blue-950 rounded-lg flex items-center justify-center mb-6">
                <Phone className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">Phone</h3>
              <div className="space-y-2 text-slate-700">
                <p>01-5201331</p>
                <p>01-5201334</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 shadow-lg hover:shadow-2xl transition">
              <div className="w-16 h-16 bg-blue-950 rounded-lg flex items-center justify-center mb-6">
                <Mail className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">Email</h3>
              <div className="space-y-2 text-slate-700">
                <p>info@kmclalitpur.edu.np</p>
                <p>admissions@kmclalitpur.edu.np</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 shadow-lg hover:shadow-2xl transition">
              <div className="w-16 h-16 bg-blue-950 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">Location</h3>
              <div className="space-y-2 text-slate-700">
                <p>Balkumari, Lalitpur</p>
                <p>Nepal</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 shadow-lg hover:shadow-2xl transition">
              <div className="w-16 h-16 bg-blue-950 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">Hours</h3>
              <div className="space-y-2 text-slate-700">
                <p>Mon-Fri: 8 AM - 5 PM</p>
                <p>Sat: 10 AM - 3 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form and Info */}
          <div className="grid md:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-blue-950 mb-8">
                Send us a Message
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-blue-950 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-950 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-950 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+977"
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-950 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-950 mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Your message..."
                    rows={6}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-950 text-white font-bold rounded-lg hover:shadow-lg transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div>
              <h2 className="text-3xl font-bold text-blue-950 mb-8">
                Connect With Us
              </h2>

              {/* Quick Response Info */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 mb-8">
                <h3 className="font-bold text-blue-950 mb-6 text-lg">
                  Quick Response
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-gold-500 font-bold mt-1">✓</span>
                    <span className="text-slate-700">
                      We respond to emails within 24 hours
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-500 font-bold mt-1">✓</span>
                    <span className="text-slate-700">
                      Call us during office hours for immediate assistance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-500 font-bold mt-1">✓</span>
                    <span className="text-slate-700">
                      Visit our campus for a personal tour
                    </span>
                  </li>
                </ul>
              </div>

              {/* Embedded Map */}
              <div className="rounded-2xl overflow-hidden shadow-lg h-80 border border-blue-200">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4969933155887!2d85.32346477346062!3d27.68394362371605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19c98e8c7d0f%3A0x5c9a8c8c8c8c8c8c!2sLalitpur%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1234567890"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Chat Section */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-12 border border-green-200 text-center">
            <h2 className="text-3xl font-bold text-blue-950 mb-3">
              Chat With Us on WhatsApp
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              Get instant answers to your questions
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://wa.me/9779851138595?text=I+want+to+know+about+admissions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.536.946-2.504 2.29-2.504 3.785 0 3.641 3.4 6.747 7.601 6.747a7.56 7.56 0 003.856-1.047l.493-.292 5.123 1.342-.86-5.159.531-.892a7.52 7.52 0 001.226-4.26c0-4.426-3.582-8.019-7.989-8.019Z" />
                </svg>
                Admission Info
              </a>
              <a
                href="https://wa.me/9779851138595?text=Please+send+me+the+KMC+brochure"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.536.946-2.504 2.29-2.504 3.785 0 3.641 3.4 6.747 7.601 6.747a7.56 7.56 0 003.856-1.047l.493-.292 5.123 1.342-.86-5.159.531-.892a7.52 7.52 0 001.226-4.26c0-4.426-3.582-8.019-7.989-8.019Z" />
                </svg>
                Brochure Request
              </a>
              <a
                href="https://wa.me/9779851138595?text=I+would+like+to+schedule+a+campus+visit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.536.946-2.504 2.29-2.504 3.785 0 3.641 3.4 6.747 7.601 6.747a7.56 7.56 0 003.856-1.047l.493-.292 5.123 1.342-.86-5.159.531-.892a7.52 7.52 0 001.226-4.26c0-4.426-3.582-8.019-7.989-8.019Z" />
                </svg>
                Campus Visit
              </a>
              <a
                href="https://wa.me/9779851138595?text=I+want+to+know+about+scholarships+at+KMC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.536.946-2.504 2.29-2.504 3.785 0 3.641 3.4 6.747 7.601 6.747a7.56 7.56 0 003.856-1.047l.493-.292 5.123 1.342-.86-5.159.531-.892a7.52 7.52 0 001.226-4.26c0-4.426-3.582-8.019-7.989-8.019Z" />
                </svg>
                Scholarship Info
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-20 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Follow Us</h2>
          <p className="text-lg text-slate-300 mb-10">
            Stay updated with our latest news and events
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <a
              href="#"
              className="px-8 py-3 bg-white text-blue-950 font-bold rounded-lg hover:bg-gold-500 hover:text-white transition"
            >
              Facebook
            </a>
            <a
              href="#"
              className="px-8 py-3 bg-white text-blue-950 font-bold rounded-lg hover:bg-gold-500 hover:text-white transition"
            >
              Instagram
            </a>
            <a
              href="#"
              className="px-8 py-3 bg-white text-blue-950 font-bold rounded-lg hover:bg-gold-500 hover:text-white transition"
            >
              YouTube
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
