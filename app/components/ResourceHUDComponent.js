import { useEffect, useState } from "react";
import { client } from "../page";
import { toPercent } from "../utils";

export default function ResourceHUDComponent({ token }) {
  let room;
  let unlisten;

  // const [level, setLevel] = useState(0);
  // const [expMin, setExpMin] = useState(0);
  // const [expMax, setExpMax] = useState(0);
  // const [lifeMin, setLifeMin] = useState(0);
  // const [lifeMax, setLifeMax] = useState(0);
  // const [manaMin, setManaMin] = useState(0);
  // const [manaMax, setManaMax] = useState(0);
  // const [esMin, setEsMin] = useState(0);
  // const [esMax, setEsMax] = useState(0);
  const [character, setCharacter] = useState();

  useEffect(() => {
    if (!token) return;

    console.log("joining room with token: " + token);

    if (room) room.leave();

    joinRoom();

    return () => {
      room?.leave?.();
      unlisten?.();
    };
  }, [token]);

  const joinRoom = async () => {
    try {
      room = await client.joinOrCreate(`resourceHUD_room_${token}`, {
        token,
      });

      unlisten = room.state.listen("state", (state, prev) => {
        setCharacter({ ...state.character });

        // console.log(JSON.stringify(state));

        // state.character.level && setLevel(state.character.level.value);

        // if (state.character.exp) {
        //   setExpMin(state.character.exp.min.value);
        //   setExpMax(state.character.exp.max.value);
        // }

        // if (state.character.resource.life) {
        //   setLifeMin(state.character.resource.life.min.value);
        //   setLifeMax(state.character.resource.life.max.value);
        // }

        // if (state.character.resource.mana) {
        //   setManaMin(state.character.resource.mana.min.value);
        //   setManaMax(state.character.resource.mana.max.value);
        // }

        // if (state.character.resource.es) {
        //   setEsMin(state.character.resource.es.min.value);
        //   setEsMax(state.character.resource.es.max.value);
        // }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex mb-5">
        <div class="flex flex-col mr-20">
          <span>等级: {character?.level?.value}</span>
          <span>
            经验: {character?.exp?.min.value}/{character?.exp?.max.value}
          </span>
          <span>
            生命: {character?.resource?.life?.min.value}/
            {character?.resource?.life?.max.value}
          </span>
          <span>
            法力: {character?.resource?.mana?.min.value}/
            {character?.resource?.mana?.max.value}
          </span>
          <span>
            护盾: {character?.resource?.es?.min.value}/
            {character?.resource?.es?.max.value}
          </span>
        </div>
        <div class="flex flex-col">
          <span>力量: {character?.core?.str?.value}</span>
          <span>灵巧: {character?.core?.agi?.value}</span>
          <span>智力: {character?.core?.int?.value}</span>
          <span>可分配: {character?.core?.unallocated?.value}</span>
        </div>
      </div>
      <div className="flex mb-5">
        <div class="flex flex-col mr-20">
          <span>命中值: {character?.offence?.accuracyRating?.value}</span>
          <span>
            暴击伤害: {toPercent(character?.offence?.crtDamage?.value)}
          </span>
          <span>
            火焰攻击伤害: {character?.offence?.attack?.fire?.min.value}&nbsp;~&nbsp;
            {character?.offence?.attack?.fire?.max.value}
          </span>
          <span>
            冰霜攻击伤害: {character?.offence?.attack?.cold?.min.value}&nbsp;~&nbsp;
            {character?.offence?.attack?.cold?.max.value}
          </span>
          <span>
            闪电攻击伤害: {character?.offence?.attack?.lightning?.min.value}&nbsp;~&nbsp;
            {character?.offence?.attack?.lightning?.max.value}
          </span>
          <span>
            混沌攻击伤害: {character?.offence?.attack?.chaos?.min.value}&nbsp;~&nbsp;
            {character?.offence?.attack?.chaos?.max.value}
          </span>
          <span>攻击速度: {character?.offence?.attack?.speed?.value}/s</span>
          <span>
            攻击暴击率: {toPercent(character?.offence?.attack?.crtRate?.value)}
          </span>
        </div>
        <div class="flex flex-col">
          <span>
            火焰法术伤害: {character?.offence?.spell?.fire?.min.value}&nbsp;~&nbsp;
            {character?.offence?.spell?.fire?.max.value}
          </span>
          <span>
            冰霜法术伤害: {character?.offence?.spell?.cold?.min.value}&nbsp;~&nbsp;
            {character?.offence?.spell?.cold?.max.value}
          </span>
          <span>
            闪电法术伤害: {character?.offence?.spell?.lightning?.min.value}&nbsp;~&nbsp;
            {character?.offence?.spell?.lightning?.max.value}
          </span>
          <span>
            混沌法术伤害: {character?.offence?.spell?.chaos?.min.value}&nbsp;~&nbsp;
            {character?.offence?.spell?.chaos?.max.value}
          </span>
          <span>施法速度: {character?.offence?.spell?.speed?.value}/s</span>
          <span>
            法术暴击率: {toPercent(character?.offence?.spell?.crtRate?.value)}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <span>护甲: {character?.defence?.armour?.value}</span>
        <span>闪避值: {character?.defence?.evasionRating?.value}</span>
        <span>格挡率: {toPercent(character?.defence?.blockRate?.value)}</span>
        <span>
          物理抗性: {toPercent(character?.defence?.resistance?.physical?.value)}
        </span>
        <span>
          火焰抗性: {toPercent(character?.defence?.resistance?.fire?.value)}
        </span>
        <span>
          冰霜抗性: {toPercent(character?.defence?.resistance?.cold?.value)}
        </span>
        <span>
          闪电抗性:{" "}
          {toPercent(character?.defence?.resistance?.lightning?.value)}
        </span>
        <span>
          混沌抗性: {toPercent(character?.defence?.resistance?.chaos?.value)}
        </span>
      </div>
    </div>
  );
}
