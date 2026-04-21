import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareNodes,
  faPen,
  faHistory,
  faShieldHalved,
  faBriefcase,
  faPlus,
  faCode,
  faStar,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useFetchAllProfile } from "@/hooks/useFetchAllProfile";
import defaultAvatar from "@images/defaultAvatar.png";
import EditProfile from "@/components/ui/EditProfile";
const SkillCard = ({ title, stars, level, exp }) => {
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-lg hover:border-cyan-400/50 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-gray-200 font-semibold text-sm uppercase tracking-wider">
          {title}
        </h4>
        <div className="flex gap-1 text-[10px]">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              className={i < stars ? "text-cyan-400" : "text-gray-700"}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between text-[10px] text-gray-500 font-bold">
        <p>
          PROFICIENCY LEVEL: <span className="text-gray-300">{level}</span>
        </p>
        <p className="text-gray-300">{exp} Yrs Exp</p>
      </div>
    </div>
  );
};
const profileData = [
  { label: "Company", value: null },
  { label: "Location", value: null },
  { label: "DOB", value: null },
  { label: "Gender", value: null },
];
const getLevel = (years) => {
  if (years < 0) return "Invalid";
  if (years === 0) return "Intern";
  if (years <= 1) return "Fresher";
  if (years <= 3) return "Junior";
  if (years <= 5) return "Middle";
  if (years <= 7) return "Senior";
  return "Lead";
};
const ProfilePage = () => {
  const userData = {
    name: "Architect_Zero",
    handle: "@arch_zero",
    role: "Senior Systems Architect",
    company: "CyberDyne Systems",
    location: "Neo-Tokyo, Sector 4",
    dob: "1992.04.15",
    gender: "Male",
    bio: "Specializing in high-concurrency neural networks and synthetic data architectures. Building the infrastructure for tomorrow's AI agents. Tabs over spaces.",
  };
  const [editProfile, setEditProfile] = useState(false);
  const { data } = useFetchAllProfile();
  const userProfile = data;
  console.log(data);
  return (
    <div className="min-h-screen bg-[#0a0e17] text-gray-100 p-6 md:p-12 font-sans">
      {editProfile && <EditProfile setEditProfile={setEditProfile} />}
      <div className="max-w-6xl mx-auto">
        {/* --- HEADER SECTION --- */}
        <header className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Profile Settings
            </h1>
            <p className="text-gray-500 max-w-xl">
              Manage your identity, professional experience, and technical
              proficiencies within the DevForge ecosystem.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setEditProfile(true)}
              className="bg-[#7c4dff] hover:bg-[#6a3df0] px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20"
            >
              <FontAwesomeIcon icon={faPen} /> Edit Profile
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* --- LEFT SIDEBAR --- */}
          <aside className="space-y-6">
            {/* Profile Brief */}
            <div className="bg-[#141b2b] border border-white/5 rounded-xl p-8 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                {userProfile?.avatar ? (
                  <img
                    src={userProfile.avatar}
                    alt="Avatar"
                    className="rounded-xl bg-[#1c253a] p-1 border border-white/10"
                  />
                ) : (
                  <img
                    src={defaultAvatar}
                    alt="Avatar"
                    className="rounded-xl bg-[#1c253a] p-1 border border-white/10"
                  />
                )}

                <div className="absolute -bottom-1 -right-1 bg-[#7c4dff] w-6 h-6 rounded-full border-2 border-[#141b2b] flex items-center justify-center text-[10px]">
                  ✓
                </div>
              </div>
              <h2 className="text-xl font-bold tracking-wide">
                {userProfile?.name ? userProfile.name : <span>-</span>}
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                {userProfile?.name ? userProfile.name : <span>On update</span>}
              </p>
              <div className="bg-cyan-500/10 text-cyan-400 py-2 px-4 rounded-lg text-xs font-bold border border-cyan-500/20 inline-flex items-center gap-2">
                <FontAwesomeIcon icon={faCode} />{" "}
                {userData?.yearOfExperience
                  ? getLevel(userData?.yearOfExperience) + " System Architect"
                  : "N/A"}
              </div>
            </div>

            {/* Personal Intel */}
            <div className="bg-[#141b2b] border border-white/5 rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={faBriefcase} className="text-gray-500" />{" "}
                PERSONAL INTEL
              </h3>

              {profileData.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-xs border-b border-white/5 pb-2"
                >
                  <span className="text-gray-500 font-medium">
                    {item.label}
                  </span>
                  <span className="font-semibold">
                    {item.value ? item.value : <span>-</span>}
                  </span>
                </div>
              ))}

              <div className="pt-2">
                <label className="text-[10px] text-gray-500 font-bold block mb-2 uppercase tracking-widest">
                  Bio Data
                </label>
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  {userProfile?.bio ? userProfile.bio : <span>-</span>}
                </p>
              </div>
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#141b2b] border-l-4 border-[#7c4dff] rounded-lg p-6 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                    Total Experience
                  </p>
                  <div className="text-xl font-black">
                    {userData?.yearOfExperience ? (
                      userData.yearOfExperience
                    ) : (
                      <span>N/A</span>
                    )}{" "}
                    <span className="text-sm text-gray-500 font-normal">
                      Years
                    </span>
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faHistory}
                  className="text-2xl text-gray-700"
                />
              </div>

              <div className="bg-[#141b2b] border-l-4 border-cyan-400 rounded-lg p-6 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                    System Role
                  </p>
                  <div className="text-3xl font-black text-white">
                    Consumer,Creator
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  className="text-2xl text-gray-700"
                />
              </div>
            </div>

            {/* Technical Matrix */}
            <div className="bg-[#141b2b] border border-white/5 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <span className="bg-white/10 w-5 h-5 flex items-center justify-center rounded text-[10px]">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  TECHNICAL MATRIX
                </h3>
                <button className="text-cyan-400 text-xs font-bold hover:underline underline-offset-4">
                  + Add Skill
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SkillCard
                  title="Rust Architecture"
                  stars={5}
                  level={5}
                  exp={8}
                />
                <SkillCard
                  title="Kubernetes Orchestration"
                  stars={4}
                  level={4}
                  exp={5}
                />
                <SkillCard
                  title="PostgreSQL Internals"
                  stars={3}
                  level={3}
                  exp={10}
                />
                <SkillCard
                  title="GraphQL API Design"
                  stars={4}
                  level={4}
                  exp={4}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
