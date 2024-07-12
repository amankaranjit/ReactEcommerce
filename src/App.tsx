import Provider from "./providers";
import AppRoutes from "./routes/AppRoutes";
import "./assets/css/index.css";
const App = () => {
  return (
    <Provider>
      <AppRoutes />
    </Provider>
  );
};

export default App;
