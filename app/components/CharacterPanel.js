import { useEffect, useState } from "react";
import { client } from "../page";
import { toPercent } from "../utils";
import { Button } from "@mui/material";

export default function CharacterPanel({ token }) {
  let unlisten;

  const [_token, setToken] = useState(token);
  const [room, setRoom] = useState();
  const [character, setCharacter] = useState();

  useEffect(() => {
    if (!token) return;

    console.log("joining room with token: " + token);

    room?.leave();

    joinRoom();

    return () => {
      room?.leave?.();
      unlisten?.();
    };
  }, [_token]);

  const joinRoom = async () => {
    try {
      let room = await client.joinOrCreate(`character_panel_room_${token}`, {
        token,
      });

      setRoom(room);

      unlisten = room.onMessage("error", ({ errCode, message }) => {
        alert(message);
      });

      room.state.onChange(() => {
        setCharacter({ ...room.state });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex mb-5">
        <div className="flex flex-col mr-20">
          <span>等级: {character?.level?.value}</span>
          <span>
            经验: {character?.exp?.min}/{character?.exp?.max}
          </span>
          <span>
            生命: {character?.life?.min}/{character?.life?.max}
          </span>
          <span>
            法力: {character?.mana?.min}/{character?.mana?.max}
          </span>
          <span>
            护盾: {character?.es?.min}/{character?.es?.max}
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <Button
              onClick={() => room.send("Character.Core.Str", { action: "dec" })}
            >
              -
            </Button>
            <span>力量: {character?.str.value}</span>
            <Button
              onClick={() => room.send("Character.Core.Str", { action: "inc" })}
            >
              +
            </Button>
          </div>
          <div className="flex">
            <Button
              onClick={() => room.send("Character.Core.Agi", { action: "dec" })}
            >
              -
            </Button>
            <span>灵巧: {character?.agi.value}</span>
            <Button
              onClick={() => room.send("Character.Core.Agi", { action: "inc" })}
            >
              +
            </Button>
          </div>
          <div className="flex">
            <Button
              onClick={() => room.send("Character.Core.Int", { action: "dec" })}
            >
              -
            </Button>
            <span>智力: {character?.int.value}</span>
            <Button
              onClick={() => room.send("Character.Core.Int", { action: "inc" })}
            >
              +
            </Button>
          </div>
          <span className="ml-7">可分配: {character?.unallocated?.value}</span>
        </div>
      </div>
      <div class="flex flex-col mb-3">
        <span>命中值: {character?.accuracyRating?.value}</span>
        <span>暴击伤害: {toPercent(character?.crtDamage?.value)}</span>
      </div>
      <div className="flex mb-5">
        <div className="flex flex-col mr-20">
          <span>
            物理攻击伤害: {character?.attack?.physical?.min}
            &nbsp;~&nbsp;
            {character?.attack?.physical?.max}
          </span>
          <span>
            火焰攻击伤害: {character?.attack?.fire?.min}
            &nbsp;~&nbsp;
            {character?.attack?.fire?.max}
          </span>
          <span>
            冰霜攻击伤害: {character?.attack?.cold?.min}
            &nbsp;~&nbsp;
            {character?.attack?.cold?.max}
          </span>
          <span>
            闪电攻击伤害: {character?.attack?.lightning?.min}
            &nbsp;~&nbsp;
            {character?.attack?.lightning?.max}
          </span>
          <span>
            混沌攻击伤害: {character?.attack?.chaos?.min}
            &nbsp;~&nbsp;
            {character?.attack?.chaos?.max}
          </span>
          <span>攻击速度: {character?.attack?.speed?.value}/s</span>
          <span>
            攻击暴击率: {toPercent(character?.attack?.crtRate?.value)}
          </span>
        </div>
        <div className="flex flex-col">
          <span>
            火焰法术伤害: {character?.spell?.fire?.min}
            &nbsp;~&nbsp;
            {character?.spell?.fire?.max}
          </span>
          <span>
            冰霜法术伤害: {character?.spell?.cold?.min}
            &nbsp;~&nbsp;
            {character?.spell?.cold?.max}
          </span>
          <span>
            闪电法术伤害: {character?.spell?.lightning?.min}
            &nbsp;~&nbsp;
            {character?.spell?.lightning?.max}
          </span>
          <span>
            混沌法术伤害: {character?.spell?.chaos?.min}
            &nbsp;~&nbsp;
            {character?.spell?.chaos?.max}
          </span>
          <span>施法速度: {character?.spell?.speed?.value}/s</span>
          <span>法术暴击率: {toPercent(character?.spell?.crtRate?.value)}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span>护甲: {character?.armour?.value}</span>
        <span>闪避值: {character?.evasionRating?.value}</span>
        <span>格挡率: {toPercent(character?.blockRate?.value)}</span>
        <span className="mt-3">
          物理抗性: {toPercent(character?.phyResistance?.value)}
        </span>
        <span>火焰抗性: {toPercent(character?.fireResistance?.value)}</span>
        <span>冰霜抗性: {toPercent(character?.coldResistance?.value)}</span>
        <span>
          闪电抗性: {toPercent(character?.lightningResistance?.value)}
        </span>
        <span>混沌抗性: {toPercent(character?.chaosResistance?.value)}</span>
      </div>
    </div>
  );
}
