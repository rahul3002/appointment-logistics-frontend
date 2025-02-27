import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Calendar, Users, Building2, Clock, Map, ArrowRight, CheckCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-12 md:py-20 space-y-8">
        <div className="container flex flex-col items-center text-center space-y-4">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            Logistics Management
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Appointment Logistics System
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Streamline your logistics operations with our comprehensive appointment-based system.
            Manage pickups, deliveries, partners, and hubs all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">Login</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Key Features</h2>
          <p className="text-muted-foreground md:text-lg max-w-[700px] mx-auto">
            Our platform provides everything you need to manage your logistics operations efficiently.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Appointment Management"
            description="Schedule and manage pickup and delivery appointments with real-time tracking and status updates."
            icon={<Calendar className="h-10 w-10 text-primary" />}
          />
          <FeatureCard
            title="Partner Network"
            description="Connect with logistics partners and manage their service areas, vehicle capacities, and availability."
            icon={<Users className="h-10 w-10 text-primary" />}
          />
          <FeatureCard
            title="Hub Operations"
            description="Optimize your logistics hubs with capacity management, operating hours, and service area definitions."
            icon={<Building2 className="h-10 w-10 text-primary" />}
          />
          <FeatureCard
            title="Time Slot Scheduling"
            description="Create and manage time slots for pickups and deliveries with dynamic capacity and pricing."
            icon={<Clock className="h-10 w-10 text-primary" />}
          />
          <FeatureCard
            title="Geospatial Support"
            description="Utilize location-based services for efficient routing and service area management."
            icon={<Map className="h-10 w-10 text-primary" />}
          />
          <FeatureCard
            title="Real-time Analytics"
            description="Access comprehensive analytics and reporting to optimize your logistics operations."
            icon={<CheckCircle className="h-10 w-10 text-primary" />}
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
          <p className="text-muted-foreground md:text-lg max-w-[700px] mx-auto">
            Get started with our platform in just a few simple steps.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <StepCard
            number={1}
            title="Create an Account"
            description="Sign up and create your organization profile with service areas and operational details."
          />
          <StepCard
            number={2}
            title="Configure Your Settings"
            description="Set up your hubs, partners, and time slots based on your operational requirements."
          />
          <StepCard
            number={3}
            title="Start Managing Appointments"
            description="Begin scheduling and managing pickup and delivery appointments with real-time tracking."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">Ready to streamline your logistics?</h3>
              <p className="text-primary-foreground/80 max-w-[500px]">
                Join thousands of businesses that use our platform to optimize their logistics operations.
              </p>
            </div>
            <Link to="/register">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <Card className="border-none shadow-none hover:bg-accent transition-colors">
      <CardHeader>
        <div className="p-2 w-fit rounded-lg bg-primary/10 mb-3">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <Card className="border-none shadow-none hover:bg-accent transition-colors">
      <CardHeader>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl mb-3">
          {number}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default HomePage;
