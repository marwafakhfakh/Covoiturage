import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types for the /profile API response
export interface PackagePlan {
  id: number;
  package: string;
}

export interface UserProfile {
  id: number;
  current_package_plan: PackagePlan | null;
  last_login: string | null;
  is_superuser: boolean;
  username: string;
  date_joined: string;
  subscription_status: string;
  subscription_start_date: string | null;
  subscription_end_date: string | null;
  auto_renew: boolean;
  cin: string | null;
  driving_licence: string | null;
  phone_number: string | null;
  bio: string;
  birth_date: string | null;
  joining_date: string;
  professional: boolean;
  review_score: number;
  review_numbers: number;
  active: boolean;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  // Optionally add avatar/profile_picture if needed for UI
  avatar?: string;
  profile_picture?: string;
}

export interface UserState {
  user: UserProfile | null;
  loaded: boolean;
}

const initialState: UserState = {
  user: null,
  loaded: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProfile>) {
      state.user = action.payload;
      state.loaded = true;
    },
    clearUser(state) {
      state.user = null;
      state.loaded = true;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
