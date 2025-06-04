"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "@/components/profileRoute/ProfileCard";
import ButtonGroup from "@/components/profileRoute/ButtonGroup";
import ReviewForm from "@/components/profileRoute/ReviewForm";
import api from "@/lib/client-axios";

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  console.log(profileData)
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/user/");
        setProfileData(response.data.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
        router.push("/");
      }
    };

    fetchData();
  }, []);

  if (!profileData) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="min-h-screen text-white p-4 md:p-10">
      <h1 className="text-center text-3xl font-dmSans md:text-4xl font-bold mb-8">
        YOUR PROFILE
      </h1>

      <ProfileCard profileData={profileData} />
      <ButtonGroup />

      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <ReviewForm />

        <div className="border-2 border-white/30 p-6 rounded-xl bg-cover bg-center relative overflow-hidden">
          <h2 className="text-2xl font-bold text-red-400 mb-4">YOUR SKILLS</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <ul className="space-y-1">
              <li>Presentation Slide Making</li>
              <li>Graphics Design</li>
              <li>Video Editing</li>
              <li>Motion Graphics Design</li>
              <li>Poster Design</li>
              <li>Academic Paper writing</li>
              <li>Scientific Paper Writing</li>
              <li>Scientific Figure Making</li>
              <li>Cv making</li>
              <li>UI/UX Design</li>
            </ul>
            <ul className="space-y-1">
              <li>Data visualization</li>
              <li>Content Writing</li>
              <li>Data Analysis( R )</li>
              <li>Motion Graphics Design</li>
              <li>Poster Design</li>
              <li>Academic Paper writing</li>
              <li>Scientific Paper Writing</li>
              <li>Scientific Figure Making</li>
              <li>CV making</li>
              <li>UI/UX Design</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
