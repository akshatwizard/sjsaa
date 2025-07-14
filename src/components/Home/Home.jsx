import { lazy, Suspense } from "react";
import Loader from "../Loader/Loader";
const Testimonials = lazy(() => import("../Testimonials/Testimonials"));
const Carousel = lazy(() => import("../Carousel/Carousel"));
const MessageForAlumni = lazy(() =>
  import("../MessageForAlumni/MessageForAlumni")
);
// const Vision = lazy(() => import("../Vision/Vision"));
const Stories = lazy(() => import("../Stories/Stories"));
const AboutUs = lazy(() => import("../AboutUs/AboutUs"));
// const Sponsor = lazy(() => import("../Sponsor/Sponsor"));
const Events = lazy(() => import("../Events/Events"));
const ManagingCommittee = lazy(() =>
  import("../ManagingCommittee/ManagingCommittee")
);
const Achievers = lazy(() => import("../Achievers/Achievers"));
const Youtube = lazy(() => import("../Youtube/Youtube"));
const WishMe = lazy(() => import("../WishMe/WishMe"));

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Carousel />
      </Suspense>
      {/* <Suspense fallback={<Loader />}>
        <Sponsor />
      </Suspense> */}
      <Suspense fallback={<Loader />}>
        <AboutUs />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <ManagingCommittee />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Youtube />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Events />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <WishMe />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Stories />
      </Suspense>
      {/* <Suspense fallback={<Loader />}>
        <Vision />
      </Suspense> */}
      <Suspense fallback={<Loader />}>
        <MessageForAlumni />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Achievers />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Testimonials />
      </Suspense>
    </>
  );
}
