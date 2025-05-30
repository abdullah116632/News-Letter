import { redirect } from "next/navigation";
import { getServerAxios } from "@/lib/server-axios";
import ProfileCard from "@/components/profileRoute/ProfileCard";
import ButtonGroup from "@/components/profileRoute/ButtonGroup";
import ReviewForm from "@/components/profileRoute/ReviewForm";
// import { profileData } from "@/data/profile";

export const dynamic = "force-dynamic";


const UserProfile = async () => {
  const axios = await getServerAxios();
  let profileData = null;

  try {
    const response = await axios.get("/user/");
    profileData = response.data.data.user;
  } catch (err) {
    console.error("Error fetching profile:", err);
    redirect("/");
  }
  

  return (
    <div className="min-h-screen text-white p-4 md:p-10">
      {/* Title */}
      <h1 className="text-center text-3xl font-dmSans md:text-4xl font-bold mb-8">
        YOUR PROFILE
      </h1>

      <ProfileCard profileData={profileData} />
      <ButtonGroup />

      {/* Newsletter Section */}
      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <ReviewForm />

        {/* Skills Section */}
        <div
          className="border-2 border-white/30 p-6 rounded-xl bg-cover bg-center relative overflow-hidden"
          // style={{ backgroundImage: "url(/skills-bg.jpg)" }}
        >
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
