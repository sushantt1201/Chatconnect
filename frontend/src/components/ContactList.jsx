import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  // Sort contacts by fullName ascending
  const sortedContacts = [...allContacts].sort((a, b) =>
    a.fullName.localeCompare(b.fullName)
  );

  return (
    <>
      {sortedContacts.length === 0 && (
        <p className="text-gray-400">No contacts found</p>
      )}

      {sortedContacts.map(contact => (
        <div
          key={contact._id}
          className="flex items-center p-2 cursor-pointer hover:bg-slate-700 rounded"
          onClick={() => setSelectedUser(contact)}
        >
          {/* Avatar */}
          <img
            src={contact.ProfilePic || "/avatar.png"}
            alt={contact.fullName}
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          {/* Name */}
          <p className="text-white font-semibold">{contact.fullName}</p>
        </div>
      ))}
    </>
  );
}

export default ContactList;