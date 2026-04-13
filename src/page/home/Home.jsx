import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Header from "@components/ui/Header";
import thumbPage from "@images/theme.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CategoryItem from "@components/ui/CategoryItem";
import backend from "@images/backend.png";
import ai from "@images/ai.png";
import frontend from "@images/frontend.jpg";
import python from "@images/python.svg";
import devops from "@images/dev_oops.png";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  faRocket,
  faGraduationCap,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import reactjs from "@images/reactjs.svg";

const listCategory = [
  {
    key: 1,
    label: "React",
    url: reactjs,
  },
  {
    key: 2,
    label: "Python",
    url: python,
  },
  {
    key: 3,
    label: "AI",
    url: ai,
  },
  {
    key: 4,
    label: "DevOps",
    url: devops,
  },
  {
    key: 5,
    label: "Backend",
    url: backend,
  },
  {
    key: 6,
    label: "Frontend",
    url: frontend,
  },
];
const Home = () => {
  return (
    <section className="home-page min-h-screen text-slate-900 font-sans z-0 flex flex-col bg-[#0b1326]  ">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 px-8 overflow-hidden text-center bg-[#0f1a2f] ">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-[#3e3c8f]/30 border border-[#464554]/15">
              <span className="w-2 h-2 rounded-full bg-[#2fd9f4]"></span>
              <span className="text-sm font-bold uppercase tracking-widest text-[#2fd9f4]">
                Architect Node 2.4.0 Active
              </span>
            </div>
            <h1
              className="font-['Space_Grotesk'] text-white text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-center
            "
            >
              Architect the
              <span className="text-gradient">Future of Code</span>
            </h1>
            <p className="text-[#908fa0] text-lg md:text-xl max-w-2xl mx-auto mb-12">
              A premium ecosystem for elite developers to share and discover
              high-fidelity architectural patterns, snippets, and
              production-ready modules.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-bold">
              <button className="px-8 py-4 rounded-lg bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] text-[#1000a9] hover:scale-[1.02] transition-all shadow-xl shadow-[#c0c1ff]/10">
                Explore Patterns
              </button>
              <button className="px-8 py-4 rounded-lg bg-[#222a3d] border border-[#464554]/15 text-[#c0c1ff] hover:bg-[#2d3449] transition-all">
                Share Your Knowledge
              </button>
            </div>
          </div>
        </section>

        {/* Quick Categories */}
        <section className="px-8 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {listCategory.map((category) => {
              return (
                <CategoryItem
                  key={category.key}
                  icon={category.url}
                  activeColor={"text-[#c0c1ff]"}
                  label={category.label}
                />
              );
            })}
          </div>
        </section>
        <section className="bg-[#050b18] text-white py-20 px-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10"></div>

            {/* CỘT TRÁI: FOR CREATORS */}
            <div className="flex flex-col space-y-6 pr-0 md:pr-10">
              <div className="text-purple-500 text-3xl">
                <FontAwesomeIcon icon={faRocket} />
              </div>

              <h2 className="text-2xl font-extrabold tracking-wider uppercase">
                For Creators
              </h2>

              <p className="text-gray-400 leading-relaxed text-lg">
                Share your deep expertise and build your reputation. Convert
                your internal tooling and production snippets into recognized
                contributions for the world's most demanding engineering teams.
              </p>

              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-cyan-400 text-sm"
                  />
                  <span>Contribution recognition</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-cyan-400 text-sm"
                  />
                  <span>Intellectual Property protection</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-cyan-400 text-sm"
                  />
                  <span>Private enterprise licensing</span>
                </li>
              </ul>

              <div className="pt-6">
                <a
                  href="#"
                  className="text-sm font-bold tracking-widest uppercase hover:text-purple-400 transition-colors"
                >
                  Apply as contributor
                </a>
              </div>
            </div>

            {/* CỘT PHẢI: FOR LEARNERS */}
            <div className="flex flex-col space-y-6 pl-0 md:pl-10">
              <div className="text-cyan-400 text-3xl">
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>

              <h2 className="text-2xl font-extrabold tracking-wider uppercase">
                For Learners
              </h2>

              <p className="text-gray-400 leading-relaxed text-lg">
                Skip the "Hello World" tutorials. Gain immediate access to
                battlefield-tested code that works in high-scale environments.
                Learn by implementing elite structures.
              </p>

              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-cyan-400 text-sm"
                  />
                  <span>Production-ready templates</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-cyan-400 text-sm"
                  />
                  <span>Direct 1:1 author support</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-cyan-400 text-sm"
                  />
                  <span>Curated learning pathways</span>
                </li>
              </ul>

              <div className="pt-6">
                <a
                  href="#"
                  className="text-sm font-bold tracking-widest uppercase text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Get Access
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section (The Glass Box) */}
        <section className="px-8 py-32">
          <div className="max-w-5xl mx-auto glass-panel rounded-3xl p-12 md:p-20 text-center relative border border-[#464554]/15 overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold mb-8 text-white">
                Join the Elite{" "}
                <span className="text-[#c0c1ff]">Architect Node</span> Today
              </h2>
              <button className="px-10 py-5 rounded-lg bg-[#c0c1ff] text-lg text-[#1000a9] font-bold hover:scale-105 transition-transform mr-2.5">
                Join the Community
              </button>
              <button className="px-10  py-5 rounded-lg  text-lg text-[#2FD9F4] font-bold hover:scale-105 transition-transform">
                View Documentation
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};

export default Home;
