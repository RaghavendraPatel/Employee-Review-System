import React, { createContext, useContext, useState } from "react";

const ReviewFormContext = createContext();

export const ReviewFormContextProvider = ({ children }) => {
  const [formVisible, setFormVisible] = useState(false);
  const [formFor, setFormFor] = useState("");

  return (
    <ReviewFormContext.Provider
      value={{ formVisible, setFormVisible, formFor, setFormFor }}
    >
      {children}
    </ReviewFormContext.Provider>
  );
};

export const useReviewFormContext = () => useContext(ReviewFormContext);
