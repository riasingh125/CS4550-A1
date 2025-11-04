import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/[cid]/Modules/reducer";
import assignmentsReducer from "../Courses/[cid]/Assignments/reducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
