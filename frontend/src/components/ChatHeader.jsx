import { useEffect } from "react";
import { XIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <header className="chat-header-modern">
      <div className="chat-header-person">
        <span className="chat-header-avatar-wrap">
          <img
            src={
              selectedUser.ProfilePic ||
              selectedUser.profilePic ||
              "/avatar.png"
            }
            alt={selectedUser.fullName}
            className="chat-header-avatar"
          />
          <span
            className={`person-status ${isOnline ? "person-status-online" : ""}`}
          />
        </span>

        <div className="chat-header-copy">
          <h3>{selectedUser.fullName}</h3>
          <p className={isOnline ? "online-copy" : ""}>
            {isOnline ? "Online now" : "Offline"}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="icon-button"
        onClick={() => setSelectedUser(null)}
        aria-label="Close conversation"
      >
        <XIcon />
      </button>
    </header>
  );
}

export default ChatHeader;
