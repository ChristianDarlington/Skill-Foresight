import './App.css'
import Hero from './Components/Hero'
import Chatbox from './Components/Chatbox'
import Section from './Components/CustomShapeDivider'
import Navbar from './Components/Navbar'
import Aboutus from './Components/Aboutus'
import Sponsors from './Components/Sponsors'
import Footer from './Components/Footer'
import {Route, Routes} from 'react-router'



function App() {
  return (
    <>
     <Routes>
     <Route path='/' element={
    <div className="App">
      <Navbar />
      <Hero />
      {/* <Chatbox /> */}
      <Aboutus />
      <Section />
      <Sponsors />
      <Footer />
    </div>
    } />
 <Route path='/demo' element={ 
 <div className='App'>
   <Navbar />
   <Chatbox />
   <Footer />
   </div>
  }/>

    </Routes>
    </>
  );
}

export default App;
