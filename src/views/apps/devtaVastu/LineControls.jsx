// import React from "react";
// import { Settings } from "lucide-react";
// import { LINE_STYLES } from "../../../utils/directions";

// const LineControls = ({ lineSet, onUpdate, setIndex }) => {
//   return (
//     <div className="flex-grow lg:min-w-[254px]">
//       <fieldset className="p-4 border border-purple-300 rounded-lg">
//         <legend className="font-semibold px-2">{lineSet.name}</legend>

//         <div className="flex flex-col gap-1">
//           <div className="flex items-center">
//             <label className="text-sm text-gray-600 w-[30%]">Color:</label>
//             <input
//               type="color"
//               value={lineSet.stroke}
//               onChange={(e) => onUpdate(setIndex, { stroke: e.target.value })}
//               className="w-6 h-6 border rounded cursor-pointer"
//             />
//           </div>

//           <div className="flex items-center">
//             <label className="text-sm text-gray-600 w-[30%]">Width:</label>
//             <select
//               value={lineSet.strokeWidth}
//               onChange={(e) =>
//                 onUpdate(setIndex, { strokeWidth: parseFloat(e.target.value) })
//               }
//               className="border p-2 rounded"
//             >
//               {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value) => (
//                 <option key={value} value={value}>
//                   {value}
//                 </option>
//               ))}
//             </select>

//           </div>

//           <div className="flex items-center">
//             <label className="text-sm text-gray-600 w-[30%]">Style:</label>
//             <select
//               value={
//                 lineSet.strokeDasharray
//                   ? Object.keys(LINE_STYLES).find(
//                     (style) => LINE_STYLES[style] === lineSet.strokeDasharray
//                   )
//                   : "solid"
//               }
//               onChange={(e) =>
//                 onUpdate(setIndex, {
//                   strokeDasharray:
//                     e.target.value === "solid"
//                       ? ""
//                       : LINE_STYLES[e.target.value],
//                 })
//               }
//               className="text-sm border rounded p-1 w-28 text-gray-700"
//             >
//               {Object.keys(LINE_STYLES).map((style) => (
//                 <option key={style} value={style}>
//                   {style.charAt(0).toUpperCase() + style.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </fieldset>
//     </div>
//   );
// };

// export default LineControls;

// import React from "react";

// import { LINE_STYLES } from "../../../utils/directions";

// export const LineControls = ({ lineSet, onUpdate, setIndex }) => {
//   return (
//     <div className="space-y-1.5">
//       {/* Compact Title */}
//       <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-0.5">
//         {lineSet.name}
//       </label>

//       {/* Ultra Compact Control Bar */}
//       <div className="flex items-center gap-2">
//         {/* Color Picker */}
//         <input
//           type="color"
//           value={lineSet.stroke}
//           onChange={(e) => onUpdate(setIndex, { stroke: e.target.value })}
//           className="w-10 h-8 rounded cursor-pointer border border-gray-300 hover:border-gray-400 transition-colors"
//           title="Color"
//         />

//         {/* Width Dropdown */}
//         <div className="flex-1 relative">
//           <select
//             value={lineSet.strokeWidth}
//             onChange={(e) =>
//               onUpdate(setIndex, { strokeWidth: parseFloat(e.target.value) })
//             }
//             className="w-full h-8 pl-7 pr-8 text-[11px] font-medium bg-white border border-gray-300 rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer appearance-none"
//           >
//             {[0.5, 1, 1.5, 2, 2.5, 3].map((v) => (
//               <option key={v} value={v}>
//                 {v}px
//               </option>
//             ))}
//           </select>
//           <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14" />
//           </svg>
//           <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </div>

//         {/* Style Dropdown */}
//         <div className="flex-1 relative">
//           <select
//             value={
//               lineSet.strokeDasharray
//                 ? Object.keys(LINE_STYLES).find(
//                     (s) => LINE_STYLES[s] === lineSet.strokeDasharray
//                   )
//                 : "solid"
//             }
//             onChange={(e) =>
//               onUpdate(setIndex, {
//                 strokeDasharray:
//                   e.target.value === "solid"
//                     ? ""
//                     : LINE_STYLES[e.target.value],
//               })
//             }
//             className="w-full h-8 pl-7 pr-8 text-[11px] font-medium bg-white border border-gray-300 rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer appearance-none"
//           >
//             {Object.keys(LINE_STYLES).map((s) => (
//               <option key={s} value={s}>
//                 {s.charAt(0).toUpperCase() + s.slice(1)}
//               </option>
//             ))}
//           </select>
//           <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16" />
//           </svg>
//           <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default LineControls;

//   import React, { useState } from "react";
// import { LINE_STYLES } from "../../../utils/directions";

// export const LineControls = ({ lineSet, onUpdate, setIndex }) => {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <div className="relative">
//       {/* Collapsed State - Chip Style */}
//       <div 
//         className={`
//           relative overflow-hidden rounded-full border-2 transition-all duration-300 cursor-pointer
//           ${expanded ? 'border-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'}
//         `}
//         onClick={() => setExpanded(!expanded)}
//       >
//         {/* Compact Chip View */}
//         <div className="flex items-center gap-2 px-2.5 py-1.5">
//           {/* Color Dot */}
//           <div 
//             className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex-shrink-0 ring-1 ring-gray-200"
//             style={{ backgroundColor: lineSet.stroke }}
//           />
          
//           {/* Live Line Preview */}
//           <div className="flex-1 min-w-0 flex items-center justify-center h-4">
//             <svg width="32" height="3" className="opacity-80">
//               <line
//                 x1="0" y1="1.5" x2="32" y2="1.5"
//                 stroke={lineSet.stroke}
//                 strokeWidth={Math.min(lineSet.strokeWidth * 0.6, 2)}
//                 strokeDasharray={lineSet.strokeDasharray}
//               />
//             </svg>
//           </div>

//           {/* Label */}
//           <span className="text-[10px] font-bold text-gray-700 truncate max-w-[60px]">
//             {lineSet.name}
//           </span>

//           {/* Expand Icon */}
//           <svg 
//             className={`w-3 h-3 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expanded ? 'rotate-180' : ''}`}
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//           </svg>
//         </div>
//       </div>

//       {/* Expanded Controls - Dropdown Style */}
//       {expanded && (
//         <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-xl p-3 z-50 animate-in slide-in-from-top-2 duration-200">
          
//           {/* Color Picker - Swatch Style */}
//           <div className="mb-3">
//             <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
//               Color Palette
//             </label>
//             <div className="flex items-center gap-2">
//               <div className="relative flex-1">
//                 <input
//                   type="color"
//                   value={lineSet.stroke}
//                   onChange={(e) => onUpdate(setIndex, { stroke: e.target.value })}
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   onClick={(e) => e.stopPropagation()}
//                 />
//                 <div 
//                   className="h-9 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all shadow-sm relative overflow-hidden group"
//                   style={{ backgroundColor: lineSet.stroke }}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
//                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                     <svg className="w-4 h-4 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//               <div className="text-[10px] font-mono font-semibold text-gray-600 bg-gray-50 px-2 py-1.5 rounded border border-gray-200">
//                 {lineSet.stroke.toUpperCase()}
//               </div>
//             </div>
//           </div>

//           {/* Width - Segmented Control Style */}
//           <div className="mb-3">
//             <div className="flex items-center justify-between mb-1.5">
//               <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">
//                 Thickness
//               </label>
//               <span className="text-[11px] font-bold text-blue-500 tabular-nums">
//                 {lineSet.strokeWidth}px
//               </span>
//             </div>
//             <div className="flex gap-1">
//               {[0.5, 1, 1.5, 2, 2.5, 3, 4, 5].map((width) => (
//                 <button
//                   key={width}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onUpdate(setIndex, { strokeWidth: width });
//                   }}
//                   className={`
//                     flex-1 h-7 text-[9px] font-bold rounded-md transition-all duration-150
//                     ${lineSet.strokeWidth === width 
//                       ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md scale-105' 
//                       : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
//                     }
//                   `}
//                 >
//                   {width}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Style - Icon Grid */}
//           <div>
//             <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
//               Line Style
//             </label>
//             <div className="grid grid-cols-2 gap-1.5">
//               {Object.keys(LINE_STYLES).map((style) => {
//                 const isActive = lineSet.strokeDasharray 
//                   ? LINE_STYLES[style] === lineSet.strokeDasharray 
//                   : style === "solid";
                
//                 return (
//                   <button
//                     key={style}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       onUpdate(setIndex, {
//                         strokeDasharray: style === "solid" ? "" : LINE_STYLES[style],
//                       });
//                     }}
//                     className={`
//                       h-9 px-2 rounded-lg transition-all duration-150 flex flex-col items-center justify-center gap-1
//                       ${isActive
//                         ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md' 
//                         : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
//                       }
//                     `}
//                   >
//                     <svg width="24" height="2">
//                       <line
//                         x1="2" y1="1" x2="22" y2="1"
//                         stroke={isActive ? "white" : "#4B5563"}
//                         strokeWidth="2"
//                         strokeDasharray={LINE_STYLES[style]}
//                       />
//                     </svg>
//                     <span className="text-[8px] font-bold uppercase tracking-wide">
//                       {style}
//                     </span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LineControls;

import React, { useState } from "react";
import { LINE_STYLES } from "../../../utils/directions";

export const LineControls = ({ lineSet, onUpdate, setIndex }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      {/* Expanded Controls - Dropdown Style (Positioned ABOVE) */}
      {expanded && (
        <div 
          className="absolute bottom-full left-0 right-0 mb-1 bg-white rounded-xl border border-gray-200 shadow-xl p-3 z-50 animate-in slide-in-from-bottom-2 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Color Picker - Swatch Style */}
          <div className="mb-3">
            <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Color Palette
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="color"
                  value={lineSet.stroke}
                  onChange={(e) => {
                    e.stopPropagation();
                    onUpdate(setIndex, { stroke: e.target.value });
                  }}
                  className="w-full h-9 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-blue-400 transition-all"
                  style={{ 
                    padding: '2px',
                  }}
                />
              </div>
              <div className="text-[10px] font-mono font-semibold text-gray-600 bg-gray-50 px-2 py-1.5 rounded border border-gray-200">
                {lineSet.stroke.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Width - Segmented Control Style */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                Thickness
              </label>
              <span className="text-[11px] font-bold text-blue-500 tabular-nums">
                {lineSet.strokeWidth}px
              </span>
            </div>
            <div className="flex gap-1">
              {[0.5, 1, 1.5, 2, 2.5, 3, 4, 5].map((width) => (
                <button
                  key={width}
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdate(setIndex, { strokeWidth: width });
                  }}
                  className={`
                    flex-1 h-7 text-[9px] font-bold rounded-md transition-all duration-150
                    ${lineSet.strokeWidth === width 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md scale-105' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }
                  `}
                >
                  {width}
                </button>
              ))}
            </div>
          </div>

          {/* Style - Icon Grid */}
          <div>
            <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Line Style
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.keys(LINE_STYLES).map((style) => {
                const isActive = lineSet.strokeDasharray 
                  ? LINE_STYLES[style] === lineSet.strokeDasharray 
                  : style === "solid";
                
                return (
                  <button
                    key={style}
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdate(setIndex, {
                        strokeDasharray: style === "solid" ? "" : LINE_STYLES[style],
                      });
                    }}
                    className={`
                      h-9 px-2 rounded-lg transition-all duration-150 flex flex-col items-center justify-center gap-1
                      ${isActive
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }
                    `}
                  >
                    <svg width="24" height="2">
                      <line
                        x1="2" y1="1" x2="22" y2="1"
                        stroke={isActive ? "white" : "#4B5563"}
                        strokeWidth="2"
                        strokeDasharray={LINE_STYLES[style]}
                      />
                    </svg>
                    <span className="text-[8px] font-bold uppercase tracking-wide">
                      {style}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Collapsed State - Chip Style */}
      <div 
        className={`
          relative overflow-hidden rounded-full border-2 transition-all duration-300 cursor-pointer
          ${expanded ? 'border-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'}
        `}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Compact Chip View */}
        <div className="flex items-center gap-2 px-2.5 py-1.5">
          {/* Color Dot */}
          <div 
            className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex-shrink-0 ring-1 ring-gray-200"
            style={{ backgroundColor: lineSet.stroke }}
          />
          
          {/* Live Line Preview */}
          <div className="flex-1 min-w-0 flex items-center justify-center h-4">
            <svg width="32" height="3" className="opacity-80">
              <line
                x1="0" y1="1.5" x2="32" y2="1.5"
                stroke={lineSet.stroke}
                strokeWidth={Math.min(lineSet.strokeWidth * 0.6, 2)}
                strokeDasharray={lineSet.strokeDasharray}
              />
            </svg>
          </div>

          {/* Label */}
          <span className="text-[10px] font-bold text-gray-700 whitespace-normal max-w-full break-words">
            {lineSet.name}
          </span>

          {/* Expand Icon */}
          <svg 
            className={`w-3 h-3 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LineControls;
