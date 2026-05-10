"use client";
import React from "react";
import { MdLocationOn, MdPhone, MdMail, MdEmail } from "react-icons/md";

interface IUrl {
  name: string;
  url: string;
}

interface IInfo {
  icon: React.ReactNode;
  category: string;
  content: IUrl[];
}

const informations: IInfo[] = [
  {
    icon: <MdLocationOn />,
    category: "VISIT US",
    content: [
      {
        name: "New Baneshwor, Kathmandu, Nepal",
        url: "https://maps.app.goo.gl/bgcxJjxDEFwALDbE8",
      },
    ],
  },
  {
    icon: <MdEmail />,
    category: "EMAIL SUPPORT",
    content: [
      {
        name: "info@chaitanyaglobal.com.np",
        url: "mailto:info@chaitanyaglobal.com.np",
      },
    ],
  },
  {
    icon: <MdPhone />,
    category: "CALL US",
    content: [
      {
        name: "+977-01-5927986",
        url: "tel:01-5927986",
      },
      {
        name: "+977-9851434022",
        url: "tel:9851434022",
      },
    ],
  },
];

const ContactUs = () => {
  return (
    <>
      <style>{`
    section{
        max-width: 1250px;
        width: 1005;
        display: flex;
    }
    `}</style>

      <div className="w-full flex flex-col items-center justify-start gap-8 bg-linear-90 from-neutral-100 to-white text-black">
        {/* Hero */}
        <section className="flex-col items-center justify-center gap-4 py-12">
          <span className="font-bold text-4xl text-neutral-800">
            Contact Us
          </span>
          <span className="font-regural text-sm text-neutral-600 text-center tracking-wide">
            Let's help you start your global journey with guided clarity and
            professional <br /> excellence.
          </span>
        </section>

        {/* Form and contact */}
        <section className="sm:flex-col lg:flex-row items-center justify-evenly gap-4 lg:gap-8">
          {/* Contacts & Address */}
          <div className="flex flex-col items-start justify-start gap-4">
            <span className="font-bold text-2xl text-sky-700">
              Get in Touch
            </span>
            <span className="font-regural text-sm text-neutral-500 max-w-90">
              Our educatinal experts are ready to guide you through every step
              of your international application process.
            </span>
            <div>
              {informations &&
                informations.map((info, i) => (
                  <div
                    className="flex items-center justify-start gap-2 my-2"
                    key={i}
                  >
                    <span className="p-2 text-xl text-sky-600 bg-sky-200 rounded-lg flex items-center justify-center">
                      {info.icon}
                    </span>
                    <div className="flex flex-col items-start justify-start">
                      <span className="font-regural text-sm text-neutral-600">
                        {info.category}
                      </span>
                      {info.content &&
                        info.content.map((c, ind) => (
                          <a
                            className="font-regural text-xs text-neutral-500 ease duration-200 hover:text-sky-400 cursor-pointer py-0.5"
                            key={ind}
                          >
                            {c.name}
                          </a>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Form */}
          <form className="rounded-lg shadow shadow-lg/30 p-4 lg:p-8 grid grid-cols-2 gird-rows-2 gap-4">
            <div className="flex flex-col items-start justify-center">
              <label
                className="font-regural text-sm text-neutral-800"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                className="w-full font-regural text-sm text-neutral-400 border-1 border-neutral-300 rounded-md px-3 py-1 bg-neutral-100"
                type="text"
                name=""
                placeholder="Jhon Doe"
                id=""
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <label
                className="font-regural text-sm text-neutral-800"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                className="w-full font-regural text-sm text-neutral-400 border-1 border-neutral-300 rounded-md px-3 py-1 bg-neutral-100"
                type="text"
                name=""
                placeholder="jhon@example.com"
                id=""
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <label
                className="font-regural text-sm text-neutral-800"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                className="w-full font-regural text-sm text-neutral-400 border-1 border-neutral-300 rounded-md px-3 py-1 bg-neutral-100"
                type="text"
                name=""
                placeholder="+977 98XXXXXX"
                id=""
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <label
                className="font-regural text-sm text-neutral-800"
                htmlFor="fullName"
              >
                Interested Country
              </label>
              <select
                className="w-full font-regural text-sm text-neutral-400 border-1 border-neutral-300 rounded-md px-3 py-1 bg-neutral-100"
                name="country"
                id=""
              >
                <option value="">Select a country</option>
                <option value="USA">USA</option>
                <option value="Europe">Europe</option>
                <option value="UK">UK</option>
                <option value="SouthKorea">South Korea</option>
              </select>
            </div>
            <textarea
              name="message"
              placeholder="Tell us about your educaitonal goals..."
              cols={20}
              rows={5}
              id=""
              className="col-span-2 border border-neutral-300 rounded-md p-3 font-regural text-sm text-neutral-500 bg-neutral-100"
            ></textarea>
            <button
              type="submit"
              className="font-regural w-full text-neutral-100 bg-sky-500 rounded-md col-span-2 py-2 cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Map location */}
        <section className="w-full rounded-lg border-2 border-white rounded-lg p-2 shadow shadow-lg/30 my-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3831.9588761533787!2d85.3323021756726!3d27.688049026341915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190066fe59d5%3A0x7c75f049297fd452!2sChaitanya%20Global%20Education!5e1!3m2!1sen!2snp!4v1778386906031!5m2!1sen!2snp"
            width="600"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-md w-full"
          ></iframe>
        </section>
      </div>
    </>
  );
};

export default ContactUs;
