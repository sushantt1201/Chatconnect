import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatsList() {
  const {
    getMyChatPartners,
    chats,
    isUsersLoading,
    openConversation,
    selectedUser,
    searchQuery,
  } = useChatStore();

  const onlineUsers = useAuthStore(
    (state) => state.onlineUsers,
  );

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  const query = searchQuery.trim().toLowerCase();

  const filteredChats = chats.filter((chat) =>
    chat.fullName.toLowerCase().includes(query),
  );

  if (filteredChats.length === 0) {
    return <NoChatsFound />;
  }

  return (
    <div className="person-list-divided">
      {filteredChats.map((chat) => {
        const isOnline = onlineUsers.includes(
          String(chat._id),
        );
        const selected =
          String(selectedUser?._id) === String(chat._id);

        return (
          <button
            type="button"
            key={chat._id}
            className={`person-card ${
              selected ? "person-card-selected" : ""
            }`}
            onClick={() => openConversation(chat)}
          >
            <span className="person-avatar-wrap">
              <img
                src={
                  chat.ProfilePic ||
                  chat.profilePic ||
                  "/avatar.png"
                }
                alt={chat.fullName}
                className="person-avatar"
              />
              <span
                className={`person-status ${
                  isOnline ? "person-status-online" : ""
                }`}
              />
            </span>

            <span className="person-copy person-copy-grow">
              <strong>{chat.fullName}</strong>
              <span>
                {chat.lastMessage?.image
                  ? "Photo"
                  : chat.lastMessage?.text ||
                    (isOnline ? "Online" : "Offline")}
              </span>
            </span>

            {chat.unreadCount > 0 && (
              <span className="unread-badge">
                {chat.unreadCount > 99
                  ? "99+"
                  : chat.unreadCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ChatsList;
