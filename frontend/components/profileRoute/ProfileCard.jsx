

import Image from "next/image";
import UpdatePopUpButton from "./UpdatePopUpButton";


const profileCard = ({profileData}) => {
  
  return (
    <div className="relative bg-[#7C7C7C57] rounded-2xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 border-2 border-white/20">
      <UpdatePopUpButton />
        <div className="flex flex-col lg:flex-row gap-5 pr-12 pt-2.5 lg:border-r-2 w-full lg:w-1/2">
          <div className="flex flex-col items-center text-center md:text-left">
            <Image
              src={profileData.img} // Replace with actual profile image
              alt="Profile Picture"
              width={200}
              height={250}
              className="rounded-lg border-2 border-white/30"
            />
          </div>
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold mt-4">
              {profileData.fullName}
            </h2>
            <p className="text-sm my-2">
              {profileData.profession}
            </p>
            <div className="mt-2 text-sm">
              <p className="flex">
                <span className="min-w-36">Email</span>
                <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                  : {profileData.email}
                </span>
              </p>
              <p className="flex">
                <span className="min-w-36">Active Package</span>
                <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                  : {profileData.activePackage}
                </span>
              </p>
              <p className="flex">
                <span className="min-w-36">Starting Date</span>
                <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                  : {profileData.startingDate}
                </span>
              </p>
              <p className="flex">
                <span className="min-w-36">Ending Date</span>
                <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                  : {profileData.endingDate}
                </span>
              </p>
              <p className="flex">
                <span className="min-w-36">Payment Method</span>
                <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                  : {profileData.paymentMethod}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="text-sm md:text-base w-full md:w-1/2">
          <div className="grid grid-cols-1 gap-y-2 text-sm">
            <div className="flex">
              <span className="min-w-56">Occupation</span>
              <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                : <span className="text-gray-300">{profileData.occupation}</span>
              </span>
            </div>
            <div className="flex">
              <span className="min-w-56">Institution</span>
              <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                :{" "}
                <span className="text-gray-300">
                  {profileData.institution}
                </span>
              </span>
            </div>
            <div className="flex">
              <span className="min-w-56">Field of Study / Major</span>
              <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                : <span className="text-gray-300">{profileData.fieldOfStudy}</span>
              </span>
            </div>
            <div className="flex">
              <span className="min-w-56">Subject of Interest</span>
              <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                : <span className="text-gray-300">{profileData.interest}</span>
              </span>
            </div>
            <div className="flex">
              <span className="min-w-56">Prior Research Experience</span>
              <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                : <span className="text-gray-300">{profileData.priorResearchExperience}</span>
              </span>
            </div>
            <div className="flex">
              <span className="min-w-56">English Proficiency</span>
              <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                : <span className="text-gray-300">{profileData.englishProficiency}</span>
              </span>
            </div>
            <div className="flex">
              <span className="min-w-56">Preferred Degree</span>
              <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                : <span className="text-gray-300">{profileData.preferredDegree}</span>
              </span>
            </div>
            <div className="flex">
              <span className="min-w-56">Country Preference</span>
              <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                : <span className="text-gray-300">{profileData.countrypreference}</span>
              </span>
            </div>
            <div className="flex">
              <span className="min-w-56">Internship/Job Preference</span>
              <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                : <span className="text-gray-300">{profileData.internshipJobPreferences}</span>
              </span>
            </div>
            <div className="flex">
              <span className="min-w-56">Preferred Fields of Opportunity</span>
              <span className="overflow-x-scroll hide-scrollbar whitespace-nowrap">
                :{" "}
                <span className="text-gray-300">
                  {profileData.preferredFieldsofOpportunity}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
  );
}

export default profileCard;
