import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/models/user.model";

export type userState = {
  user: User | null;
  token: string;
};

const initialState = {} as userState;

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    userLogin: (state:any, action: PayloadAction<userState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    userLogout: (state:any) => {
      state.user = null;
      state.token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLogin, userLogout } = userSlice.actions;

export default userSlice.reducer;
