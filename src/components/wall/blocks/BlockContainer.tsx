import { useWallStore } from '@/store';
import DragHandle from '@/components/wall/blocks/DragHandle';
import trashIcon from '@/assets/icons/trash.svg';
import { produce } from 'immer';

interface BlockContainerProps {
  children: React.ReactNode;
  blockName: string;
  blockUUID?: string;
}

export const BlockContainer = ({
  blockUUID,
  children,
  blockName,
}: BlockContainerProps) => {
  const { isEdit, wall, setWall } = useWallStore();

  const handleDeleteBlock = () => {
    setWall(
      produce(wall, (draft) => {
        draft.blocks = draft.blocks.filter(
          (block) => block.blockUUID !== blockUUID,
        );
      }),
    );
  };

  return (
    <div
      className={`bg-white rounded-[${
        wall?.style?.block?.shape
      }] overflow-hidden relative ${isEdit && 'text-gray88'}`}
    >
      {blockName !== 'profileBlock' && (
        <>
          {isEdit && (
            <>
              <DragHandle />
              <img
                src={trashIcon}
                alt="trash icon"
                className={`absolute right-[27px] top-[26px] hover:opacity-60 transition cursor-pointer ${
                  blockName === 'templatesBlock' && 'hidden'
                }`}
                onClick={handleDeleteBlock}
              />
            </>
          )}
        </>
      )}
      {children}
    </div>
  );
};
