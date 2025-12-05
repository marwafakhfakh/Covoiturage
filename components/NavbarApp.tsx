"use client";
import { useSelector } from "react-redux";
import NavbarLogged from "./NavbarLogged";
import Navbar from "./Navbar";
import type { UserState } from "../store/userSlice";

interface RootState {
  user: UserState;
}

export default function NavbarApp() {
  const user = useSelector((state: RootState) => state.user.user);
  if (user) {
    return <NavbarLogged user={user} />;
  } else {
    return <Navbar />;
  }
}
