import React from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import { SketchPicker } from "react-color";

const ColorPicker = () => {
  const snap = useSnapshot(state);
  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        presetColors={[
          "#FF0000",
          "#00FF00",
          "#0000FF",
          "#FFFF00",
          "#00FFFF",
          "#FF00FF",
          "#FFFFFF",
          "#000000",
        ]}
        onChange={(color) => (state.color = color.hex)}
      />
    </div>
  );
};

export default ColorPicker;
