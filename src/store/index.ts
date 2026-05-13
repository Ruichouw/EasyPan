import { createPinia } from "pinia";

export const pinia = createPinia();

export * from "./modules/app";
export * from "./modules/user";
export * from "./modules/permission";