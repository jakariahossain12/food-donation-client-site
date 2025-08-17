import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Counter Component (animated numbers)
const Counter = ({ target, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2s animation
    const increment = target / (duration / 30);

    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 30);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="flex flex-col items-center bg-base-100 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
      <h3 className="text-4xl font-bold text-[#00705C]">{count}+</h3>
      <p className="text-base-content/70 mt-2">{label}</p>
    </div>
  );
};

// Testimonials Data
const testimonials = [
  {
    name: "Green Leaf Restaurant",
    role: "Restaurant Partner",
    message:
      "Through this platform, we’ve been able to donate surplus meals daily. It feels great knowing the food reaches families instead of going to waste.",
    img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400",
  },
  {
    name: "Helping Hands Charity",
    role: "Charity Organization",
    message:
      "This system has made it so easy to request food donations. We’ve served thousands of meals thanks to our restaurant partners.",
    img: "https://images.unsplash.com/photo-1600585154320-1c1c1c1c1c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400",
  },
  {
    name: "Ahmed H.",
    role: "Community Volunteer",
    message:
      "Volunteering for pickups through this platform has been inspiring. I’ve seen firsthand the smiles from families receiving food.",
    img: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400",
  },
];

export default function SuccessStories() {
  const [current, setCurrent] = useState(0);

  const nextTestimonial = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);

  const prevTestimonial = () =>
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-6xl mx-auto px-6 lg:px-20">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#00705C]">
            🌍 Our Impact & Success Stories
          </h2>
          <p className="text-base-content/70 mt-3 max-w-2xl mx-auto">
            Together with restaurants, charities, and volunteers, we’re making a
            real difference in reducing food waste and feeding communities.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Counter target={2340} label="Meals Donated" />
          <Counter target={1200} label="Families Served" />
          <Counter target={50} label="Restaurant Partners" />
        </div>

        {/* Testimonials Carousel */}
        <div className="relative bg-base-100 shadow-xl rounded-2xl p-10 max-w-3xl mx-auto">
          <div className="text-center">
            <img
              src={testimonials[current].img}
              alt={testimonials[current].name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-[#00705C]"
            />
            <p className="text-lg italic text-base-content/80 mb-4">
              "{testimonials[current].message}"
            </p>
            <h4 className="font-semibold text-[#00705C]">
              {testimonials[current].name}
            </h4>
            <p className="text-sm text-base-content/70">
              {testimonials[current].role}
            </p>
          </div>

          {/* Carousel Controls */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 btn btn-circle btn-outline"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 btn btn-circle btn-outline"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
