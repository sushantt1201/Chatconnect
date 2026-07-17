import { useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const socket = useAuthStore((state) => state.socket);

  const {
    activeTab,
    selectedUser,
    searchQuery,
    setSearchQuery,
    subscribeToRealtime,
    unsubscribeFromRealtime,
  } = useChatStore();

  useEffect(() => {
    if (!socket) return undefined;

    const subscribe = () => subscribeToRealtime(socket);

    if (socket.connected) {
      subscribe();
    }

    socket.on("connect", subscribe);

    return () => {
      socket.off("connect", subscribe);
      unsubscribeFromRealtime(socket);
    };
  }, [socket, subscribeToRealtime, unsubscribeFromRealtime]);

  return (
    <main className="chat-page">
      <section className="chat-shell">
        <aside className="chat-sidebar">
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="people-list">
            {activeTab === "chats" ? (
              <ChatsList />
            ) : (
              <ContactList />
            )}
          </div>

          <div className="sidebar-search-wrap">
            <SearchIcon />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder={
                activeTab === "chats"
                  ? "Search conversations"
                  : "Search contacts"
              }
            />
          </div>
        </aside>

        <section
          className={`chat-main ${
            selectedUser ? "" : "chat-main-empty"
          }`}
        >
          {selectedUser ? (
            <ChatContainer />
          ) : (
            <NoConversationPlaceholder />
          )}
        </section>
      </section>
    </main>
  );
}

export default ChatPage;
