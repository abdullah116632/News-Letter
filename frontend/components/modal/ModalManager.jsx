import { closeModal } from "@/redux/slices/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";
import UpdateBlogModal from "./UpdateBlogModal";
import DeleteBlogModal from "./deleteBlogModal";
import DeleteReviewModal from "./reviewDeleteModal";
import UpdatePasswordModal from "./updatePasswordModal";
import UpdateUserModal from "../profileRoute/UpdateUserModal";
import ForgetPasswordModal from "./ForgetPasswordModal";
import VerifyOtpModal from "./VerifyOtpModal";
import ResetPasswordModal from "./ResetPasswordModal";
import AdminAccessModal from "./AdminAccessModal";
import SubscriptionDataModal from "./SubscriptionDataModal";

const ModalManager = () => {
  const { modalName, isOpen, data } = useSelector((state) => state.modal);
  console.log("modalmaneger",data)
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleClose = () => dispatch(closeModal());

  switch (modalName) {
    case "signup":
      return <SignupModal onClose={handleClose} />;
    case "login":
      return <LoginModal onClose={handleClose} />;
    case "logout":
      return <LogoutModal onClose={handleClose} />;
    case "updateBlog":
      return <UpdateBlogModal onClose={handleClose} blogData={data} />;
    case "deleteBlog":
      return <DeleteBlogModal onClose={handleClose} blogId={data} />;
    case "deleteReview":
      return <DeleteReviewModal onClose={handleClose} reviewId={data} />;
    case "updatePassword":
      return <UpdatePasswordModal onClose={handleClose} />;
    case "updateProfile":
      return <UpdateUserModal onClose={handleClose} />;
    case "forgotPassword":
      return <ForgetPasswordModal onClose={handleClose} />;
    case "verifyOtp":
      return <VerifyOtpModal onClose={handleClose} email={data} />;
    case "resetPassword":
      return <ResetPasswordModal onClose={handleClose} data={data} />;
    case "giveAdminAccess":
      return <AdminAccessModal user={data} onClose={handleClose} />;
    case "subscribedata":
      return <SubscriptionDataModal data={data} onClose={handleClose} />;

    default:
      return null;
  }
};

export default ModalManager;
