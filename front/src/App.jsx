import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import BlogPost from './components/BlogPost.jsx'
import Blog from './components/Blog.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm.jsx';
import AddPost from './components/Post/AddPost.jsx';
import SignUpForm from './components/Auth/SignUpForm.jsx';
import EditePost from './components/Post/EditePost.jsx';



function App() {

  return (
    <>
      {/*Heder component*/}
      <Header />
      <Routes>
      <Route path="/blog" element={<Blog />} />
        <Route path="/" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<SignUpForm />} />
        <Route path='/addposts' element={<AddPost />} />
        <Route path='/edit/:id' element={<EditePost />} />
        
      </Routes>
      {/*Footer component*/}
      <Footer />

    </>
  )
}

export default App
