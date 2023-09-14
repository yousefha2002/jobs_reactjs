import React from 'react';
import './App.css';
import Layout from './components/layout/Layout';
import {Route,Routes,Navigate} from 'react-router-dom'
import Home from './pages/Home';
import BrowseProjects from './pages/BrowseProjects';
import Portofolio from './pages/Portofolio';
import Profile from './pages/Profile';
import Proposals from './pages/Proposals';
import Signup from './pages/auth/Signup';
import {Toaster} from 'react-hot-toast';
import Login from './pages/auth/Login';
import Freelancers from './pages/Freelancers';
import SingleProject from './pages/SingleProject';
import AddProject from './pages/AddProject';
import CreatePortofolio from './pages/CreatePortofolio';
import Feebacks from './pages/Feebacks';
import Projects from './pages/Projects';
import UpdateProfile from './pages/UpdateProfile';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query'
import SinglePortofolio from './pages/SinglePortofolio';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const {user} = useSelector((state:RootState) => state.user)
  const queryClient = new QueryClient()
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Toaster
        toastOptions={{
          success: {
            style: {
              padding:"10px 30px"
            },
          },
          error: {
            style: {
              padding:"10px 30px",
            },
          },
        }}
        />
        <Layout>
          <Routes>
            <Route path='' element={<Home/>}/>
            <Route path='projects' element={<BrowseProjects/>}/>
            <Route path=':id/portofolio' element={<Portofolio/>}/>
            <Route path=':id/profile' element={<Profile/>}/>
            <Route path='proposals' element={<Proposals/>}/>
            <Route path="login" element={user?<Navigate to={"/"}/> :<Login />} />
            <Route path="signup" element={user ? <Navigate to={'/'}/> :<Signup />} />
            <Route path='freelancers' element={<Freelancers/>}/>
            <Route path='project/:id' element={<SingleProject/>}/>
            {user?.role==="seller"&&<Route path='/project/create' element={<AddProject/>}/>}
            {user?.role==="buyer"&&<Route path='/portofolio/create' element={<CreatePortofolio/>}/>}
            <Route path=':id/feebacks' element={<Feebacks/>}/>
            <Route path=':id/projects' element={<Projects/>}/>
            {user&&<Route path='/profile/update' element={<UpdateProfile/>}/>}
            <Route path='portofolio/:id' element={<SinglePortofolio/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
          </Routes>
        </Layout>
      </QueryClientProvider>
    </div>
  );
}

export default App;
