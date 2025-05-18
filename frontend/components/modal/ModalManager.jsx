import { closeModal } from "@/redux/slices/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";

const ModalManager = () => {
  const { modalName, isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleClose = () => dispatch(closeModal());

  switch (modalName) {
    case "signup":
      return <SignupModal onClose={handleClose} />;
    case "login":
        return <LoginModal onClose={handleClose} />;
    case "logout":
      return <LogoutModal onClose={handleClose} />
    default:
      return null;
  }
};

export default ModalManager;
