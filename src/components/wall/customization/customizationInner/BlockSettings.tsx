import { useWallStore } from '@/store';
import { produce } from 'immer';
import { BLOCK_SHAPE, BLOCK_STYLE } from '@/data/constants/customization';
import { Button, ColorPicker } from 'antd';
import { Color } from 'antd/es/color-picker';

export const BlockSettings = ({
  setBlockOptions,
  blockOptions,
}: {
  blockOptions: 'solid' | 'gradation';
  setBlockOptions: React.Dispatch<React.SetStateAction<'solid' | 'gradation'>>;
}) => {
  const { wall, setWall } = useWallStore();
  const isThemeSelected = wall?.styleSetting?.themeSetting.theme;
  const handleBlockColorPick = (backgroundColor: Color) => {
    const bgColor =
      typeof backgroundColor === 'string'
        ? backgroundColor
        : backgroundColor.toHexString();
    setBlockOptions('solid');
    setWall(
      produce(wall, (draft) => {
        draft.styleSetting.blockSetting.gradation = false;
        draft.styleSetting.blockSetting.styleColor = bgColor;
        draft.styleSetting.themeSetting.theme = null;
      }),
    );
  };
  const handleBlockGradationPick = (backgroundColor: Color) => {
    const bgColor =
      typeof backgroundColor === 'string'
        ? backgroundColor
        : backgroundColor.toHexString();
    setBlockOptions('gradation');
    setWall(
      produce(wall, (draft) => {
        draft.styleSetting.blockSetting.gradation = true;
        draft.styleSetting.blockSetting.styleColor = bgColor;
        draft.styleSetting.themeSetting.theme = null;
      }),
    );
  };

  // 블록-모양
  const handleBorder = (e: React.ChangeEvent<HTMLInputElement>) => {
    //immer
    setWall(
      produce(wall, (draft) => {
        draft.styleSetting.blockSetting.shape = e.target.value as
          | '0px'
          | '6px'
          | '13px';
        draft.styleSetting.themeSetting.theme = null;
      }),
    );
  };

  // 블록-스타일
  const handleStyle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWall(
      produce(wall, (draft) => {
        draft.styleSetting.blockSetting.style = e.target.value as
          | 'none'
          | 'shadow'
          | 'flat';
        draft.styleSetting.themeSetting.theme = null;
      }),
    );
  };

  return (
    <>
      <div className="db-18 mt-[30px] mb-[16px]">블록</div>
      <div className="flex justify-between gap-3">
        <div className="flex flex-col gap-[8px] w-full">
          {BLOCK_SHAPE.map((shape) => (
            <label
              key={shape}
              className={`bg-lightGray border-[1px] border-solid border-line sm:w-[194px] h-[30px] w-full block hover ${
                wall.styleSetting.blockSetting.shape === shape &&
                !isThemeSelected &&
                'ring-blue ring-2 ring-offset-2'
              }`}
              style={{ borderRadius: shape }}
            >
              <input
                className="hidden"
                type="radio"
                name="style"
                value={shape}
                checked={wall.styleSetting.blockSetting.shape === shape}
                onChange={handleBorder}
              />
            </label>
          ))}
          <div className="text-center items-center dm-16 mt-[10px]">모양</div>
        </div>

        <div className="flex flex-col gap-[8px] w-full">
          {BLOCK_STYLE.map((style) => (
            <label
              key={style}
              className={`${style} bg-lightGray sm:w-[194px] w-full h-[30px] block hover `}
            >
              <div
                className={`${
                  wall.styleSetting.blockSetting.style === style &&
                  !isThemeSelected &&
                  'ring-2 ring-blue h-[30px] ring-offset-2'
                }`}
              >
                <input
                  className="hidden"
                  type="radio"
                  name="style"
                  value={style}
                  checked={wall.styleSetting.blockSetting.style === style}
                  onChange={handleStyle}
                />
              </div>
            </label>
          ))}
          <div className="text-center items-center dm-16 mt-[8px]">스타일</div>
        </div>

        <div className="flex flex-col gap-[10px] w-full">
          <label
            className={` bg-sky rounded-[8px] sm:w-[194px] h-[48px] w-full block hover ${
              blockOptions === 'solid' &&
              !isThemeSelected &&
              'ring-blue ring-2 ring-offset-2'
            }`}
          >
            <input
              className="hidden"
              type="radio"
              name="style"
              value="color"
              checked={wall.styleSetting.blockSetting.styleColor === 'solid'}
            />
            <ColorPicker
              value={wall.styleSetting.blockSetting.styleColor}
              onChange={handleBlockColorPick}
              getPopupContainer={undefined}
              autoAdjustOverflow={undefined}
              destroyTooltipOnHide={undefined}
            >
              <Button
                type="primary"
                className={`sm:w-[194px] h-[48px] w-full rounded-[8px]`}
                style={{
                  backgroundColor: wall.styleSetting.blockSetting.styleColor,
                }}
              />
            </ColorPicker>
          </label>

          {/* 블록-그라데이션 */}
          <label
            className={`rounded-[8px] sm:w-[194px] h-[48px] block hover ${
              blockOptions === 'gradation' && 'ring-blue ring-2 ring-offset-2'
            }`}
          >
            <input
              className="hidden"
              type="radio"
              name="style"
              value="gradation"
              checked={wall.styleSetting.blockSetting.gradation === true}
            />
            <ColorPicker
              value={wall.styleSetting.blockSetting.styleColor}
              onChange={handleBlockGradationPick}
              getPopupContainer={undefined}
              autoAdjustOverflow={undefined}
              destroyTooltipOnHide={undefined}
            >
              <Button
                type="primary"
                className="sm:w-[194px] h-[48px] w-full rounded-[8px] bg-gradient-to-t from-white to-[rgba(237, 248, 252, 0.20)]"
                style={{
                  backgroundColor: wall.styleSetting.blockSetting.styleColor,
                }}
              />
            </ColorPicker>
          </label>
          <div className="text-center items-center dm-16 mt-[10px]">
            스타일 색상
          </div>
        </div>
      </div>
    </>
  );
};
