import { createRoot } from "react-dom/client";
import { PetGame } from "./index.tsx";
import "./styles.css";

createRoot(document.getElementById("root")!).render(<PetGame />);