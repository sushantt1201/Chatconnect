import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PageLoader from "./components/PageLoader";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const location = useLocation();
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <PageLoader />;
  }

  const isChatRoute = location.pathname === "/";

  return (
    <div className={isChatRoute ? "app-chat-root" : "app-auth-root"}>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? <ChatPage /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/login"
          element={
            !authUser ? <LoginPage /> : <Navigate to="/" replace />
          }
        />

        <Route
          path="/signup"
          element={
            !authUser ? <SignUpPage /> : <Navigate to="/" replace />
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
