import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import useCustomAxios from '@/hooks/useCustomAxios';

import type { SpacesInfo } from '@/types/home';

// components
import HomeProfile from '@/components/home/HomeProfile';
import Navbar from '@/components/navbar/Navbar';
import Icon from '@/components/common/Icon';
import AddSpaceModal from '@/components/home/AddSpaceModal';

// assets
import arrowRightIcon from '@/assets/icons/home/arrowRight.svg';
import spaceIcon from '@/assets/icons/home/space.svg';
import userIcon from '@/assets/icons/home/user.svg';

export default function Home() {
  const customAxios = useCustomAxios();
  const [isAddSpaceModalOpen, setIsAddSpaceModalOpen] = useState(false);
  const [spacesInfo, setSpacesInfo] = useState<SpacesInfo>();

  useEffect(() => {
    const getUserSpaces = async () => {
      try {
        const response = await customAxios(`home`);
        setSpacesInfo(response.data.data as SpacesInfo);
      } catch (error) {
        console.error(error);
      }
    };
    getUserSpaces();
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-[24px] py-[22px] break-keep">
        <HomeProfile member={spacesInfo?.member} />
        <section className="mb-[40px]">
          <div className="flex items-center gap-[8px] db-20 mb-[14px] text-lightBlack">
            <Icon src={spaceIcon} />
            <span>스페이스</span>
          </div>
          <div className="space-y-[10px]">
            <div className="bg-lightGray p-[18px] rounded-[15px]">
              <div className="db-16 mb-[6px]">개인 스페이스</div>
              <p className="dm-14 text-gray88 mb-[31px] leading-4">
                내가 받은 문서를 보관하거나,
                <br />
                지인들에게 공지·레터·계약문서를 보낼 수 있어요.
              </p>
              <Link
                to={`/space/${spacesInfo?.space.personal[0].spaceId}`}
                state={{
                  spaceType: 'personal',
                  spaceTitle: spacesInfo?.space.personal[0].spaceTitle,
                }}
                className="flex items-center justify-between hover"
              >
                <div>
                  <Icon src={userIcon} className="w-[16px] mr-[15px]" />
                  <span className="dm-16">
                    {spacesInfo?.space.personal[0].spaceTitle}
                  </span>
                </div>
                <Icon src={arrowRightIcon} />
              </Link>
            </div>
            <div className="bg-lightGray p-[18px] rounded-[15px]">
              <div className="db-16 mb-[6px]">단체 스페이스</div>
              <p className="dm-14 text-gray88 mb-[31px] leading-4">
                내가 초대되어있거나 내가 만든 스페이스로,
                <br />
                다양한 자버 문서를 보낼 수 있어요.
              </p>
              <div className="flex flex-col gap-6">
                {spacesInfo?.space.organization.map((space) => (
                  <Link
                    to={`/space/${space.spaceId}`}
                    state={{
                      spaceType: 'organization',
                      spaceTitle: space.spaceTitle,
                    }}
                    className="flex items-center justify-between hover "
                    key={space.spaceId}
                  >
                    <div>
                      <Icon src={userIcon} className="w-[16px] mr-[15px]" />
                      <span className="dm-16 space-x-6">
                        {space.spaceTitle}
                      </span>
                    </div>
                    <Icon src={arrowRightIcon} />
                  </Link>
                ))}
                <AddSpaceModal
                  isAddSpaceModalOpen={isAddSpaceModalOpen}
                  setIsAddSpaceModalOpen={setIsAddSpaceModalOpen}
                />
                <Button
                  type="link"
                  onClick={() => setIsAddSpaceModalOpen(true)}
                >
                  단체 스페이스 생성
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
