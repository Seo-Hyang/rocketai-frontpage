import React from "react";

type FortuneProps = {
  user_name: string;
  user_birth_year: number;
  user_birth_month: number;
  user_birth_day: number;
  user_birth_time: string; // "XX:XX"
};

type Color = "black" | "red" | "teal" | "white";

type CellColor = {
  kind: "color";
  pron: string;
  label: string;
  sub?: string;
  color?: Color;
};

type CellText = {
  kind: "text";
  label?: string;
  sub: string;
};

//멀티 데이터
type CellMulti = {
  kind: "multi";
  items: CellText[];
};

type Cell = CellColor | CellText | CellMulti;

const ColorTile: React.FC<{
  pron: string;
  label: string;
  sub?: string;
  color?: Color;
}> = ({ pron, label, sub, color = "white" }) => {
  const colorMap = {
    black: "bg-neutral-700 text-white",
    red: "bg-rose-600 text-white",
    teal: "bg-teal-700 text-white",
    white: "bg-white text-neutral-900 border-2 border-neutral-700",
  } as const;

  return (
    <div
      className={`py-[2px] w-10 sm:w-12 md:w-14 flex flex-col items-center justify-center rounded-lg lg:rounded-2xl ${colorMap[color]}
      lg:w-[70px]`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="text-[8px] lg:text-[11px] opacity-80">{pron}</div>
        <div className="text-sm lg:text-2xl font-bold leading-none">
          {label}
        </div>
        {sub ? (
          <div className="text-[8px] lg:text-[11px] opacity-80">{sub}</div>
        ) : null}
      </div>
    </div>
  );
};

const Tile: React.FC<{ label?: string; sub: string }> = ({ label, sub }) => (
  <div className="flex flex-col items-center justify-center rounded-md">
    {label ? (
      <div className="text-sm md:text-lg font-bold leading-none">{label}</div>
    ) : null}
    <div className="text-[11px] sm:text-[7px] opacity-80">{sub}</div>
  </div>
);

const CellRenderer: React.FC<{ cell: Cell }> = ({ cell }) => {
  if (cell.kind === "color") {
    const { pron, label, sub, color } = cell;
    return <ColorTile pron={pron} label={label} sub={sub} color={color} />;
  }
  if (cell.kind === "text") {
    const { label, sub } = cell;
    return (
      <div className="flex items-center justify-center">
        <Tile label={label} sub={sub} />
      </div>
    );
  }
  // multi
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="hidden xs:flex xs:flex-col xs:items-center xs:justify-center">
        <Tile label={cell.items[0].label} sub={cell.items[0].sub} />
        {cell.items.length > 1 && (
          <div className="text-xs text-neutral-500">…</div>
        )}
      </div>
      <div className="hidden sm:flex md:flex lg:flex flex-col items-center justify-center gap-1">
        {cell.items.map((it, i) => (
          <Tile key={i} label={it.label} sub={it.sub} />
        ))}
      </div>
    </div>
  );
};

const FortuneTable: React.FC<FortuneProps> = ({
  user_name,
  user_birth_year,
  user_birth_month,
  user_birth_day,
  user_birth_time,
}) => {
  // 좌측 행 제목
  const rowTitles = [
    <div>
      <span className="font-bold">十星</span> <br /> (십성)
    </div>,
    <div>
      <span className="font-bold">天干</span> <br /> (천간)
    </div>,
    <div>
      <span className="font-bold">地支</span> <br /> (지지)
    </div>,
    <div>
      <span className="font-bold">十星</span> <br /> (십성)
    </div>,
    <div>
      <span className="font-bold">十二運星</span> <br /> (십이운성)
    </div>,
    <div>
      <span className="font-bold">十二神殺</span> <br /> (십이신살)
    </div>,
    <div>
      <span className="font-bold">貴人</span> <br /> (귀인)
    </div>,
  ] as const;

  const colHeaders = ["時", "日", "月", "年"] as const;

  // ---- mockup data ----
  const rows: Cell[][] = [
    // 十星(십성)
    [
      { kind: "text", label: "傷官", sub: "(상관)" },
      { kind: "text", label: "比肩", sub: "(비견)" },
      { kind: "text", label: "傷官", sub: "(상관)" },
      { kind: "text", label: "傷官", sub: "(상관)" },
    ],
    // 天干(천간)
    [
      { kind: "color", pron: "임", label: "壬", sub: "양수", color: "black" },
      { kind: "color", pron: "정", label: "丁", sub: "음화", color: "red" },
      { kind: "color", pron: "계", label: "癸", sub: "음수", color: "black" },
      { kind: "color", pron: "계", label: "癸", sub: "음수", color: "black" },
    ],
    // 地支(지지)
    [
      { kind: "color", pron: "인", label: "寅", sub: "양목", color: "teal" },
      { kind: "color", pron: "사", label: "巳", sub: "음화", color: "red" },
      { kind: "color", pron: "해", label: "亥", sub: "음수", color: "black" },
      { kind: "color", pron: "유", label: "酉", sub: "음금", color: "white" },
    ],
    // 十星(십성)
    [
      { kind: "text", label: "比肩", sub: "(비견)" },
      { kind: "text", label: "劫財", sub: "(겁재)" },
      { kind: "text", label: "食神", sub: "(식신)" },
      { kind: "text", label: "偏財", sub: "(편재)" },
    ],
    // 十二運星(십이운성)
    [
      { kind: "text", label: "死", sub: "(사)" },
      { kind: "text", label: "帝旺", sub: "(제왕)" },
      { kind: "text", label: "胎", sub: "(태)" },
      { kind: "text", label: "長生", sub: "(장생)" },
    ],
    // 十二神殺(십이신살)
    [
      { kind: "text", label: "劫殺", sub: "(겁살)" },
      { kind: "text", label: "地殺", sub: "(지살)" },
      { kind: "text", label: "驛馬殺", sub: "(역마살)" },
      { kind: "text", label: "將星殺", sub: "(장성살)" },
    ],
    // 貴人(귀인)
    [
      { kind: "text", sub: "(없음)" },
      { kind: "text", sub: "(없음)" },
      { kind: "text", label: "天乙", sub: "(천을귀인)" },
      {
        kind: "multi",
        items: [
          { kind: "text", label: "天乙", sub: "(천을귀인)" },
          { kind: "text", label: "太極", sub: "(태극귀인)" },
          { kind: "text", label: "文昌", sub: "(문창귀인)" },
        ],
      },
    ],
  ];
  // ---------------------------------------

  return (
    <section className="mx-auto w-full max-w-md p-5">
      <div className="mb-4 text-center text-neutral-700">
        <h2 className="text-sm md:text-lg font-semibold">
          {user_name}님의 사주
        </h2>
        <p className="mt-1 text-lg md:text-2xl font-bold text-neutral-700">
          {user_birth_year}년 {user_birth_month}월 {user_birth_day}일{" "}
          {user_birth_time}
        </p>
      </div>

      {/* 표 */}
      <div className="overflow-hidden border-b-2 border-r-2 border-neutral-900">
        <div className="grid grid-cols-5 border-b border-neutral-900">
          <div className="text-center text-sm font-medium text-neutral-700 border-r-2 border-neutral-900" />
          {colHeaders.map((h) => (
            <div
              key={h}
              className="py-2 text-center text-lg font-bold tracking-wide border-l border-neutral-400"
            >
              {h}
            </div>
          ))}
        </div>
        {rows.map((cells, rowIdx) => (
          <div
            key={`row-${rowIdx}`}
            className="grid grid-cols-5 border-b border-r border-neutral-900 last:border-b-0"
          >
            {/* 행 제목 */}
            <div className="flex items-center justify-center py-2 text-center text-xs xs:text-[10px] font-medium text-neutral-700 border-r-2 border-neutral-900">
              {rowTitles[rowIdx]}
            </div>

            {/* 내부 데이터 */}
            {cells.map((cell, colIdx) => (
              <div
                key={`r${rowIdx}-c${colIdx}`}
                className="bg-white py-1 flex items-center justify-center border-t border-t-neutral-900 border-r border-r-neutral-500 last:border-r-0"
              >
                <CellRenderer cell={cell} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FortuneTable;
