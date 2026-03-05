import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50/40 to-orange-50/40">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
