import { useSelector } from "react-redux";
import LearnerDashboard from "./LearnerDashboard";
import LEAD_CLOSER from "./LEAD_CLOSER";
import SUPERADMIN from "./SUPERADMIN";

const DashboardType = () => {
  const { role } = useSelector((state: any) => state?.auth?.user);
  console.log("cklfedhijvncoekdrjfgijrtfkljhv8oefv==", role);
  if (role == "LEAD_OWNER") {
    return <LearnerDashboard />;
  }
  else if(role=="LEAD_CLOSER"){
    return <LEAD_CLOSER/>
  }
  else {
    return < SUPERADMIN/>;
  }
};

export default DashboardType