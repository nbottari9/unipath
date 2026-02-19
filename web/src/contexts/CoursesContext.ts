import { createContext } from "react";
import { Schema } from "ROOT/amplify/data/resource";

export const CoursesContext = createContext<Schema["Course"]["type"][]>([]);
