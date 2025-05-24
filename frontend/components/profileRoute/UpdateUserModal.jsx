"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserProfile } from "@/redux/slices/userSlice";

const UpdateUserModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.userData);
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    img: "",
    profession: "",
    occupation: "",
    institute: "",
    fieldOfStudy: [],
    interests: [],
    priorResearchExperience: "",
    englishProficiency: "",
    preferredDegree: "",
    countrypreference: [],
    internshipJobPreferences: [],
    preferredFieldsofOpportunity: [],
    skills: [],
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewFileUrl, setPreviewFileUrl] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        ...user,
      });
      setPreviewFileUrl(user.img || "/images/userprofile.png");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultiChange = (e, key) => {
    setFormData((prev) => ({
      ...prev,
      [key]: e.target.value.split(",").map((s) => s.trim()),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewFileUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    });

    if (selectedFile) {
      data.append("img", selectedFile);
    }

    try {
      await dispatch(updateUserProfile(data)).unwrap();
      toast.success("Profile updated successfully!");
      onClose();
    } catch (err) {
      console.log(err)
      toast.error(err?.message || "Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-y-auto hide-scrollbar">
      <div className="bg-gradient-to-br from-white/90 via-blue-100 to-purple-100 w-full max-w-2xl rounded-2xl p-8 shadow-2xl relative text-black">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-black text-xl font-bold hover:text-red-500"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Update Your Profile</h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <div
            className="w-24 h-24 rounded-full bg-gray-200 cursor-pointer border-2 border-gray-400 overflow-hidden"
            onClick={() => fileInputRef.current.click()}
          >
            <img
              src={previewFileUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />

          <input
            type="text"
            name="profession"
            placeholder="Profession"
            value={formData.profession || ""}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            name="occupation"
            placeholder="Occupation"
            value={formData.occupation || ""}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          />


          <input
            type="text"
            name="institute"
            placeholder="Institute"
            value={formData.institute || ""}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            name="preferredDegree"
            placeholder="Preferred Degree"
            value={formData.preferredDegree || ""}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          />

          {/* Multi-field inputs */}
          <input
            type="text"
            placeholder="Field of Study (comma-separated)"
            value={formData.fieldOfStudy.join(", ")}
            onChange={(e) => handleMultiChange(e, "fieldOfStudy")}
            className="px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            placeholder="Interests (comma-separated)"
            value={formData.interests.join(", ")}
            onChange={(e) => handleMultiChange(e, "interests")}
            className="px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            placeholder="Country Preferences (comma-separated)"
            value={formData.countrypreference.join(", ")}
            onChange={(e) => handleMultiChange(e, "countrypreference")}
            className="px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            placeholder="Internship/Job Preferences (comma-separated)"
            value={formData.internshipJobPreferences.join(", ")}
            onChange={(e) => handleMultiChange(e, "internshipJobPreferences")}
            className="px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            placeholder="Preferred Fields of Opportunity (comma-separated)"
            value={formData.preferredFieldsofOpportunity.join(", ")}
            onChange={(e) => handleMultiChange(e, "preferredFieldsofOpportunity")}
            className="px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            placeholder="Skills (comma-separated)"
            value={formData.skills.join(", ")}
            onChange={(e) => handleMultiChange(e, "skills")}
            className="px-4 py-2 border rounded-md"
          />

          <select
            name="priorResearchExperience"
            value={formData.priorResearchExperience || ""}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Prior Research Experience?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            name="englishProficiency"
            value={formData.englishProficiency || ""}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">English Proficiency?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <div className="col-span-full flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
