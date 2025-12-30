"use client";

import { useState } from "react";
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
} from "../app/library/auth";
import { useUserStore } from "../store/useAuthStore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

console.log("Firebase API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

export default function LoginModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setUser = useUserStore((state) => state.setUser);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("failed to submit");

      let userCredential;
      if (isRegister) {
        userCredential = await registerWithEmail(email, password);
      } else {
        userCredential = await loginWithEmail(email, password);
      }

      setUser(userCredential.user);
      onClose();
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
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="auth__content absolute w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="relative top-3 left-105 text-gray-700 hover:text-black text-lg"
        >
          X
        </button>
        <h2 className="auth__title relative top-5 left-30 mb-4 text-xl font-bold">
          {isRegister ? "Sign Up for Summarist" : "Log in to Summarist"}
        </h2>
        {error && <p className="mb-3 text-red-600">{error}</p>}
        <button
          onClick={handleGoogleLogin}
          className="relative mb-4 w-full rounded border py-2"
        >
          <figure className="google__icon--mask">
            <img
              src="https://github.com/hannamitri/summarist-home-page/blob/main/assets/google.png?raw=true" width="20"
              alt="google"
            ></img>
          </figure>
          Sign up with Google
        </button>
        <div className="relative left-52">or</div>
        <div className="input__wrapper relative top-12 left-15 w-80">
          <input
            type="email"
            placeholder="Email"
            className="top-6 mb-3 w-full rounded border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 w-full rounded border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mb-3 w-full rounded bg-black py-2 text-white hover:opacity-90"
        >
          {loading ? "Loading..." : isRegister ? "Sign Up" : "Login"}
        </button>

        <div className="relative top-40 left-42 flex justify-between text-sm">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600"
          >
            {isRegister ? "Already have an account?" : "Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
}
