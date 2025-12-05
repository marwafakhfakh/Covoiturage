"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../store/userSlice";
import { RootState } from "../store";
import api from "../api/api";

export default function UserProfileLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const loaded = useSelector((state: RootState) => state.user.loaded);

  useEffect(() => {
    // 🔑 Lire le token côté client
    const token = typeof window !== "undefined"
      ? localStorage.getItem("auth_token")
      : null;

    // Si déjà chargé ou pas de token ⇒ ne rien faire
    if (loaded || !token) {
      if (!token) {
        console.log("UserProfileLoader: aucun token, skip /api/auth/profile/");
      }
      return;
    }

    api
      .get("/api/auth/profile/")
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch(() => {
        dispatch(clearUser());
      });
  }, [loaded, dispatch]);

  return <>{children}</>;
}
