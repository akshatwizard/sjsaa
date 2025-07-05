import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import ContextProvider from './context/Context.jsx'

const Home = lazy(() => import('./components/Home/Home.jsx'));
const AboutUs = lazy(() => import('./components/About/About.jsx'));
const OurAlumni = lazy(() => import('./components/OurAlumni/OurAlumni.jsx'));
const UpcomingEvents = lazy(() => import('./components/UpcomingEvents/UpcomingEvents.jsx'));
const Gallery = lazy(() => import('./components/Gallery/Gallery.jsx'));
const Profile = lazy(() => import('./components/Profile/Profile.jsx'));
const NotFoundPage = lazy(() => import('./components/NotFound/NotFoundPage.jsx'));
const UserProfile = lazy(() => import('./components/UserProfile/UserProfile.jsx'));
const AllManagingMembers = lazy(() => import('./components/AllManagingMembers/AllManagingMembers.jsx'));
import Loader from './components/Loader/Loader.jsx'
const Achievements = lazy(() => import('./components/Acievements/Achievements.jsx'));
// import UpdateGallery from './components/AdminDashboard/UpdateGallery.jsx'
const MovieGallery = lazy(() => import("./components/MovieGallery/MovieGallery.jsx"))
const AGMElection = lazy(() => import("./components/AGMElection/AGMElection.jsx"))
const RegistrationForm = lazy(() => import("./components/RegistrationForm/RegistrationForm.jsx"))
const AdminDashboard = lazy(() => import('./components/AdminDashboard/AdminDashboard.jsx'));
const PaymentPage = lazy(() => import('./components/RegistrationForm/PaymentPage.jsx'))
const DownloadPdf = lazy(() => import('./components/DownloadPDF/DownloadPdf.jsx'));
const Discussion = lazy(() => import('./components/DiscussionForum/Discussion.jsx'))
const WishMe = lazy(() => import('./components/WishMe/WishMe.jsx'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route
        path='/'
        element={
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path='/our-alumni'
        element={
          <Suspense fallback={<Loader />}>
            <OurAlumni />
          </Suspense>
        }
      />
      <Route
        path='/new-member-registration'
        element={
          <Suspense fallback={<Loader />}>
            <RegistrationForm />
          </Suspense>
        }
      />
      <Route
        path='/about-us'
        element={
          <Suspense fallback={<Loader />}>
            <AboutUs />
          </Suspense>
        }
      />
      <Route
        path='/event'
        element={
          <Suspense fallback={<Loader />}>
            <UpcomingEvents />
          </Suspense>
        }
      />
      <Route
        path='/achievement'
        element={
          <Suspense fallback={<Loader />}>
            <Achievements />
          </Suspense>
        }
      />
      <Route
        path='/gallery'
        element={
          <Suspense fallback={<Loader />}>
            <Gallery />
          </Suspense>
        }
      />

      <Route
        path='/gallery/album-gallery/:albumId'
        element={
          <Suspense fallback={<Loader />}>
            <MovieGallery />
          </Suspense>
        }
      />
      <Route
        path='/gallery/agm-election-gallery'
        element={
          <Suspense fallback={<Loader />}>
            <AGMElection />
          </Suspense>
        }
      />

      <Route
        path='/managing-committee-members'
        element={
          <Suspense fallback={<Loader />}>
            <AllManagingMembers />
          </Suspense>
        }
      />
      <Route
        path='/payment-page'
        element={
          <Suspense fallback={<Loader />}>
            <PaymentPage />
          </Suspense>
        }
      />
      <Route
        path='/profile'
        element={
          <Suspense fallback={<Loader />}>
            <Profile />
          </Suspense>
        }
      />
      <Route
        path='/user/profile/:id'
        element={
          <Suspense fallback={<Loader />}>
            <UserProfile />
          </Suspense>
        }
      />
      <Route
        path='/admin/dashboard'
        element={
          <Suspense fallback={<Loader />}>
            <AdminDashboard />
          </Suspense>
        }
      />
      <Route
        path='/member-preview/:id'
        element={
          <Suspense fallback={<Loader />}>
            <DownloadPdf />
          </Suspense>
        }
      />

      <Route
        path='/wish-me'
        element={
          <Suspense fallback={<Loader />}>
            <WishMe />
          </Suspense>
        }
      />

      <Route
        path='/members-feed'
        element={
          <Suspense fallback={<Loader />}>
            <Discussion />
          </Suspense>
        }
      />


      <Route
        path='*'
        element={
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        }
      />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
)
