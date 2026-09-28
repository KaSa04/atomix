import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import PeriodicTable from './pages/PeriodicTable';
import Calculator from './pages/Calculator';
import Simulator from './pages/Simulator';
import './css/App.css';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Landing />} />
                <Route path="/periodic-table" element={<PeriodicTable />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/simulator" element={<Simulator />} />
            </Route>
        </Routes>
    );
}

export default App;