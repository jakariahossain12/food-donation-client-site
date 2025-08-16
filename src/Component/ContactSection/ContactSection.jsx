import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import groupPhoto from "/donation-group.png";

const ContactSection = () => {
  return (
    <section className="bg-[#f8f8f8] py-16 px-4">
      <div className="text-center">
        <p className="text-sm uppercase text-gray-500 tracking-widest">
          Contact Us
        </p>
        <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-6 leading-tight">
          We Love to Hear from Our <br /> Happy Customers
        </h2>
      </div>
      <div className="w-11/12 mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Left: Info */}
        <div>
          <img src={groupPhoto} alt="Group" className="rounded-xl mb-6" />

          <p className="text-gray-600 mb-6">
            There are many variations of passages of available but the majority
            have suffered alteration in some form, by injected randomized words
            even slightly believable.
          </p>

          {/* Phone */}
          <div className="flex items-center gap-3 mb-3">
            <FaPhoneAlt className="text-xl text-yellow-500" />
            <div>
              <h4 className="font-semibold text-gray-700">Phone</h4>
              <p className="text-gray-500 text-sm">+1 (888) 456 789</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-3">
            <HiOutlineLocationMarker className="text-2xl text-yellow-500" />
            <div>
              <h4 className="font-semibold text-gray-700">Address</h4>
              <p className="text-gray-500 text-sm">
                121 King St, Melbourne VIC 300, Australia
              </p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 rounded-md bg-[#f8f8f8] border border-gray-300 outline-yellow-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-md bg-[#f8f8f8] border border-gray-300 outline-yellow-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-3 rounded-md bg-[#f8f8f8] border border-gray-300 outline-yellow-500"
            />
            <textarea
              placeholder="Message"
              rows="4"
              className="w-full p-3 rounded-md bg-[#f8f8f8] border border-gray-300 outline-yellow-500"
            ></textarea>

            <button
              type="submit"
              className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-500 transition"
            >
              Make an Appointment
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
