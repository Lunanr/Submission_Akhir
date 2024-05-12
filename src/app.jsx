import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import PostingPage from './pages/PostingPage';
import PopularCategory from './components/Category/PopularCategory';
import Navigation from './components/Navigation';
import SideNav from './components/SideNav';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  // Digunakan untuk mengambil authUser dan isPreload state from store
  const {
    authUser = null,
    isPreload = false,
  } = useSelector((states) => states);

  // digunakan untuk mengambil aksi ke store Redux
  const dispatch = useDispatch();

  useEffect(() => {
    // mengambil aksi asyncronus untuk preload app
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    // Mengambil aksi asyncronus untuk keluar halaman
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <div className="app-container">
        <header>
          <Navigation authUser={authUser} />
        </header>
        <main className="min-h-screen mx-auto my-0 bg-gradient-to-tr from-[#9BB6EB] to-[#D2E0FA] flex flex-row px-5 pt-3">
          <div className="w-full sm:w-3/12 lg:w-2/12 text-left">
            {(!isLoginPage && !isRegisterPage) && (
              <SideNav />
            )}
          </div>
          <div className="w-full sm:w-9/12 lg:w-7/12 px-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {isLoginPage && (
                <Route path="/login" element={<LoginPage />} />
              )}
              {isRegisterPage && (
                <Route path="/register" element={<RegisterPage />} />
              )}
              <Route path="/threads/:id" element={<DetailPage />} />
              <Route path="/posting" element={<PostingPage />} />
              <Route path="/leaderboards" element={<LeaderboardsPage />} />
            </Routes>
          </div>
          {isHomePage && (
            <div className="w-full lg:w-3/12">
              <PopularCategory />
            </div>
          )}
        </main>
      </div>
    )
  }

  return (
    <div className="app-container">
      <header>
        <Navigation authUser={authUser} signOut={onSignOut} />
      </header>
      <main className="min-h-screen mx-auto my-0 bg-gradient-to-tr from-[#9BB6EB] to-[#D2E0FA] flex flex-row px-20 pt-3">
        <div className="w-full sm:w-3/12 lg:w-2/12 text-left">
          {(!isLoginPage && !isRegisterPage) && (
            <SideNav authUser={authUser} />
          )}
        </div>
        <div className="w-full sm:w-9/12 lg:w-7/12 px-3">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {isRegisterPage && (
              <Route path="/register" element={<RegisterPage />} />
            )}
            {isLoginPage && (
              <Route path="/login" element={<LoginPage />} />
            )}
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/posting" element={<PostingPage />} />
            <Route path="/leaderboards" element={<LeaderboardsPage />} />
          </Routes>
        </div>
        {isHomePage && (
          <div className="w-full lg:w-3/12">
            <PopularCategory />
          </div>
        )}
      </main>
    </div>
  )
}

export default App;