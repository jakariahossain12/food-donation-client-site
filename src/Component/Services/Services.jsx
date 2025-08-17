import { HeartPulse, BookOpen, Droplets, Apple } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Apple className="w-10 h-10 text-primary" />,
      title: "Healthy Food",
      description:
        "We help companies develop powerful corporate social responsibility, grantmaking, and employee engagement strategies.",
    },
    {
      icon: <BookOpen className="w-10 h-10 text-primary" />,
      title: "Kids Education",
      description:
        "We help companies develop powerful corporate social responsibility, grantmaking, and employee engagement strategies.",
    },
    {
      icon: <Droplets className="w-10 h-10 text-primary" />,
      title: "Pure Water",
      description:
        "We help companies develop powerful corporate social responsibility, grantmaking, and employee engagement strategies.",
    },
    {
      icon: <HeartPulse className="w-10 h-10 text-primary" />,
      title: "Medical Care",
      description:
        "We help companies develop powerful corporate social responsibility, grantmaking, and employee engagement strategies.",
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="w-11/12 mx-auto px-6 text-center">
        <p className="text-sm font-medium text-gray-500 uppercase">
          Our Services
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-base-content mt-2">
          We Are Here to Help Them
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          At Stitch Cleaning Service, let us help you solve problems so that you
          can focus on your mission. We support businesses through periods of
          expansion, succession.
        </p>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-base-200 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-yellow-100 rounded-full">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-base-content">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-base-content">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
