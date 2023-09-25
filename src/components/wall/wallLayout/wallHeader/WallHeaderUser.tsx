import userIcon from '@/assets/icons/user.svg';
import { Icon } from '@/components/common';
import { useWallStore } from '@/store';

type WallHeaderUserProps = {
  dropdownOpen?: boolean;
  toggleDropdown?: () => void;
};

export default function WallHeaderUser({
  dropdownOpen,
  toggleDropdown,
}: WallHeaderUserProps) {
  const { wall } = useWallStore();

  return (
    <div className="flex items-center gap-[10px] hover">
      <div className="bg-sky w-[36px] h-[36px] flex justify-center items-center rounded-full">
        <Icon src={userIcon} />
      </div>
      <h1 className="db-16">{wall.wallInfoBlock?.wallInfoTitle}</h1>
    </div>
  );
}
