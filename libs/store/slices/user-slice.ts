import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@ts/IUser";

export const userSlice = createSlice({
  name: "user",
  initialState: {} as IUser,
  reducers: {
    addUser: (state: IUser, action: PayloadAction<IUser>) => {
      state._id = action.payload._id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.imageUrl = action.payload.imageUrl;
      state.username = action.payload.username;
      state.threads = action.payload.threads;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser } = userSlice.actions;

export default userSlice.reducer;
