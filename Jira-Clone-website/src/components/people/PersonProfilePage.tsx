import { Navigate, useParams } from "react-router-dom";
import PersonProfile from "./PersonProfile";
import { getPersonById } from "./peopleService";

const PersonProfilePage = () => {
  const { personId } = useParams();
  const person = personId ? getPersonById(personId) : undefined;

  if (!person) {
    return <Navigate to="/people" replace />;
  }

  return <PersonProfile person={person} />;
};

export default PersonProfilePage;
