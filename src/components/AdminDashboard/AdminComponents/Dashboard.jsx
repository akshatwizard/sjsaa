import React, { Suspense } from "react";

export default function Dashboard({
  OurAlumni,
  noOfMembers,
  ComponentLoader,
  totalEvents,
}) {
  return (
    <div className="adminMainContent">
      <div className="container">
        <div className="row row-gap-4">
          <div className="col-lg-4 col-md-4 col-12">
            <div className="adminDetailsContainer text-center">
              <h3>Total Members</h3>
              <h4>{noOfMembers ? noOfMembers : <ComponentLoader />}</h4>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-12">
            <div className="adminDetailsContainer text-center">
              <h3>Total Events</h3>
              <h4>{totalEvents ? totalEvents : <ComponentLoader />}</h4>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-12">
            <div className="adminDetailsContainer text-center">
              <h3>Total Images</h3>
              <h4>100+</h4>
            </div>
          </div>
        </div>

        <div className="col-lg-12 mt-5">
          <Suspense fallback={<ComponentLoader />}>
            <OurAlumni />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
