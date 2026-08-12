import './App.scss';
import useIsMobile from './hooks/useIsMobile';
import AppRoutes from './routes/AppRoutes';

function App() {
  const isMobileDevice = useIsMobile();
  return (
    <div className={`App${isMobileDevice ? " dev-mobile" : ""}`}>
      <AppRoutes />
    </div>
  );
}

export default App;