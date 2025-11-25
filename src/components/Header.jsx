export function Header({ userName, communityName }) {
  return (
    <div className="bg-[#c8ddc4] px-6 py-4">
      <h2 className="text-[#2d5a3d]">{userName}</h2>
      <p className="text-[#6b8e75] text-sm">{communityName}</p>
    </div>
  );
}
