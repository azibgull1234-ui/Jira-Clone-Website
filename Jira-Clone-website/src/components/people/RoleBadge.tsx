import { ROLE_STYLES, type UserRole } from "./types";

const RoleBadge = ({ role }: { role: UserRole }) => (
  <span
    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${ROLE_STYLES[role]}`}
  >
    {role}
  </span>
);

export default RoleBadge;
