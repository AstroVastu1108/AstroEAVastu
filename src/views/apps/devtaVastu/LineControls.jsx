import React from "react";
import { Settings } from "lucide-react";
import { LINE_STYLES } from "../../../utils/directions";

const LineControls = ({ lineSet, onUpdate, setIndex }) => {
  return (
    <div className="flex-grow lg:min-w-[254px]">
      <fieldset className="p-4 border border-purple-300 rounded-lg">
        <legend className="font-semibold px-2">{lineSet.name}</legend>

        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <label className="text-sm text-gray-600 w-[30%]">Color:</label>
            <input
              type="color"
              value={lineSet.stroke}
              onChange={(e) => onUpdate(setIndex, { stroke: e.target.value })}
              className="w-6 h-6 border rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center">
            <label className="text-sm text-gray-600 w-[30%]">Width:</label>
            <select
              value={lineSet.strokeWidth}
              onChange={(e) =>
                onUpdate(setIndex, { strokeWidth: parseFloat(e.target.value) })
              }
              className="border p-2 rounded"
            >
              {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

          </div>

          <div className="flex items-center">
            <label className="text-sm text-gray-600 w-[30%]">Style:</label>
            <select
              value={
                lineSet.strokeDasharray
                  ? Object.keys(LINE_STYLES).find(
                    (style) => LINE_STYLES[style] === lineSet.strokeDasharray
                  )
                  : "solid"
              }
              onChange={(e) =>
                onUpdate(setIndex, {
                  strokeDasharray:
                    e.target.value === "solid"
                      ? ""
                      : LINE_STYLES[e.target.value],
                })
              }
              className="text-sm border rounded p-1 w-28 text-gray-700"
            >
              {Object.keys(LINE_STYLES).map((style) => (
                <option key={style} value={style}>
                  {style.charAt(0).toUpperCase() + style.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default LineControls;
