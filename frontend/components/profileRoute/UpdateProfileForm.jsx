"use client";

import { useState } from "react";
import { profileData } from "@/data/profile";

const UpdateProfileForm = ({ onClose }) => {
  const [formData, setFormData] = useState({ ...profileData });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitted Data:", formData);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white text-black max-h-[90vh] w-full max-w-2xl rounded-xl overflow-y-auto hide-scrollbar p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-xl">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          {/* Profession */}
          <div>
            <label className="block text-sm font-medium mb-1">Profession</label>
            <input
              name="profession"
              type="text"
              value={formData.profession}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-sm font-medium mb-1">Occupation</label>
            <input
              name="occupation"
              type="text"
              value={formData.occupation}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          {/* Institution */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Institution
            </label>
            <input
              name="institution"
              type="text"
              value={formData.institution}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          {/* Field of Study with Suggestions */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Field of Study
            </label>
            <input
              name="fieldOfStudy"
              list="field-options"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <datalist id="field-options">
              <option value="Computer Science" />
              <option value="Engineering" />
              <option value="Biology" />
              <option value="Mathematics" />
              <option value="Economics" />
            </datalist>
          </div>

          {/* Subject of Interest */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Subject of Interest
            </label>
            <input
              name="interest"
              type="text"
              value={formData.interest}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          {/* Prior Research Experience (Radio) */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Prior Research Experience
            </label>
            <div className="flex gap-6">
              {["Yes", "No"].map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="priorResearchExperience"
                    value={option}
                    checked={formData.priorResearchExperience === option}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* English Proficiency (Radio) */}
          <div>
            <label className="block text-sm font-medium mb-1">
              English Proficiency
            </label>
            <div className="flex gap-4 flex-wrap">
              {["Beginner", "Intermediate", "Advanced", "Fluent"].map(
                (level) => (
                  <label
                    key={level}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="radio"
                      name="englishProficiency"
                      value={level}
                      checked={formData.englishProficiency === level}
                      onChange={handleChange}
                    />
                    {level}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Preferred Degree */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Degree
            </label>
            <input
              name="preferredDegree"
              type="text"
              value={formData.preferredDegree}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          {/* Country Preference */}
          {/* Country Preference (Multi-select Dropdown) */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Country Preference
            </label>
            {/* <select
              name="countrypreference"
              multiple
              value={formData.countrypreference}
              onChange={(e) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions
                ).map((option) => option.value);
                setFormData((prev) => ({
                  ...prev,
                  countrypreference: selectedOptions,
                }));
              }}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm h-40 overflow-y-auto"
            >
              {[
                "Afghanistan",
                "Albania",
                "Algeria",
                "Andorra",
                "Angola",
                "Argentina",
                "Armenia",
                "Australia",
                "Austria",
                "Azerbaijan",
                "Bahamas",
                "Bahrain",
                "Bangladesh",
                "Barbados",
                "Belarus",
                "Belgium",
                "Belize",
                "Benin",
                "Bhutan",
                "Bolivia",
                "Bosnia and Herzegovina",
                "Botswana",
                "Brazil",
                "Brunei",
                "Bulgaria",
                "Burkina Faso",
                "Burundi",
                "Cambodia",
                "Cameroon",
                "Canada",
                "Cape Verde",
                "Chad",
                "Chile",
                "China",
                "Colombia",
                "Comoros",
                "Costa Rica",
                "Croatia",
                "Cuba",
                "Cyprus",
                "Czech Republic",
                "Denmark",
                "Djibouti",
                "Dominica",
                "Dominican Republic",
                "Ecuador",
                "Egypt",
                "El Salvador",
                "Equatorial Guinea",
                "Eritrea",
                "Estonia",
                "Eswatini",
                "Ethiopia",
                "Fiji",
                "Finland",
                "France",
                "Gabon",
                "Gambia",
                "Georgia",
                "Germany",
                "Ghana",
                "Greece",
                "Grenada",
                "Guatemala",
                "Guinea",
                "Guyana",
                "Haiti",
                "Honduras",
                "Hungary",
                "Iceland",
                "India",
                "Indonesia",
                "Iran",
                "Iraq",
                "Ireland",
                "Israel",
                "Italy",
                "Ivory Coast",
                "Jamaica",
                "Japan",
                "Jordan",
                "Kazakhstan",
                "Kenya",
                "Kiribati",
                "Kuwait",
                "Kyrgyzstan",
                "Laos",
                "Latvia",
                "Lebanon",
                "Lesotho",
                "Liberia",
                "Libya",
                "Liechtenstein",
                "Lithuania",
                "Luxembourg",
                "Madagascar",
                "Malawi",
                "Malaysia",
                "Maldives",
                "Mali",
                "Malta",
                "Mauritania",
                "Mauritius",
                "Mexico",
                "Micronesia",
                "Moldova",
                "Monaco",
                "Mongolia",
                "Montenegro",
                "Morocco",
                "Mozambique",
                "Myanmar",
                "Namibia",
                "Nauru",
                "Nepal",
                "Netherlands",
                "New Zealand",
                "Nicaragua",
                "Niger",
                "Nigeria",
                "North Korea",
                "North Macedonia",
                "Norway",
                "Oman",
                "Pakistan",
                "Palau",
                "Panama",
                "Papua New Guinea",
                "Paraguay",
                "Peru",
                "Philippines",
                "Poland",
                "Portugal",
                "Qatar",
                "Romania",
                "Russia",
                "Rwanda",
                "Saint Kitts and Nevis",
                "Saint Lucia",
                "Saint Vincent and the Grenadines",
                "Samoa",
                "San Marino",
                "Sao Tome and Principe",
                "Saudi Arabia",
                "Senegal",
                "Serbia",
                "Seychelles",
                "Sierra Leone",
                "Singapore",
                "Slovakia",
                "Slovenia",
                "Solomon Islands",
                "Somalia",
                "South Africa",
                "South Korea",
                "South Sudan",
                "Spain",
                "Sri Lanka",
                "Sudan",
                "Suriname",
                "Sweden",
                "Switzerland",
                "Syria",
                "Taiwan",
                "Tajikistan",
                "Tanzania",
                "Thailand",
                "Timor-Leste",
                "Togo",
                "Tonga",
                "Trinidad and Tobago",
                "Tunisia",
                "Turkey",
                "Turkmenistan",
                "Tuvalu",
                "Uganda",
                "Ukraine",
                "United Arab Emirates",
                "United Kingdom",
                "United States",
                "Uruguay",
                "Uzbekistan",
                "Vanuatu",
                "Vatican City",
                "Venezuela",
                "Vietnam",
                "Yemen",
                "Zambia",
                "Zimbabwe",
              ].map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select> */}
            <select
              name="countrypreference"
            //   value={formData.package}
            //   onChange={handleChange}
              className={`w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm h-40 overflow-y-auto`}
            >
              {[
                "Afghanistan",
                "Albania",
                "Algeria",
                "Andorra",
                "Angola",
                "Argentina",
                "Armenia",
                "Australia",
                "Austria",
                "Azerbaijan",
                "Bahamas",
                "Bahrain",
                "Bangladesh",
                "Barbados",
                "Belarus",
                "Belgium",
                "Belize",
                "Benin",
                "Bhutan",
                "Bolivia",
                "Bosnia and Herzegovina",
                "Botswana",
                "Brazil",
                "Brunei",
                "Bulgaria",
                "Burkina Faso",
                "Burundi",
                "Cambodia",
                "Cameroon",
                "Canada",
                "Cape Verde",
                "Chad",
                "Chile",
                "China",
                "Colombia",
                "Comoros",
                "Costa Rica",
                "Croatia",
                "Cuba",
                "Cyprus",
                "Czech Republic",
                "Denmark",
                "Djibouti",
                "Dominica",
                "Dominican Republic",
                "Ecuador",
                "Egypt",
                "El Salvador",
                "Equatorial Guinea",
                "Eritrea",
                "Estonia",
                "Eswatini",
                "Ethiopia",
                "Fiji",
                "Finland",
                "France",
                "Gabon",
                "Gambia",
                "Georgia",
                "Germany",
                "Ghana",
                "Greece",
                "Grenada",
                "Guatemala",
                "Guinea",
                "Guyana",
                "Haiti",
                "Honduras",
                "Hungary",
                "Iceland",
                "India",
                "Indonesia",
                "Iran",
                "Iraq",
                "Ireland",
                "Israel",
                "Italy",
                "Ivory Coast",
                "Jamaica",
                "Japan",
                "Jordan",
                "Kazakhstan",
                "Kenya",
                "Kiribati",
                "Kuwait",
                "Kyrgyzstan",
                "Laos",
                "Latvia",
                "Lebanon",
                "Lesotho",
                "Liberia",
                "Libya",
                "Liechtenstein",
                "Lithuania",
                "Luxembourg",
                "Madagascar",
                "Malawi",
                "Malaysia",
                "Maldives",
                "Mali",
                "Malta",
                "Mauritania",
                "Mauritius",
                "Mexico",
                "Micronesia",
                "Moldova",
                "Monaco",
                "Mongolia",
                "Montenegro",
                "Morocco",
                "Mozambique",
                "Myanmar",
                "Namibia",
                "Nauru",
                "Nepal",
                "Netherlands",
                "New Zealand",
                "Nicaragua",
                "Niger",
                "Nigeria",
                "North Korea",
                "North Macedonia",
                "Norway",
                "Oman",
                "Pakistan",
                "Palau",
                "Panama",
                "Papua New Guinea",
                "Paraguay",
                "Peru",
                "Philippines",
                "Poland",
                "Portugal",
                "Qatar",
                "Romania",
                "Russia",
                "Rwanda",
                "Saint Kitts and Nevis",
                "Saint Lucia",
                "Saint Vincent and the Grenadines",
                "Samoa",
                "San Marino",
                "Sao Tome and Principe",
                "Saudi Arabia",
                "Senegal",
                "Serbia",
                "Seychelles",
                "Sierra Leone",
                "Singapore",
                "Slovakia",
                "Slovenia",
                "Solomon Islands",
                "Somalia",
                "South Africa",
                "South Korea",
                "South Sudan",
                "Spain",
                "Sri Lanka",
                "Sudan",
                "Suriname",
                "Sweden",
                "Switzerland",
                "Syria",
                "Taiwan",
                "Tajikistan",
                "Tanzania",
                "Thailand",
                "Timor-Leste",
                "Togo",
                "Tonga",
                "Trinidad and Tobago",
                "Tunisia",
                "Turkey",
                "Turkmenistan",
                "Tuvalu",
                "Uganda",
                "Ukraine",
                "United Arab Emirates",
                "United Kingdom",
                "United States",
                "Uruguay",
                "Uzbekistan",
                "Vanuatu",
                "Vatican City",
                "Venezuela",
                "Vietnam",
                "Yemen",
                "Zambia",
                "Zimbabwe",
              ].map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Internship Preference */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Internship Preference
            </label>
            <input
              name="internshipJobPreferences"
              type="text"
              value={formData.internshipJobPreferences}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          {/* Preferred Fields of Opportunity */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Fields of Opportunity
            </label>
            <input
              name="preferredFieldsofOpportunity"
              type="text"
              value={formData.preferredFieldsofOpportunity}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium mb-1">Skills</label>
            <input
              name="skills"
              type="text"
              value={formData.skills}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          {/* Read-Only Fields */}
          {[
            { label: "Email", name: "email" },
            { label: "Active Package", name: "activePackage" },
            { label: "Starting Date", name: "startingDate" },
            { label: "Ending Date", name: "endingDate" },
            { label: "Payment Method", name: "paymentMethod" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                name={name}
                type="text"
                value={formData[name]}
                readOnly
                className="w-full p-2 rounded-md border border-gray-200 bg-gray-100 text-gray-500 text-sm"
              />
            </div>
          ))}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition flex items-center gap-2"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
              ) : (
                "SUBMIT"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
