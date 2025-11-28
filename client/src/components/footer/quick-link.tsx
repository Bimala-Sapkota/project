"use client";

// import Link from "next/link";
import React from "react";
import { Link } from "react-router";

type FooterLink = {
  title: string;
  url: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const footerData: FooterSection[] = [
  {
    title: "Quick Links",
    links: [
      { title: "Home", url: "/" },
      { title: "Camera", url: "/camera" },
      { title: "Storage", url: "/storage" },
      { title: "Desktop", url: "/desktop" },
      { title: "Air Condition", url: "/air-condition" },
      { title: "Networking", url: "/networking" },
      { title: "Accessories", url: "/accessories" },
    ],
  },
  {
    title: "About Shopkart",
    links: [
      { title: "About Us", url: "/about-us" },
      { title: "Terms & Conditions", url: "/terms-and-conditions" },
      { title: "Warranty", url: "/warranty" },
      { title: "Privacy Policy", url: "/privacy-policy" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { title: "Refund & Return Policy", url: "/refund-and-return-policy" },
      { title: "My Account", url: "/my-account" },
      { title: "Contact Us", url: "/contact-us" },
    ],
  },
];

const QuickLinks: React.FC = () => {
  return (
    <footer className=" text-white mt-4 lg:mt-0">
      <div className="max-w-6xl mx-auto grid grid-cols-1  md:grid-cols-3 gap-8 px-4">
        {footerData.map((section) => (
          <div key={section.title}>
            <h4 className="font-medium text-[16px] lg:text-[16px] 2xl:text-[18px] mb-4 text-center lg:text-start">{section.title}</h4>
            <ul className="space-y-2 text-sm">
              {section.links.map((link) => (
                <li className=" lg:text-transparent text-center lg:text-start" key={link.title}>
                  <Link
                    to={link.url}
                    className="hover:text-white text-[#f8f8f8] transition-all mx-auto duration-200 font-[200] text-[14px] lg:text-[14px] 3xl:text-[16px]"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default QuickLinks;