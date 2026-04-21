import React from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faBuilding,
  faMapMarkerAlt,
  faCalendarAlt,
  faChevronDown,
  faLock,
  faMicrochip,
} from "@fortawesome/free-solid-svg-icons";

const EditProfile = ({ setEditProfile, userProfile }) => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      fullName: "Alex Chen",
      company: "CyberDyne Analytics",
      location: "Neo-Tokyo Grid 4",
      dob: "2045-10-23",
      gender: "Unspecified / Classified",
      bio: "Senior Data Architect specializing in predictive matrix modeling and deep learning neural networks. Currently optimizing quantum routing protocols for Sector 7 logistics.",
    },
  });

  const bioContent = watch("bio");
  const onSubmit = (data) => console.log(data);

  return (
    <div className="fixed z-50 inset-0   bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-modal-content bg-[#161b22] border border-gray-800 rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-purple-400 tracking-tight drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
              Edit Profile
            </h2>
            <p className="text-gray-400 text-sm mt-1 uppercase tracking-wider">
              Update your Personal Intel parameters.
            </p>
          </div>
          <button
            className="text-gray-500 hover:text-white transition-colors"
            onClick={() => setEditProfile(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Section: Personal Intel */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">
              <FontAwesomeIcon icon={faMicrochip} />
              <span>Personal Intel</span>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-[11px] text-gray-500 font-semibold uppercase">
                Full Name
              </label>
              <input
                {...register("fullName")}
                className="w-full bg-[#0d1117] border border-gray-800 rounded px-4 py-2.5 text-gray-300 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label className="block text-[11px] text-gray-500 font-semibold uppercase">
                Company / Affiliation
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faBuilding}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                />
                <input
                  {...register("company")}
                  className="w-full bg-[#0d1117] border border-gray-800 rounded pl-11 pr-4 py-2.5 text-gray-300 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-[11px] text-gray-500 font-semibold uppercase">
                Base Location
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                />
                <input
                  {...register("location")}
                  className="w-full bg-[#0d1117] border border-gray-800 rounded pl-11 pr-4 py-2.5 text-gray-300 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            {/* Grid: DOB & Gender */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[11px] text-gray-500 font-semibold uppercase">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    type="date"
                    {...register("dob")}
                    className="w-full bg-[#0d1117] border border-gray-800 rounded px-4 py-2.5 text-gray-300 focus:outline-none focus:border-purple-500 transition-colors appearance-none"
                  />
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] text-gray-500 font-semibold uppercase">
                  Gender Identifier
                </label>
                <div className="relative">
                  <select
                    {...register("gender")}
                    className="w-full bg-[#0d1117] border border-gray-800 rounded px-4 py-2.5 text-gray-300 focus:outline-none focus:border-purple-500 transition-colors appearance-none cursor-pointer"
                  >
                    <option>Unspecified / Classified</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Bio Data */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">
              <span className="text-gray-400">{`{ }`}</span>
              <span>Bio Data Stream</span>
            </div>
            <div className="relative">
              <textarea
                {...register("bio")}
                maxLength={500}
                rows={4}
                className="w-full bg-[#0d1117] border border-gray-800 rounded p-4 text-gray-300 text-sm leading-relaxed focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
              <div className="text-right text-[10px] text-gray-600 mt-1 tabular-nums">
                {bioContent?.length || 0} / 500 characters
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-6 pt-6 mt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={() => setEditProfile(false)}
              className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-400 hover:to-blue-500 text-white px-6 py-2.5 rounded shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center gap-3 transition-all active:scale-95"
            >
              <FontAwesomeIcon icon={faLock} className="text-xs" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Commit Changes
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
