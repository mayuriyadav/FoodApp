
import './App.css';
import{ BrowserRouter,Routes,Route} from 'react-router-dom'
import AddFoodData from './Componets/AddFoodData';
import { OrderSection } from './Componets/Orders/OrderSection';
import ShowDetails from './Componets/Orders/ShowDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrderSection />} />
        <Route path="/orders" element={<OrderSection />} />
        <Route path="/addfood" element={<AddFoodData />} />
        <Route path="/orderdetails/:orderid" element={<ShowDetails/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
