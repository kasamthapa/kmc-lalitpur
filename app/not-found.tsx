import Link from "next/link";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export default function NotFound() {
  return (
    <main className="bg-white">
      <Header />
      <section className="min-h-[80vh] flex items-center justify-center pt-25">
        <div className="text-center px-4">
          <p className="text-8xl font-bold text-[#1B3E72] mb-4">404</p>
          <h1 className="text-2xl font-bold text-[#1B3E72] mb-3">
            Page Not Found
          </h1>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-[#F0A03C] text-[#1B3E72] font-bold rounded-xl hover:bg-[#F4B971] transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-[#1B3E72]/20 text-[#1B3E72] font-bold rounded-xl hover:bg-[#f7f5f0] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
