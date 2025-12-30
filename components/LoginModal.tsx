"use client";

import { useState } from "react";
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  loginWithGuest,
  sendPasswordReset,
} from "../app/library/auth";
import { useUserStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const redirectAfterLogin = () => {
    onClose();
    router.push("/for-you");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      let userCredential;
      if (isRegister) {
        userCredential = await registerWithEmail(email, password);
      } else {
        userCredential = await loginWithEmail(email, password);
      }

      setUser(userCredential.user);
      redirectAfterLogin();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const userCredential = await loginWithGoogle();
      setUser(userCredential.user);
      redirectAfterLogin();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      setLoading(true);
      const userCredential = await loginWithGuest();
      setUser(userCredential.user);
      redirectAfterLogin();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      // setError("Please enter your email to reset password");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordReset(email);
      alert("Password reset email sent! Check your inbox.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl flex flex-col justify-between h-[480px]">
        <div className="p-6 flex flex-col items-center justify-between h-full">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-700 hover:text-black text-lg"
          >
            X
          </button>
          <h2 className="text-xl font-bold text-center text-gray-800">
            {isRegister ? "Sign up to Summarist" : "Log in to Summarist"}
          </h2>
          {error && <p className="text-red-600 text-center mt-2">{error}</p>}

          {!isRegister && (
            <>
              <button
                onClick={handleGuestLogin}
                className="w-full rounded-lg bg-[#3A579D] px-4 py-2 text-white font-medium shadow hover:bg-gray-400 transition mt-2"
              >
                Login as Guest
              </button>

              <div className="w-full flex items-center gap-3 my-2">
                <div className="h-[2px] bg-gray-300 flex-1" />
                <span className="text-gray-600 text-sm">or</span>
                <div className="h-[2px] bg-gray-300 flex-1" />
              </div>
            </>
          )}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center gap-3 rounded-lg bg-blue-500 px-4 py-2 text-white font-medium shadow hover:bg-blue-600 transition mt-4"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded bg-white">
              <img
                src="https://github.com/hannamitri/summarist-home-page/blob/main/assets/google.png?raw=true"
                width="25"
                alt="google"
              />
            </span>
            <span className="flex-1 text-center">Login with Google</span>
            <span className="h-9 w-9" />
          </button>
          <div className="w-full flex items-center gap-3 my-2">
            <div className="h-[2px] bg-gray-300 flex-1" />
            <span className="text-gray-600 text-sm">or</span>
            <div className="h-[2px] bg-gray-300 flex-1" />
          </div>
          <div className="flex flex-col w-full gap-3">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded border-2 border-gray-300 p-2 placeholder-gray-500 placeholder-font-light"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded border-2 border-gray-300 p-2 placeholder-gray-500 placeholder-font-light"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-lg bg-green-500 px-4 py-2 text-white font-medium shadow hover:bg-green-600 disabled:opacity-50 transition"
            >
              {loading ? "Loading..." : isRegister ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
        {!isRegister && (
          <div className="w-full text-center mb-2 flex items-center justify-center">
            <button
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:underline mb-2"
            >
              Forgot your password?
            </button>
          </div>
        )}
        <div className="w-full bg-gray-100 p-3 flex justify-center items-center rounded-b-xl">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 text-sm"
          >
            {isRegister ? "Already have an account?" : "Dont have an account?"}
          </button>
        </div>
      </div>
    </div>
  );
}
