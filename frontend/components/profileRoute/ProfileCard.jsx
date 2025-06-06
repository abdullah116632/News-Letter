import Image from "next/image";
import UpdatePopUpButton from "./UpdatePopUpButton";

const ProfileCard = ({ profileData, subscriptionData }) => {
  if (!profileData) {
    return <div>Loading failed or no user data available.</div>;
  }

  const renderValue = (value) => {
    if (Array.isArray(value)) return value.join(", ");
    return value || "";
  };

  const renderBoolean = (value) => {
    if (value === true) return "Yes";
    if (value === false) return "No";
    return "";
  };

  return (
    <div className="relative bg-[#7C7C7C57] rounded-2xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 border-2 border-white/20">
      <UpdatePopUpButton />

      <div className="flex flex-col lg:flex-row gap-5 pt-2.5  w-full lg:w-[40%]">
        <div className="flex flex-col items-center text-center md:text-left">
          <Image
            src={profileData?.img || "/images/userprofile.png"}
            alt="Profile Picture"
            width={200}
            height={250}
            className="rounded-lg border-2 border-white/30"
          />
        </div>
        <div className="w-full lg:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold mt-4">
            {renderValue(profileData?.fullName)}
          </h2>
          <div className="mt-2 text-sm">
            <p className="flex">
              <span className="min-w-36">Email</span>
              <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                : {renderValue(profileData?.email)}
              </span>
            </p>
            <p className="flex">
              <span className="min-w-36">Active Package</span>
              <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                : {renderValue(subscriptionData?.servicePlan?.title)}
              </span>
            </p>
            <p className="flex">
              <span className="min-w-36">Starting Date</span>
              <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                :{" "}
                {subscriptionData?.startingDate
                  ? new Date(subscriptionData?.startingDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : ""}
              </span>
            </p>
            <p className="flex">
              <span className="min-w-36">Ending Date</span>
              <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                :{" "}
                {subscriptionData?.endingDate
                  ? new Date(subscriptionData?.endingDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : ""}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="text-sm md:text-base w-full md:w-1/2 pl-12 lg:border-l-2">
        <div className="grid grid-cols-1 gap-y-2 text-sm">
          {[
            { label: "Profession", value: profileData?.profession },
            { label: "Occupation", value: profileData?.occupation },
            { label: "Institution", value: profileData?.institute },
            { label: "Field of Study / Major", value: profileData?.fieldOfStudy },
            { label: "Subject of Interest", value: profileData?.interests },
            {
              label: "Prior Research Experience",
              value: renderBoolean(profileData?.priorResearchExperience),
            },
            {
              label: "English Proficiency",
              value: renderBoolean(profileData?.englishProficiency),
            },
            { label: "Preferred Degree", value: profileData?.preferredDegree },
            { label: "Country Preference", value: profileData?.countrypreference },
            { label: "Internship/Job Preference", value: profileData?.internshipJobPreferences },
            {
              label: "Preferred Fields of Opportunity",
              value: profileData?.preferredFieldsofOpportunity,
            },
          ].map(({ label, value }) => (
            <div className="flex" key={label}>
              <span className="min-w-56">{label}</span>
              <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                : <span className="text-gray-300">{renderValue(value)}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
