import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

function ContactList() {
  const {
    getAllContacts,
    allContacts,
    openConversation,
    selectedUser,
    isUsersLoading,
    searchQuery,
  } = useChatStore();

  const onlineUsers = useAuthStore(
    (state) => state.onlineUsers,
  );

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  const query = searchQuery.trim().toLowerCase();

  const contacts = [...allContacts]
    .filter((contact) =>
      contact.fullName.toLowerCase().includes(query),
    )
    .sort((a, b) => a.fullName.localeCompare(b.fullName));

  if (contacts.length === 0) {
    return <p className="empty-list-copy">No contacts found.</p>;
  }

  return (
    <div className="person-list-divided">
      {contacts.map((contact) => {
        const isOnline = onlineUsers.includes(
          String(contact._id),
        );
        const selected =
          String(selectedUser?._id) === String(contact._id);

        return (
          <button
            type="button"
            key={contact._id}
            className={`person-card ${
              selected ? "person-card-selected" : ""
            }`}
            onClick={() => openConversation(contact)}
          >
            <span className="person-avatar-wrap">
              <img
                src={
                  contact.ProfilePic ||
                  contact.profilePic ||
                  "/avatar.png"
                }
                alt={contact.fullName}
                className="person-avatar"
              />
              <span
                className={`person-status ${
                  isOnline ? "person-status-online" : ""
                }`}
              />
            </span>

            <span className="person-copy person-copy-grow">
              <strong>{contact.fullName}</strong>
              <span>{isOnline ? "Online" : "Offline"}</span>
            </span>

            {contact.unreadCount > 0 && (
              <span className="unread-badge">
                {contact.unreadCount > 99
                  ? "99+"
                  : contact.unreadCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ContactList;
