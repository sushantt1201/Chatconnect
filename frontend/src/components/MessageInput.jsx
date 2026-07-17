import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (!text.trim() && !imagePreview) return;

    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });

    setText("");
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="message-composer-wrap">
      {imagePreview && (
        <div className="image-preview-row">
          <div className="image-preview-card">
            <img src={imagePreview} alt="Upload preview" />
            <button
              type="button"
              className="image-preview-remove"
              onClick={removeImage}
              aria-label="Remove image"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form className="message-composer" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            if (isSoundEnabled) playRandomKeyStrokeSound();
          }}
          placeholder="Write a message..."
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          className={`composer-icon-button ${
            imagePreview ? "composer-icon-active" : ""
          }`}
          onClick={() => fileInputRef.current?.click()}
          aria-label="Attach image"
        >
          <ImageIcon />
        </button>

        <button
          type="submit"
          className="composer-send-button"
          disabled={!text.trim() && !imagePreview}
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
