import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="flex-1 flex items-center py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Find Your Dream Property
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10 leading-relaxed">
              Explore thousands of properties, connect with sellers, and
              discover your perfect home. Making real estate simple and
              transparent for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">
            Ready to find your dream property?
          </h2>
          <p className="text-base sm:text-lg opacity-90 mb-8">
            Join thousands of satisfied customers who found their perfect home
            on PropertyHub.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
