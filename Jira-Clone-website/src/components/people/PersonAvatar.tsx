interface PersonAvatarProps {
  name: string;
  avatar: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASS = {
  sm: "h-10 w-10 text-sm",
  md: "h-12 w-12 text-base",
  lg: "h-20 w-20 text-2xl",
};

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const isImageSrc = (value: string) =>
  value.startsWith("http") || value.startsWith("/") || value.startsWith("data:");

const PersonAvatar = ({ name, avatar, size = "md" }: PersonAvatarProps) => {
  if (isImageSrc(avatar)) {
    return (
      <img
        src={avatar}
        alt={name}
        className={`${SIZE_CLASS[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${SIZE_CLASS[size]}`}
      style={{ backgroundColor: avatar }}
      aria-hidden
    >
      {initials(name)}
    </div>
  );
};

export default PersonAvatar;
