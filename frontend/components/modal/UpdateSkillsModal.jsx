import { updateSkills } from "@/redux/slices/authSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";

const MAX_SKILLS = 20;

const UpdateSkillsModal = ({ onClose, data }) => {
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setSkills(data);
    }
  }, [data]);

  const handleChange = (index, value) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const handleAdd = () => {
    if (skills.length <= MAX_SKILLS) {
      setSkills([...skills, ""]);
    }
  };

  const handleRemove = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleaned = skills.map(s => s.trim()).filter(Boolean);
    console.log(cleaned)
    try {
      await dispatch(updateSkills(cleaned)).unwrap();
      toast.success("Skills updated successfully!");
      onClose();
    } catch (err) {
      toast.error(err?.message || "Failed to update skills");
      console.error("Update skills error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-full max-w-lg"
      >
        <h2 className="text-xl font-bold mb-4">Update Your Skills</h2>

        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
          {skills.length === 0 && (
            <p className="text-gray-500">No skills added yet. Add some!</p>
          )}
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-full border px-3 py-1 rounded text-black"
                placeholder={`Skill ${index + 1}`}
                maxLength={30}
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
                aria-label="Remove skill"
              >
                <RxCross2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={handleAdd}
            disabled={skills.length >= MAX_SKILLS}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
          >
            Add Skill
          </button>

          <div className="space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 cursor-pointer text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateSkillsModal;
