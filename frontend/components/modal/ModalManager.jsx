import { closeModal } from "@/redux/slices/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";
import UpdateBlogModal from "./UpdateBlogModal";
import DeleteBlogModal from "./deleteBlogModal";
import DeleteReviewModal from "./reviewDeleteModal";

const ModalManager = () => {
  const { modalName, isOpen, data } = useSelector((state) => state.modal);
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
    default:
      return null;
  }
};

export default ModalManager;
