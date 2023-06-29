import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomeScreen from './screens/HomeScreen';
import StreamerScreen from './screens/StreamerScreen';
import NotFoundScreen from './screens/NotFoundScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/streamer/:streamerId" element={<StreamerScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
