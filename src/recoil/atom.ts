import { atom } from "recoil";
import {
  Character,
  GetCharacterQuery,
  GetCharactersQuery,
} from "../__generated__/graphql";

export const characterListState = atom<GetCharactersQuery>({
  key: "characterListState",
  default: {},
});

export const characterState = atom<GetCharacterQuery>({
  key: "characterState",
  default: {},
});

export const characterLocationState = atom<{
  name: string;
  character_id: string;
}>({
  key: "characterLocationsState",
  default: { name: "", character_id: "" },
});

export const characterLocationListState = atom<
  {
    name: string;
    character_id: string;
  }[]
>({
  key: "characterLocationsListState",
  default: [],
});
