import { CheckIcon, CheckCheckIcon } from "lucide-react";

function MessageStatus({ message }) {
  if (message.readAt) {
    return (
      <CheckCheckIcon className="message-status message-status-read" />
    );
  }

  if (message.deliveredAt) {
    return (
      <CheckCheckIcon className="message-status message-status-delivered" />
    );
  }

  return (
    <CheckIcon className="message-status message-status-sent" />
  );
}

export default MessageStatus;
