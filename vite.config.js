import { defineConfig } from "vite";
import postcssPresetEnv from "postcss-preset-env";
import autoprefixer from "autoprefixer";
import postcssLogical from "postcss-logical";
import postcssCustomMedia from "postcss-custom-media";

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv(),
        postcssCustomMedia(),
        postcssLogical({ dir: "ltr" }),
        autoprefixer({ grid: "autoplace" }),
      ],
    },
  },
});
