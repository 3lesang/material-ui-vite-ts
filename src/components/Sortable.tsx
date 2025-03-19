import Box from "@mui/material/Box";
import { FC, useState } from "react";
import { ReactSortable } from "react-sortablejs";

interface ItemType {
  id: number;
  name: string;
  bgcolor: string;
}

export const BasicFunction: FC = () => {
  const [state, setState] = useState<ItemType[]>([
    { id: 1, name: "Shrek", bgcolor: "lightgreen" },
    { id: 2, name: "Fiona", bgcolor: "lightblue" },
    { id: 3, name: "Donkey", bgcolor: "lightyellow" },
  ]);

  return (
    <ReactSortable list={state} setList={setState} animation={200}>
      {state.map((item) => (
        <Box
          height={100}
          width={100}
          bgcolor={item.bgcolor}
          display="inline-block"
        />
      ))}
    </ReactSortable>
  );
};
