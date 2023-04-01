import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CardProps,
  LanguageProps,
  RegionProps,
  UserProps,
  ThemeProps,
} from "@src/interfaces";

const appKey = "@MovieVerse:config";

type DataProps = {
  user: UserProps;
  favorites: CardProps[];
  theme: ThemeProps;
  adult: boolean;
  language: LanguageProps;
  region: RegionProps;
};

export type setDataProps = {
  data: DataProps;
};

export const saveDataToStorage = async ({ data }: setDataProps) => {
  const jsonValue = JSON.stringify(data);
  await AsyncStorage.setItem(appKey, jsonValue);
};

export const getData = async (): Promise<DataProps | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(appKey);

    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error reading value from AsyncStorage:", error);
    return null;
  }
};
