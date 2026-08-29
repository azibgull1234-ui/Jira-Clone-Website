export function getDisplayFirstName(email: string | null): string {
  if (!email) {
    return "there";
  }

  try {
    const storedUsers = localStorage.getItem("registeredUsers");
    const users = storedUsers
      ? (JSON.parse(storedUsers) as { email: string; fullName?: string }[])
      : [];
    const match = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
    const fullName = match?.fullName?.trim();
    if (fullName) {
      return fullName.split(" ")[0];
    }
  } catch {
    // Fall back to the email local part.
  }

  const localPart = email.split("@")[0]?.replace(/[._-]+/g, " ") ?? "";
  const first = localPart.split(" ").find(Boolean) ?? "there";
  return first.charAt(0).toUpperCase() + first.slice(1);
}
