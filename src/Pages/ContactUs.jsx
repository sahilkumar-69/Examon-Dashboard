import { useState } from "react";
import { MdCancel } from "react-icons/md";
import ListingPageHeader from "../Component/Header/ListingPageHeader";
import { useGetContent } from "../hooks/useHooks";
import Loader from "../Component/Loader";

export default function ContactDetailsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState({
    message: "",
    isOpen: false,
  });

  const { data, isLoading, isError, error } = useGetContent({
    keys: ["contactUs"],
    handlerProps: {
      url: "http://localhost:3000/contacts",
    },
  });

  if (isLoading) return <Loader />;

  if (isError) {
    console.log(error);
    return;
  }

  console.log(data);

  const contacts = [
    {
      fname: "Abdul",
      lname: "Azeem",
      phoneNo: "1111",
      email: "abdulazeem3802@gmail.com",
      message: "ABDUL AZEEM",
    },
    {
      fname: "anupam",
      lname: "upadhyay",
      phoneNo: "2222",
      email: "anupamupadhyay@gmail.com",
      message: "ANUPAM UPADHYAY",
    },
    {
      fname: "ankit",
      lname: "yadav",
      phoneNo: "333333",
      email: "ankityadav@gmail.com",
      message: "ANKIT YADAV",
    },
  ];

  const thClass = "py-3 px-4 text-sm font-bold text-gray-700";

  const headerProps = {
    heading: "Contact Submission",
    searchTerm,
    setSearchTerm,
    hideBtn: true,
    placeholder: "Search Name, Email, Ph...",
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact?.fname
        ?.trim()
        .toLowerCase()
        .includes(searchTerm?.trim().toLowerCase()) ||
      contact?.lname
        ?.trim()
        .toLowerCase()
        .includes(searchTerm?.trim().toLowerCase()) ||
      contact?.email
        ?.trim()
        .toLowerCase()
        .includes(searchTerm?.trim().toLowerCase()) ||
      contact?.phoneNo
        ?.trim()
        .toLowerCase()
        .includes(searchTerm?.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ListingPageHeader props={headerProps} />

      <table className="w-full border border-gray-200 bg-white shadow rounded-b-lg overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className={thClass}>Serial No.</th>
            <th className={thClass}>Full Name</th>
            <th className={thClass}>Phone Number</th>
            <th className={thClass}>Email</th>
            <th className={thClass}>Message</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length === 0 ? (
            <tr>
              <th className="font-normal text-center py-2" colSpan={5}>
                No record found
              </th>
            </tr>
          ) : (
            filteredContacts.map((value, idx) => (
              <tr
                key={idx}
                className="border-t  hover:bg-gray-200 rounded-2xl   transition"
              >
                <td className="py-3 px-4 text-gray-700 text-sm">{idx + 1}</td>
                <td className="py-3 px-4 text-gray-800">
                  {value.fname} {value.lname}
                </td>
                <td className="py-3 px-4 text-gray-800">{value.phoneNo}</td>
                <td className="py-3 px-4 text-gray-800">{value.email}</td>

                <td className="py-3 px-4">
                  <button
                    onClick={() =>
                      setModalOpen({ isOpen: true, message: value.message })
                    }
                    className="text-blue-600 cursor-pointer hover:text-blue-800 underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen.isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 relative shadow-xl animate-scaleIn">
            <button
              onClick={() => setModalOpen({ isOpen: false, message: "" })}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <MdCancel size={20} />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Message Details
            </h2>
            <p className="text-gray-700 leading-relaxed">{modalOpen.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
