import { configureStore } from "@reduxjs/toolkit";
import { sponserApi } from "../services/sponser";
import { contactApi } from "../services/contact";
import { subscribeApi } from "../services/subscribe";
import { blogApi } from "../services/blog";
import { highlightApi } from "../services/highlights";
import { teamApi } from "../services/team";
import { playerApi } from "../services/players";
import { tableApi } from "../services/table";
import { liveVideoApi } from "../services/liveVideo";
import { matchApi } from "../services/match";

export const store = configureStore({
  reducer: {
    [sponserApi.reducerPath]: sponserApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [subscribeApi.reducerPath]: subscribeApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [highlightApi.reducerPath]: highlightApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [playerApi.reducerPath]: playerApi.reducer,
    [tableApi.reducerPath]: tableApi.reducer,
    [liveVideoApi.reducerPath]: liveVideoApi.reducer,
    [matchApi.reducerPath]: matchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(sponserApi.middleware)
      .concat(contactApi.middleware)
      .concat(subscribeApi.middleware)
      .concat(blogApi.middleware)
      .concat(highlightApi.middleware)
      .concat(teamApi.middleware)
      .concat(playerApi.middleware)
      .concat(tableApi.middleware)
      .concat(liveVideoApi.middleware)
      .concat(matchApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
