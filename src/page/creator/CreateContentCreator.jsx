import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPlus,
  faPlayCircle,
  faFileAlt,
  faChevronDown,
  faTrash,
  faInfoCircle,
  faLink,
  faLayerGroup,
  faTag,
  faCoins,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { QUERY_KEY } from "@/config/queryConfig";
import { useFetchAllCategory } from "@/hooks/useFetchAllCategory";
import AppDropdown from "@/components/ui/AppDropdown";
import Loading from "@/components/ui/Loading";
import { COURSE_LEVELS } from "@/utils/constraints";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { COURSE_CREATE_VALIDATE } from "@/utils/validation/yupValidate";
import { formatCurrency } from "@/utils/systems/sysFuc";
const queryClient = new QueryClient();
const CreateContentCreator = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [openCategory, setOpenCategory] = useState(false);
  const [openLevel, setOpenLevel] = useState(false);
  const { data } = useFetchAllCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver.apply(COURSE_CREATE_VALIDATE),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      thumb: null,
      ytb: null,
    },
  });
  const categorys = useMemo(() => {
    const res = data?.map((category) => category.name) || [];
    return res;
  }, [data]);
  const allLevel = useMemo(() => {
    return COURSE_LEVELS.filter((item) => item !== "Tất cả");
  }, [JSON.stringify(COURSE_LEVELS)]);
  console.log(categorys[0]);
  const [courseInfo, setCourseInfo] = useState({
    category: categorys[0],
    level: allLevel[0],
  });
  useEffect(() => {
    if (categorys?.[0]) {
      setCourseInfo((prev) => ({ ...prev, category: categorys[0] }));
    }
  }, [categorys]);
  // --- STATE NỘI DUNG BÀI HỌC ---
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Section 1: Introduction",
      lectures: [],
    },
  ]);

  const addSection = () => {
    setSections([
      ...sections,
      { id: Date.now(), title: `New Section`, lectures: [] },
    ]);
  };

  const deleteSection = (id) => {
    if (window.confirm("Delete this section?"))
      setSections(sections.filter((s) => s.id !== id));
  };

  const addLecture = (sectionId) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lectures: [
                ...s.lectures,
                {
                  id: Date.now(),
                  title: "",
                  type: "video",
                  content: "",
                  isEditing: true,
                },
              ],
            }
          : s,
      ),
    );
  };

  const updateLecture = (sectionId, lectureId, field, value) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lectures: s.lectures.map((l) =>
                l.id === lectureId ? { ...l, [field]: value } : l,
              ),
            }
          : s,
      ),
    );
  };

  const toggleEditLecture = (sectionId, lectureId) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lectures: s.lectures.map((l) =>
                l.id === lectureId ? { ...l, isEditing: !l.isEditing } : l,
              ),
            }
          : s,
      ),
    );
  };

  const deleteLecture = (sectionId, lectureId) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lectures: s.lectures.filter((l) => l.id !== lectureId),
            }
          : s,
      ),
    );
  };
  const onSubmit = (data) => {};
  return (
    <div className="bg-[#1C1D1F] w-full text-white min-h-screen flex flex-col md:pl-64">
      {/* SIDEBAR NAVIGATION (Nằm trong nội dung chính) */}
      <div className="max-w-5xl w-full mx-auto p-8">
        <div className="flex gap-8 border-b border-[#3E4143] mb-8">
          <button
            onClick={() => setActiveStep(1)}
            className={`pb-4 flex items-center gap-2 font-bold transition-all ${activeStep === 1 ? "border-b-2 border-purple-500 text-white" : "text-gray-400"}`}
          >
            <FontAwesomeIcon icon={faInfoCircle} /> Course Info
          </button>
          <button
            onClick={() => setActiveStep(2)}
            className={`pb-4 flex items-center gap-2 font-bold transition-all ${activeStep === 2 ? "border-b-2 border-purple-500 text-white" : "text-gray-400"}`}
          >
            <FontAwesomeIcon icon={faLayerGroup} /> Curriculum
          </button>
        </div>

        {/* STEP 1: THÔNG TIN KHÓA HỌC */}
        {activeStep === 1 && (
          <form
            className="space-y-6 animate-modal-backdrop block"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-2xl font-bold">Course Landing Page</h2>
            <div className="grid grid-cols-1 gap-6 bg-[#2D2F31] p-8 border border-[#3E4143]">
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-300">
                  Course Title
                </label>
                <input
                  type="text"
                  {...register("title")}
                  className="w-full bg-[#1C1D1F] border border-[#3E4143] p-3 focus:border-purple-500 outline-none"
                  placeholder="e.g. Learn Architecture from Scratch"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-gray-300">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  {...register("desc")}
                  className="w-full bg-[#1C1D1F] border border-[#3E4143] p-3 focus:border-purple-500 outline-none"
                  placeholder="Insert your course description"
                />
                {errors.desc && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.desc.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                {
                  <AppDropdown
                    title={"Category"}
                    nameDropDown={"category"}
                    openDropdown={openCategory}
                    setOpenDropDown={setOpenCategory}
                    data={categorys}
                    currentValue={courseInfo.category}
                    action={(item) =>
                      setCourseInfo({
                        ...courseInfo,
                        category: item,
                      })
                    }
                  />
                }
                {
                  <AppDropdown
                    title={"Level"}
                    nameDropDown={"level"}
                    openDropdown={openLevel}
                    setOpenDropDown={setOpenLevel}
                    data={COURSE_LEVELS}
                    currentValue={courseInfo.level}
                    action={(item) =>
                      setCourseInfo({
                        ...courseInfo,
                        level: item,
                      })
                    }
                  />
                }
              </div>
              <div className="flex gap-3 flex-col lg:flex-row">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold mb-2">
                    <FontAwesomeIcon icon={faTag} className="text-blue-500" />
                    <span>Price</span>
                    <span className="font-normal text-gray-500 flex items-center gap-1">
                      (<FontAwesomeIcon icon={faInfoCircle} size="xs" /> 1000
                      VND = 1{" "}
                      <FontAwesomeIcon
                        icon={faCoins}
                        size="xs"
                        className="text-yellow-500"
                      />
                      )
                    </span>
                    <span className="font-normal text-green-600 ml-1">
                      (0 <FontAwesomeIcon icon={faExchangeAlt} size="xs" />{" "}
                      Free)
                    </span>
                  </label>
                  <input
                    type="number"
                    {...register("price")}
                    className="w-full bg-[#1C1D1F] border border-[#3E4143] p-3 focus:border-purple-500 outline-none"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div className="grow">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-300">
                      Link youtube
                    </label>
                    <div className="flex w-full bg-[#1C1D1F] border border-[#3E4143] p-3 focus-within:border-purple-500 items-center gap-3">
                      <FontAwesomeIcon
                        icon={faLink}
                        className="text-gray-400"
                      />

                      {/* Đường kẻ ngăn cách */}
                      <div className="h-6 border-r border-[#3E4143]"></div>

                      <input
                        {...register("ytb")}
                        className="outline-none bg-transparent flex-1"
                        placeholder="e.g. Learn Architecture from Scratch"
                      />
                      {errors.ytb && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.ytb.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveStep(2)}
                className="bg-[#A435F0] py-3 px-8 font-bold self-start hover:bg-[#8710D8]"
              >
                Create content
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: CURRICULUM (PHẦN BẠN ĐÃ CÓ) */}
        {activeStep === 2 && (
          <div className="animate-modal-backdrop">
            <h2 className="text-2xl font-bold mb-6">Curriculum</h2>
            <div className="space-y-6">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="bg-[#2D2F31] border border-[#3E4143] p-6 rounded-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <input
                      className="bg-transparent text-xl font-bold focus:outline-none border-b border-transparent focus:border-purple-500 flex-grow"
                      value={section.title}
                      onChange={(e) =>
                        setSections(
                          sections.map((s) =>
                            s.id === section.id
                              ? { ...s, title: e.target.value }
                              : s,
                          ),
                        )
                      }
                    />
                    <button
                      onClick={() => deleteSection(section.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {section.lectures.map((lecture) => (
                      <div key={lecture.id}>
                        {lecture.isEditing ? (
                          <div className="bg-[#1C1D1F] border border-[#3E4143] p-6 space-y-4">
                            <input
                              placeholder="Lecture Title"
                              className="w-full bg-[#2D2F31] border border-[#3E4143] p-2 outline-none"
                              value={lecture.title}
                              onChange={(e) =>
                                updateLecture(
                                  section.id,
                                  lecture.id,
                                  "title",
                                  e.target.value,
                                )
                              }
                            />
                            <select
                              className="w-full bg-[#2D2F31] border border-[#3E4143] p-2 outline-none"
                              value={lecture.type}
                              onChange={(e) =>
                                updateLecture(
                                  section.id,
                                  lecture.id,
                                  "type",
                                  e.target.value,
                                )
                              }
                            >
                              <option value="video">
                                Video (YouTube link)
                              </option>
                              <option value="article">Text (Article)</option>
                            </select>
                            {lecture.type === "video" ? (
                              <input
                                placeholder="YouTube URL"
                                className="w-full bg-[#2D2F31] border border-[#3E4143] p-2 outline-none"
                                value={lecture.content}
                                onChange={(e) =>
                                  updateLecture(
                                    section.id,
                                    lecture.id,
                                    "content",
                                    e.target.value,
                                  )
                                }
                              />
                            ) : (
                              <textarea
                                placeholder="Article Content"
                                className="w-full bg-[#2D2F31] border border-[#3E4143] p-2 outline-none h-24"
                                value={lecture.content}
                                onChange={(e) =>
                                  updateLecture(
                                    section.id,
                                    lecture.id,
                                    "content",
                                    e.target.value,
                                  )
                                }
                              />
                            )}
                            <div className="flex justify-end gap-3">
                              <button
                                onClick={() =>
                                  deleteLecture(section.id, lecture.id)
                                }
                                className="text-red-400 font-bold"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() =>
                                  toggleEditLecture(section.id, lecture.id)
                                }
                                className="bg-purple-600 px-4 py-1 font-bold"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() =>
                              toggleEditLecture(section.id, lecture.id)
                            }
                            className="flex justify-between items-center p-3 border border-[#3E4143] hover:bg-[#3E4143] cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <FontAwesomeIcon
                                icon={
                                  lecture.type === "video"
                                    ? faPlayCircle
                                    : faFileAlt
                                }
                                className="text-gray-400"
                              />
                              <span>{lecture.title || "Untitled Lecture"}</span>
                            </div>
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteLecture(section.id, lecture.id);
                              }}
                              className="text-gray-500 hover:text-red-500"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addLecture(section.id)}
                      className="w-full py-2 border border-dashed border-gray-500 text-gray-400 hover:bg-[#3E4143]"
                    >
                      + Add Lecture
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addSection}
                className="bg-white text-black px-6 py-2 font-bold hover:bg-gray-200"
              >
                + Add Section
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateContentCreator;
