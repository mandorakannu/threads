"use client";
import { IUser } from "@ts/IUser";
import { addUser } from "@slices/user-slice";
import { useUser } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store";

export default function StoreUser() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const _id = useSelector((state: RootState) => state.user._id);
  const rootUser: Partial<IUser> = {
    _id: user?.id as string,
    firstName: user?.firstName as string,
    lastName: user?.lastName as string,
    email: user?.emailAddresses[0].emailAddress as string,
    username: user?.username as string,
    imageUrl: user?.imageUrl as string,
    threads: [],
  };
  if (!_id) {
    dispatch(addUser(rootUser as IUser));
  } else {
    return null;
  }
}
