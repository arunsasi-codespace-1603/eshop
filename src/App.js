import './App.scss';
import CartContext from './context/CartContext';
import useIsMobile from './hooks/useIsMobile';
import AppRoutes from './routes/AppRoutes';

function App() {
  const isMobileDevice = useIsMobile();
  return (
    <CartContext>
      <div className={`App${isMobileDevice ? " dev-mobile" : ""}`}>
        <AppRoutes />
      </div>
    </CartContext>
  );
}

export default App;