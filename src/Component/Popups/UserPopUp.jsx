import { MdCancel } from "react-icons/md";

const UserPopUp = ({ setModalOpen, modalOpen }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 relative shadow-xl animate-scaleIn">
        <button
          onClick={() => setModalOpen({ isOpen: false, message: "" })}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <MdCancel size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Profile Detail
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {modalOpen.user.toString()}
        </p>
      </div>
    </div>
  );
};

export default UserPopUp;
