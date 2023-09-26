import { useWallStore } from '@/store';
import { produce } from 'immer';
import { BLOCK_SHAPE, BLOCK_STYLE } from '@/data/constants/customization';
import { useEffect, useState } from 'react';
import { Button, ColorPicker } from 'antd';
import { Color } from 'antd/es/color-picker';

export const BlockSettings = () => {
  const { wall, setWall } = useWallStore();
  const [blockColor, setBlocklColor] = useState<Color | string>(
    wall.styleSetting.blockSetting.styleColor,
  );

  // 블록-모양
  const handleBorder = (e: React.ChangeEvent<HTMLInputElement>) => {
    //immer
    setWall(
      produce(wall, (draft) => {
        draft.styleSetting.blockSetting.shape = e.target.value as
          | '0px'
          | '6px'
          | '13px';
      }),
    );
    console.log(e.target.value);
  };

  // 블록-스타일
  const handleStyle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWall(
      produce(wall, (draft) => {
        draft.styleSetting.blockSetting.style = e.target.value as
          | 'none'
          | 'shadow'
          | 'flat';
      }),
    );
    console.log(e.target.value);
  };

  useEffect(() => {
    const bgColor =
      typeof blockColor === 'string' ? blockColor : blockColor.toHexString();
    setWall(
      produce(wall, (draft) => {
        draft.styleSetting.blockSetting.styleColor = bgColor;
      }),
    );
  }, [blockColor]);

  const handleColorChange = (newColor: Color) => {
    setBlocklColor(newColor.toHexString());
  };

  // 블록-스타일 컬러 그라데이션
  const handleBlockGradation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWall(
      produce(wall, (draft) => {
        draft.styleSetting.blockSetting.gradation = e.target
          .value as unknown as boolean;
      }),
    );
    console.log(e.target.value);
  };

  return (
    <div>
      <div className="db-18 mt-[30px] mb-[16px]">블록</div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-[8px]">
          {BLOCK_SHAPE.map((shape) => (
            <label
              className={`bg-lightGray border-[1px] border-solid border-line w-[194px] h-[30px] block hover ${
                wall.styleSetting.blockSetting.shape === shape &&
                'ring-blue ring-1 ring-offset-2'
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
          <div className="dm-16 mt-[10px]">모양</div>
        </div>

        <div className="flex flex-col gap-[8px]">
          {BLOCK_STYLE.map((style) => (
            <label
              className={`${style} bg-lightGray w-[194px] h-[30px] block hover ${
                wall.styleSetting.blockSetting.style === style &&
                'ring-blue ring-1 ring-offset-2'
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
            </label>
          ))}
          <div className="dm-16 mt-[8px]">스타일</div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <label
            className={` bg-sky rounded-[8px] w-[194px] h-[48px] block hover ${
              wall.styleSetting.blockSetting.styleColor === blockColor &&
              'ring-blue ring-1'
            }`}
          >
            <input
              className="hidden"
              type="radio"
              name="style"
              value="color"
              checked={wall.styleSetting.blockSetting.styleColor === blockColor}
              //onChange={handleStyleColor}
            />
            <ColorPicker value={blockColor} onChange={handleColorChange}>
              <Button
                type="primary"
                className={`w-[194px] h-[48px] rounded-[8px]`}
                style={{ backgroundColor: blockColor as string }}
              />
            </ColorPicker>
          </label>

          {/* 블록-그라데이션 */}
          <label
            className={`bg-gradient-to-t from-white to-[rgba(237, 248, 252, 0.20)] bg-sky rounded-[8px] w-[194px] h-[48px] block hover ${
              wall.styleSetting.blockSetting.gradation === true &&
              'ring-blue ring-1'
            }`}
          >
            <input
              className="hidden"
              type="radio"
              name="style"
              value="gradation"
              checked={wall.styleSetting.blockSetting.gradation === true}
              onChange={handleBlockGradation}
            />
            {/* <ColorPicker value={blockColor} onChange={handleColorChange}>
              <Button
                type="primary"
                className={`w-[194px] h-[48px] rounded-[8px]`}
                style={{ backgroundColor: blockColor as string }}
              />
            </ColorPicker> */}
          </label>
          <div className="dm-16 mt-[10px]">스타일 색상</div>
        </div>
      </div>
    </div>
  );
};
