import { MessageCircleMoreIcon } from "lucide-react";

function NoConversationPlaceholder() {
  return (
    <div className="no-conversation-modern">
      <div>
        <div className="no-conversation-icon">
          <MessageCircleMoreIcon />
        </div>

        <h2>Your conversations, beautifully organized.</h2>
        <p>
          Choose a chat or select a contact from the sidebar to begin a secure,
          real-time conversation.
        </p>
      </div>
    </div>
  );
}

export default NoConversationPlaceholder;
