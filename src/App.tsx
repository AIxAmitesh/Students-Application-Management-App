import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ExploreUniversities } from './pages/ExploreUniversities';
import { UniversityDetail } from './pages/UniversityDetail';
import { ExploreCourses } from './pages/ExploreCourses';
import { CourseDetail } from './pages/CourseDetail';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { BlogList } from './pages/BlogList';
import { BlogDetail } from './pages/BlogDetail';
import { StaticPage } from './pages/StaticPage';
import { Apply } from './pages/Apply';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen font-sans antialiased text-gray-900">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/universities" element={<ExploreUniversities />} />
                <Route path="/universities/:id" element={<UniversityDetail />} />
                <Route path="/courses" element={<ExploreCourses />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="/apply/:courseId" element={<Apply />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about/:section" element={<About />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/:slug" element={<StaticPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
