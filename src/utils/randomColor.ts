import { colors } from "../styling/styles/colors";

const colorPalette: string[] = [
  colors.groovBlue[5],
  colors.groovBlue[10],
  colors.groovMauve[5],
  colors.groovMauve[10],
  colors.groovGreen[5],
  colors.groovGreen[10],
  colors.grey[20],
  colors.groovMint[5],
  colors.groovMint[10],
  colors.groovMustard[5],
  colors.groovMustard[10],
  colors.groovOrange[5],
  colors.groovOrange[10],
  colors.groovPurple[5],
  colors.groovPurple[10],
];

export const randomColor = (): string => {
  return colorPalette[Math.floor(Math.random() * colorPalette.length)];
};
