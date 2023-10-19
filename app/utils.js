export function toPercent(percentDecimal) {
  if (percentDecimal == null) return "N/A%";

  return percentDecimal * 100 + "%";
}

export function toInt(number) {
  return Math.round(number);
}

export function getRarityColor(value) {
  switch (value) {
    case 0:
      // 普通
      return "white";
    case 1:
      // 精良
      return "#4CAF50";
    case 2:
      // 稀有
      return "#2196F3";
    case 3:
      // 史诗
      return "#9C27B0";
    case 4:
      // 独特
      return "#FF9800";
  }
}
