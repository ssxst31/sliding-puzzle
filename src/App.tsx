import { useState, useEffect } from "react";

import "./index.css";

const PROFILELIST = [
  "https://jcmkeuseuzeq6748407.cdn.ntruss.com/members/386388/1r3ni1l9h2fos6.jpg?type=w&w=180&quality=90",
  "https://jcmkeuseuzeq6748407.cdn.ntruss.com/members/248490/4uu5je1lda7mzsk.jpg?type=w&w=180&quality=90",
  "https://jcmkeuseuzeq6748407.cdn.ntruss.com/profile/e8co1kxoiemqx.png?type=w&w=180&quality=90",
  "https://jcmkeuseuzeq6748407.cdn.ntruss.com/members/698010/3uffg1lfw305ca.jpg?type=w&w=180&quality=90",
  "https://jcmkeuseuzeq6748407.cdn.ntruss.com/members/82975/3y3661lfzjzgd8.jpg?type=w&w=180&quality=90",
  "https://jcmkeuseuzeq6748407.cdn.ntruss.com/members/217830/3q5vs1l6dcpkwp.jpg?type=w&w=180&quality=90",
  "https://jcmkeuseuzeq6748407.cdn.ntruss.com/members/409224/g8ole1lg1bsejj.jpg?type=w&w=180&quality=90",
  "https://jcmkeuseuzeq6748407.cdn.ntruss.com/members/352809/3spu01ld49mxmg.jpg?type=w&w=180&quality=90",
  "https://jcmkeuseuzeq6748407.cdn.ntruss.com/profile/44chb1kqavbxbc.jpg?type=w&w=180&quality=90",
  "https://jcmkeuseuzeq6748407.cdn.ntruss.com/members/280457/1fxo1ld416ux0.jpg?type=w&w=180&quality=90",
  "https://jcmkeuseuzeq6748407.cdn.ntruss.com/members/2136/dsvda1lcqov8l9.jpg?type=w&w=180&quality=90",
  "https://jcmkeuseuzeq6748407.cdn.ntruss.com/members/681226/9ysyb71lfwahip9.jpg?type=w&w=180&quality=90",
  "https://jcmkeuseuzeq6748407.cdn.ntruss.com/members/393799/dznv1lcrl0pqn.jpg?type=w&w=180&quality=90",
  "https://jcmkeuseuzeq6748407.cdn.ntruss.com/profile/d3y9j1l323ejov.png?type=w&w=180&quality=90",
  "https://jcmkeuseuzeq6748407.cdn.ntruss.com/members/385586/40c7g1lfy86nco.jpg?type=w&w=180&quality=90",
  "https://jcmkeuseuzeq6748407.cdn.ntruss.com/members/93806/isq1lfgocy78.jpg?type=w&w=180&quality=90",
  "https://jcmkeuseuzeq6748407.cdn.ntruss.com/members/691316/ibk1lf813wi4.jpg?type=w&w=180&quality=90",
];

function App() {
  const result: any = [];
  while (result.length < 4) {
    const randomIndex = Math.floor(Math.random() * PROFILELIST.length);
    const randomElement = PROFILELIST[randomIndex];
    if (!result.includes(randomElement)) {
      result.push(randomElement);
    }
  }
  const [tileList, setTileList] = useState<any>([]);
  const [count, setCount] = useState<number>(0);

  function isSolvable(tiles: any) {
    let inversionCount = 0;
    for (let i = 0; i < tiles.length; i++) {
      for (let j = i + 1; j < tiles.length; j++) {
        if (
          tiles[i].title !== "0" &&
          tiles[j].title !== "0" &&
          tiles[i].value[0] > tiles[j].value[0]
        ) {
          inversionCount++;
        }
      }
    }
    return inversionCount % 2 === 0;
  }

  function shuffle(tiles: any) {
    do {
      for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i].value, tiles[j].value] = [tiles[j].value, tiles[i].value];
      }
    } while (!isSolvable(tiles));
    return tiles;
  }

  useEffect(() => {
    setTileList(
      shuffle([
        { title: "1", value: [1, 1], img: result[0] },
        { title: "2", value: [1, 2], img: result[0] },
        { title: "3", value: [1, 3], img: result[0] },
        { title: "0", value: [1, 4], img: result[0] },
        { title: "5", value: [2, 1], img: result[1] },
        { title: "6", value: [2, 2], img: result[1] },
        { title: "4", value: [2, 3], img: result[1] },
        { title: "8", value: [2, 4], img: result[1] },
        { title: "9", value: [3, 1], img: result[2] },
        { title: "10", value: [3, 2], img: result[2] },
        { title: "12", value: [3, 3], img: result[2] },
        { title: "7", value: [3, 4], img: result[2] },
        { title: "13", value: [4, 1], img: result[3] },
        { title: "15", value: [4, 2], img: result[3] },
        { title: "11", value: [4, 3], img: result[3] },
        { title: "14", value: [4, 4], img: result[3] },
      ])
    );
  }, []);

  const pensByColors2 = tileList
    .sort((a: any, b: any) => a.value[0] - b.value[0])
    .sort((a: any, b: any) => a.value[1] - b.value[1]);

  const moveTile = (tile: any) => {
    const tileRange = tileList
      .filter(
        (item: any) =>
          (item.value[0] + 1 === tile.value[0] &&
            item.value[1] === tile.value[1]) ||
          (item.value[0] - 1 === tile.value[0] &&
            item.value[1] === tile.value[1]) ||
          (item.value[1] + 1 === tile.value[1] &&
            item.value[0] === tile.value[0]) ||
          (item.value[1] - 1 === tile.value[1] &&
            item.value[0] === tile.value[0])
      )
      .find((a: any) => a.title === "0");

    if (tileRange) {
      setCount((prev) => prev + 1);
      const zeroTile = pensByColors2.find((a: any) => a.title === "0");
      const daa22 = pensByColors2.map((el: any) => {
        if (el.title === tile.title) {
          return { ...el, value: zeroTile.value };
        }
        if (el.title === "0") {
          return { ...el, value: tile.value };
        } else {
          return el;
        }
      });
      setTileList(daa22);
    }
  };

  useEffect(() => {
    if (
      tileList
        .filter((el: any) => el.title !== "0")
        .every((e: any, index: any) => Number(e.title) === index + 1) &&
      tileList[tileList.length - 1]?.title === "0"
    ) {
      alert(`축하드립니다람쥐. ${count}만에 맞추셨네요^^`);
    }
  }, [tileList]);

  return (
    <div>
      <div className="flex items-center justify-center w-full h-10 bg-red-400">
        <div className="text-xl text-white">
          flex 슬라이딩 퍼즐입니다람쥐 많관부~
        </div>
        <div className="ml-5 text-xl text-black">count:{count}</div>
      </div>
      <div className="grid grid-cols-4 grid-rows-4 gap-y-8 gap-x-8 h-[calc(100vh-40px)]">
        {tileList.map((el: any) => {
          if (el.title === "0") {
            return (
              <div
                className="w-full h-full bg-white cursor-pointer "
                key={el.title}
              />
            );
          } else {
            return (
              <div
                className="relative inline-flex items-center justify-center bg-red-300 border-black rounded-md shadow-lg cursor-pointer"
                key={el.title}
                onClick={() => {
                  moveTile(el);
                }}
              >
                <img
                  className="absolute object-fill w-2/5 rounded-lg shadow-lg"
                  src={el.img}
                />
                <div className="absolute top-0 text-6xl text-white">
                  {el.title}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
