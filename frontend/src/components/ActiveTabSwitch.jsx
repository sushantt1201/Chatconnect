import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="chat-tabs">
      <button
        type="button"
        onClick={() => setActiveTab("chats")}
        className={`chat-tab ${activeTab === "chats" ? "chat-tab-active" : ""}`}
      >
        Chats
      </button>

      <button
        type="button"
        onClick={() => setActiveTab("contacts")}
        className={`chat-tab ${activeTab === "contacts" ? "chat-tab-active" : ""}`}
      >
        Contacts
      </button>
    </div>
  );
}

export default ActiveTabSwitch;
