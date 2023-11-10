import { Gradient } from "typescript-color-gradient";
import { YEAR_END_GRADIENT } from ".";

export const COLORS = {
  tcrt_red: "#A12A1E",
  tcrt_beige: "#BB9765",
  tcrt_yellow: "#FBD656",
  tcrt_olive: "#455041",
  tcrt_map_red: "#FA5340",
  tcrt_map_green: "#679D5F",
  streetcar: "#A12A1E",
  ferry: "#BB9765",
  horsecar: "#964B00",
  bus: "#679D5F",
  train: "#888",
  steampower: "#ff5533",
  off_white1: "#FFFFF0",
  off_white2: "#FCFBE8",
  black1: "#003355",

  map_bg_beige: "#f2eee8",
  map_bright_red: "#A12A1E",
  map_dark_red: "#AA3300",

  year_gradient_start: "#888888",
  year_gradient_end: "#AA3300",

  getYearGradients: () => {
    // const gradientArray = new Gradient()
    //   .setGradient(COLORS.year_gradient_start, COLORS.year_gradient_end)
    //   .setNumberOfColors(YEAR_END_GRADIENT.length - 1)
    //   .getColors();

    const gradientArray = ["#8599A4", "#D09D76", "#C1666B", "#A7353C"];

    return [COLORS.year_gradient_start, ...gradientArray];
  },
};
