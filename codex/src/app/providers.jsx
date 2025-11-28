"use client";

import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store";
import { fetchMe } from "@/store/slices/authSlice";

function Init({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch current user on app boot
    dispatch(fetchMe());
  }, [dispatch]);

  return children;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <Init>{children}</Init>
    </Provider>
  );
}
