import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function MainLayout() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
