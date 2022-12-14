import React from 'react';
import { Container} from '@mui/material';
import { BrowserRouter, Routes , Route, Redirect } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_OAUTH_CLIENT_ID}`} >
        <BrowserRouter>
          <Container maxWidth='lg'>
            <Navbar />
            <Routes >
              <Route path="/" exact component={()=> <Redirect to='/posts' />} />
              <Route path="/posts" exact component={Home} />
              <Route path="/posts/search" exact component={Home} />
              <Route path="/posts/:id"  component={PostDetails} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>

  )
}

export default App