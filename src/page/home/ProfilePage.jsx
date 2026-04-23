import React, { useRef, useState } from "react";
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
import { useUploadAvatar } from "@/hooks/useUploadAvatar";
import notificationAntd from "@/utils/notifications/notificationAntd";
import { useQueryClient } from "react-query";
import { QUERY_KEY } from "@/config/queryConfig";
import { Skeleton } from "antd";
import SkeletonStudy from "@/components/ui/SkeletonStudy";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "@/components/ui/Loading";
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
  const { nickname } = useParams();
  const { isAuthenticate: isAuthenticated, id: userId } = useSelector(
    (state) => state.auth,
  );
  const [editProfile, setEditProfile] = useState(false);
  const queryClient = useQueryClient();
  const {
    data,
    isLoading: loadingProfile,
    isError,
  } = useFetchAllProfile(nickname);
  const userProfile = data?.data?.data;
  const fileInputRef = useRef(null);
  const profileData = [
    { label: "Company", value: userProfile?.company },
    { label: "Address", value: userProfile?.address },
    { label: "BirthDate", value: userProfile?.birthDate },
    { label: "Gender", value: userProfile?.gender },
  ];
  const { mutate, isLoading } = useUploadAvatar();
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    mutate(formData, {
      onSuccess: () => {
        notificationAntd(
          "success",
          "Upload Avatar",
          "Upload avatar successfully!",
        );
        queryClient.invalidateQueries({ queryKey: QUERY_KEY.getProfile });
      },
      onError: () => {
        notificationAntd(
          "error",
          "Upload Avatar",
          "Upload avatar failed. Please try again!",
        );
      },
    });
  };
  if (loadingProfile) {
    return <Loading />;
  }
  if (isError) {
    return <Navigate to={"/404"} replace={true} />;
  }
  return (
    <div className="min-h-screen bg-[#0a0e17] text-gray-100 p-6 md:p-12 font-sans">
      {userId != null &&
        userId === userProfile?.userId &&
        nickname &&
        editProfile && (
          <EditProfile
            setEditProfile={setEditProfile}
            userProfile={userProfile}
          />
        )}
      <div className="max-w-6xl mx-auto">
        {/* --- HEADER SECTION --- */}
        <header className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Profile</h1>
            <p className="text-gray-500 max-w-xl">
              Manage your identity, professional experience, and technical
              proficiencies within the DevForge ecosystem.
            </p>
          </div>
          {userId != null && userId === userProfile?.userId && nickname && (
            <div className="flex gap-3">
              <button
                onClick={() => setEditProfile(true)}
                className="bg-[#7c4dff] hover:bg-[#6a3df0] px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20"
              >
                <FontAwesomeIcon icon={faPen} /> Edit Profile
              </button>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* --- LEFT SIDEBAR --- */}
          <aside className="space-y-6">
            {/* Profile Brief */}
            <div className="bg-[#141b2b] border border-white/5 rounded-xl p-8 text-center">
              <div
                className="relative w-40 h-45 mx-auto mb-4 cursor-pointer"
                onClick={handleAvatarClick}
              >
                {isLoading ? (
                  <SkeletonStudy />
                ) : (
                  <div className="w-full h-full overflow-hidden rounded-xl bg-[#1c253a] p-1 border border-white/10">
                    <img
                      src={userProfile?.avatar || defaultAvatar}
                      alt="Avatar"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="absolute -bottom-2 -right-2 bg-[#7c4dff] w-7 h-7 rounded-full border-4 border-[#141b2b] flex items-center justify-center text-white text-xs">
                  ✓
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".png,.pdf,.jpeg"
                  onChange={handleFileChange}
                  disabled={!isAuthenticated}
                />
              </div>

              <h2 className="text-xl font-bold tracking-wide">
                {userProfile?.fullName || "-"}
              </h2>

              <p className="text-gray-500 text-sm mb-4">
                {userProfile?.nickName || "On update"}
              </p>
              {!userProfile?.nickName && (
                <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs px-3 py-2 rounded-lg mt-1 mb-3">
                  <span>⚠️</span>
                  <span>
                    Vui lòng cập nhật <strong>Nickname</strong> để người dùng
                    khác có thể thấy bạn!
                  </span>
                </div>
              )}

              <div className="bg-cyan-500/10 text-cyan-400 py-2 px-4 rounded-lg text-xs font-bold border border-cyan-500/20 inline-flex items-center gap-2">
                <FontAwesomeIcon icon={faCode} /> Professional System Architect
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
                    {userProfile?.yearOfExperience ? (
                      userProfile.yearOfExperience
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
