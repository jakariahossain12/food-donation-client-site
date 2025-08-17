import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function PartnerShowcase() {
  const partners = [
    {
      name: "Green Leaf Restaurant",
      logo: "https://www.creativefabrica.com/wp-content/uploads/2019/10/11/Minimalist-Restaurant-Logo-by-Murnify-6.jpg",
    },
    {
      name: "Helping Hands Charity",
      logo: "https://static.vecteezy.com/system/resources/previews/005/659/603/non_2x/restaurant-logo-line-art-illustration-design-creative-nature-minimalist-monoline-outline-linear-simple-modern-vector.jpg",
    },
    {
      name: "FreshBite Foods",
      logo: "https://img.freepik.com/premium-vector/restaurant-logo-with-restaurant-building-silhouette-minimalist-style-suitable-cooking-restaurant-food-menu-product_254342-385.jpg",
    },
    {
      name: "Hope Foundation",
      logo: "https://img.freepik.com/premium-vector/minimalist-line-logo-restaurant_555909-56.jpg",
    },
  ];

  const [index, setIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % partners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [partners.length]);
    
    const { user } = useAuth();

    const navigate = useNavigate();
    
    
    const handleButton = () => {
        if (!user) {
              toast.warning("Please log in to partner.");
              return;
        }
        navigate("/dashboard");
    }

  return (
    <section className="py-20 bg-gradient-to-b from-base-100 to-base-200">
      <div className="max-w-6xl mx-auto px-6 lg:px-20 text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-base-content">
          🤝 Trusted By Our Partners
        </h2>
        <p className="text-base-content/70 mt-3 mb-12 max-w-2xl mx-auto">
          We are building a strong network of restaurants, charities, and
          sponsors working together to fight hunger and reduce food waste.
        </p>

        {/* Partner Carousel */}
        <div className="flex justify-center gap-6 flex-wrap">
          {partners.map((partner, i) => (
            <div
              key={i}
              className={`backdrop-blur-md bg-white/40 border border-white/20 shadow-md 
                rounded-xl p-6 flex flex-col items-center justify-center w-40 h-40 
                transform transition duration-500 ${
                  index === i ? "scale-110 shadow-xl" : "opacity-70"
                }`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-20 h-20 object-contain"
              />
              <p className="mt-3 font-medium text-sm">{partner.name}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg py-10 px-6">
          <h3 className="text-2xl font-bold text-white mb-2">
            Want to Join as a Partner?
          </h3>
          <p className="text-white/90 mb-6">
            Together we can make a bigger impact. Become part of our partner
            network today.
          </p>
          <button
            onClick={handleButton}
            className="btn btn-white text-primary rounded-full px-8"
          >
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
}
