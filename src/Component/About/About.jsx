import React from 'react';
import { Link } from 'react-router';

const About = () => {
    return (
      <div className="bg-base-100 text-base-content">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-secondary py-20 text-center text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            About Food Donation Platform
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            Connecting restaurants, charities, and communities to reduce food
            waste and fight hunger with technology.
          </p>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-6 lg:px-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-6">
            🌍 Our Mission
          </h2>
          <p className="text-base-content/80 leading-relaxed">
            Every day, tons of food go to waste while millions remain hungry.
            Our platform bridges this gap by enabling restaurants to donate
            surplus food, charities to request it, and users to contribute to a
            world with less waste and more compassion.
          </p>
        </section>

        {/* How It Works */}
        <section className="bg-base-200 py-16 px-6 lg:px-20">
          <h2 className="text-3xl font-bold text-center mb-10">
            ⚡ How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="card bg-base-100 shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-3">1. Restaurants</h3>
              <p>
                Restaurants add food donations with details and availability.
              </p>
            </div>
            <div className="card bg-base-100 shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-3">2. Charities</h3>
              <p>Charities browse and request food donations in real time.</p>
            </div>
            <div className="card bg-base-100 shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-3">3. Community</h3>
              <p>
                Food reaches people in need, reducing waste and feeding
                families.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6 lg:px-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-10">
            ✨ Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Role-based dashboards (Admin, Restaurant, Charity, User)",
              "Firebase authentication & role verification",
              "Real-time food requests with React Query",
              "Donation reviews & pickup management",
              "SweetAlert2 & Toastify for better UX",
              "Feature donations on homepage",
            ].map((feature, i) => (
              <div
                key={i}
                className="p-5 border rounded-2xl shadow hover:shadow-lg transition"
              >
                {feature}
              </div>
            ))}
          </div>
        </section>

        {/* Future Plans */}
        <section className="bg-base-200 py-16 px-6 lg:px-20">
          <h2 className="text-3xl font-bold text-center mb-6">
            🚀 Future Plans
          </h2>
          <ul className="list-disc list-inside text-center text-lg space-y-3 max-w-2xl mx-auto">
            <li>Launch a mobile app for iOS & Android</li>
            <li>Integrate SMS notifications for donations</li>
            <li>AI-powered donation recommendations</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Be part of the change 🌱</h2>
          <p className="text-base-content/80 mb-6">
            Join us in building a future where no food goes to waste and no one
            goes hungry.
          </p>
          <Link to={"/donations"} className="btn btn-primary rounded-2xl px-8">
            Explore Donations
          </Link>
        </section>
      </div>
    );
};

export default About;