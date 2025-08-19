import React from "react";
import { assets, footer_data } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        {/* Logo and Description */}
        <div>
          <img
            src={assets.logo}
            alt="logo"
            className="w-32 sm:w-44 cursor-pointer"
            onClick={scrollToTop}
          />
          <p className="max-w-[410px] mt-6">
            QuickBlog offers thoughtful perspectives on the latest in tech,
            finance, and startups — designed for professionals who value clarity
            and insight.
          </p>
        </div>

        {/* Footer Sections */}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-500 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links &&
                  section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline transition flex items-center gap-2"
                      >
                        {link.icon && (
                          <img
                            src={link.icon}
                            alt={`${link.label} icon`}
                            className="w-4 h-4"
                          />
                        )}
                        {link.label}
                      </a>
                    </li>
                  ))}

                {section.info &&
                  section.info.map((item, i) => {
                    // Email
                    if (item.includes("@")) {
                      return (
                        <li key={i} className="flex items-center gap-2">
                          <img
                            src={assets.email_icon}
                            alt="Email icon"
                            className="w-4 h-4"
                          />
                          <a
                            href={`mailto:${item}`}
                            className="hover:underline transition"
                          >
                            {item}
                          </a>
                        </li>
                      );
                    }

                    // Phone
                    if (/[\d]{6,}/.test(item)) {
                      const numbers = item.split(",").map((num) => num.trim());
                      return (
                        <li key={i} className="flex items-center gap-2">
                          <img
                            src={assets.phone_icon}
                            alt="Phone icon"
                            className="w-4 h-4"
                          />
                          <div className="space-x-2">
                            {numbers.map((num, idx) => (
                              <a
                                key={idx}
                                href={`tel:${num}`}
                                className="hover:underline transition"
                              >
                                {num}
                              </a>
                            ))}
                          </div>
                        </li>
                      );
                    }
                    // Contact Us Button
                    // Contact Us Button
                    if (item === "contact_button") {
                      return (
                        <li key={i} className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              navigate("/contact");
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="bg-primary text-white px-3 py-1 rounded hover:bg-primary/80 transition"
                          >
                            Message Us
                          </button>
                        </li>
                      );
                    }

                    // Location
                    return (
                      <li key={i} className="flex items-center gap-2">
                        <img
                          src={assets.location_icon}
                          alt="Location icon"
                          className="w-4 h-4"
                        />
                        {item}
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom Text */}
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright 2025 © QuickBlog SAGAR - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
