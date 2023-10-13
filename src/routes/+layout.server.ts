import { ruang } from "$lib/data";

export function load() {
  return {
    ruang: ruang.map((ruang) => ({
      ruang: ruang.ruang,
      img: ruang.img,
    })),
  };
}
