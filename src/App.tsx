import { useState, useEffect } from "react";

import "./index.css";

function App() {
  const [tileList, setTileList] = useState<any>([]);

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
        { title: "2", value: [2, 1] },
        { title: "1", value: [1, 1] },
        { title: "4", value: [4, 1] },
        { title: "5", value: [1, 2] },
        { title: "0", value: [3, 1] },
        { title: "6", value: [2, 2] },
        { title: "3", value: [3, 2] },
        { title: "8", value: [4, 2] },
        { title: "9", value: [1, 3] },
        { title: "10", value: [2, 3] },
        { title: "7", value: [3, 3] },
        { title: "12", value: [4, 3] },
        { title: "13", value: [1, 4] },
        { title: "14", value: [2, 4] },
        { title: "11", value: [3, 4] },
        { title: "15", value: [4, 4] },
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
      alert("축하드립니다람쥐.");
    }
  }, [tileList]);

  return (
    <div>
      <div className="w-full bg-red-400 h-10 flex justify-center items-center">
        <div className="text-white text-xl">
          flex 슬라이딩 퍼즐입니다람쥐 많관부~
        </div>
      </div>
      <div className="grid grid-cols-4 gap-y-8 gap-x-8 ">
        {tileList.map((el: any) => {
          if (el.title === "0") {
            return (
              <div
                className=" bg-white w-full h-full cursor-pointer"
                key={el.title}
              />
            );
          } else {
            return (
              <div
                className="bg-red-300 w-full h-44 cursor-pointer border-black  rounded-md inline-flex items-center justify-center text-8xl"
                key={el.title}
                onClick={() => {
                  moveTile(el);
                }}
              >
                {el.title}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
