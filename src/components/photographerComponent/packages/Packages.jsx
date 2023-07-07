import Package from "../package/Package";
import AddButton from "../addbutton/AddButton";
import "./packages.css";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getPackagesByPhotId } from "../../../actions/packages";

export default function Packages({ photId }) {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const { packages } = useSelector((state) => state.packages);
  const dispatch = useDispatch();
  const location = useLocation();
  const id = 1;

  useEffect(() => {
    if (location.pathname.includes("package")) {
      dispatch(getPackagesByPhotId(profile.photographerId));
    } else {
      dispatch(getPackagesByPhotId(photId));
    }
  }, [photId]);

  return (
    <div className="packages">
      <Grid container direction="row" justifyContent="center">
        {packages?.length < 3 && location.pathname.includes("package") && (
          <Grid key={id} item xs={4}>
            <AddButton buttonType={"addPackage"} />
          </Grid>
        )}

        {packages?.map((aPackage) => (
          <Grid key={aPackage.packageId} item xs={4}>
            <Package aPackage={aPackage} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
