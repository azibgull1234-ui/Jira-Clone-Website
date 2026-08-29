import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { IssuesProvider } from "./context/IssuesContext";
import { ProjectsProvider } from "./context/ProjectsContext";
import { store } from "./Store/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <IssuesProvider>
            <App />
          </IssuesProvider>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);