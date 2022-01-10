import { Dispatch, SetStateAction } from "react";

interface result {
  id: number;
  statement: string;
  link: string;
}

const ListItem = ({ item, active, setSelected, setHovered }: ListItemType) => (
  <div
    className={`flex cursor-pointer p-2 item ${active ? "active" : ""}`}
    onClick={() => setSelected(item)}
    onMouseEnter={() => setHovered(item)}
    onMouseLeave={() => setHovered(undefined)}
  >
    {item.statement}
  </div>
);

type ListItemType = {
  item: result;
  active: boolean;
  setSelected: Dispatch<SetStateAction<SetStateAction<result>>>;
  setHovered: Dispatch<SetStateAction<result | undefined>>;
};

export default ListItem;
