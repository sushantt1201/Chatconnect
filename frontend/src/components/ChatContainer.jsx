import {
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { Trash2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageStatus from "./MessageStatus";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";

function ChatContainer() {
  const {
    selectedUser,
    messages,
    isMessagesLoading,
    deleteMessage,
  } = useChatStore();

  const authUser = useAuthStore((state) => state.authUser);
  const scrollRef = useRef(null);
  const previousCountRef = useRef(0);

  const scrollToBottom = (behavior = "auto") => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  };

  useLayoutEffect(() => {
    if (!isMessagesLoading) {
      requestAnimationFrame(() => scrollToBottom("auto"));
      previousCountRef.current = messages.length;
    }
  }, [selectedUser?._id, isMessagesLoading]);

  useEffect(() => {
    if (messages.length > previousCountRef.current) {
      requestAnimationFrame(() => scrollToBottom("smooth"));
    }

    previousCountRef.current = messages.length;
  }, [messages]);

  return (
    <>
      <ChatHeader />

      <div
        ref={scrollRef}
        className="messages-scroll messages-texture"
      >
        <div className="messages-inner">
          {isMessagesLoading ? (
            <MessagesLoadingSkeleton />
          ) : messages.length === 0 ? (
            <NoChatHistoryPlaceholder
              name={selectedUser.fullName}
            />
          ) : (
            <div className="message-stack">
              {messages.map((message) => {
                const isOwn =
                  String(message.senderId) ===
                  String(authUser._id);

                return (
                  <div
                    key={message._id}
                    className={`message-row ${
                      isOwn
                        ? "message-row-own"
                        : "message-row-other"
                    }`}
                  >
                    <div
                      className={`message-bubble-modern ${
                        isOwn
                          ? "message-bubble-own"
                          : "message-bubble-other"
                      }`}
                    >
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Shared attachment"
                        />
                      )}

                      {message.text && <p>{message.text}</p>}

                      <span className="message-meta">
                        <span className="message-time">
                          {new Date(
                            message.createdAt,
                          ).toLocaleTimeString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>

                        {isOwn && (
                          <>
                            <MessageStatus message={message} />

                            {!message.isOptimistic && (
                              <button
                                type="button"
                                className="message-delete-button"
                                title="Delete for everyone"
                                aria-label="Delete message"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Delete this message for everyone?",
                                    )
                                  ) {
                                    deleteMessage(message._id);
                                  }
                                }}
                              >
                                <Trash2Icon />
                              </button>
                            )}
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
