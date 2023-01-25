import { Dimensions, TouchableOpacity } from "react-native";

//Calcular a altura dos quadradinhos com base no quanto tenho de tela disponível.

const WEEK_DAYS = 7; //quadradinhos por linha
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5; //espaçamento que temos dos lados da tela

export const DAY_MARGIN_BETWEEN = 8; //espaçamento entre os quadradinhos
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

export function HabitDay() {
  return (
    <TouchableOpacity
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
    />
  );
}
