
import './App.css';
import Footer from './component/Footer';
import Header from './component/Header';
import LandingPage from './screens/landing page/LandingPage';


function App() {
  return (
    <div className="App">
     <Header />
     <main>
      <LandingPage />
     </main>
     <Footer  />
    </div>
  );
}

export default App;
