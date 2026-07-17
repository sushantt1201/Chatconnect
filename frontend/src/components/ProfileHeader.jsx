import { useRef, useState } from "react";
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouseclick.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ ProfilePic: base64Image });
    };
  };

  const handleSoundToggle = () => {
    mouseClickSound.currentTime = 0;
    mouseClickSound
      .play()
      .catch((error) => console.log("Audio play failed:", error));
    toggleSound();
  };

  return (
    <header className="profile-header">
      <div className="profile-header-row">
        <div className="profile-identity">
          <button
            className="profile-avatar-button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Change profile picture"
          >
            <img
              src={selectedImg || authUser?.ProfilePic || "/avatar.png"}
              alt={authUser?.fullName || "Profile"}
            />
            <span className="profile-avatar-edit">Change</span>
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />

          <div className="profile-copy">
            <h3>{authUser?.fullName}</h3>
            <p>Online</p>
          </div>
        </div>

        <div className="profile-actions">
          <button
            className="icon-button"
            onClick={handleSoundToggle}
            aria-label={isSoundEnabled ? "Mute sounds" : "Enable sounds"}
          >
            {isSoundEnabled ? <Volume2Icon /> : <VolumeOffIcon />}
          </button>

          <button
            className="icon-button icon-button-danger"
            onClick={logout}
            aria-label="Log out"
          >
            <LogOutIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

export default ProfileHeader;
