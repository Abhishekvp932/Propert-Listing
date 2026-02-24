import {Link} from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/layout/Header';
import { Footer } from '@/layout/Footer';
import { Search } from 'lucide-react';

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
              Explore thousands of properties, connect with sellers, and discover your perfect home. Making real estate simple and transparent for everyone.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Search by location or property..."
                className="flex-1 px-4 py-3 bg-input border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="h-auto py-3 text-sm sm:text-base">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary">12,500+</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Properties Listed</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary">25,000+</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary">8,400+</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Successful Deals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Ready to find your dream property?</h2>
          <p className="text-base sm:text-lg opacity-90 mb-8">Join thousands of satisfied customers who found their perfect home on PropertyHub.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Get Started Today
              </Button>
            </Link>
            <Link to="#contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
