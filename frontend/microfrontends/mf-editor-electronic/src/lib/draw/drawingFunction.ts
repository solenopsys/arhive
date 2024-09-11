export type Point ={
  x: number;
  y: number;
}

export type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
}

export type Rect = {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type Cicle = {
  x: number;
  y: number;
  radius: number;
}

export function drawPins() {
  console.log('OK');
}


export const drawLine = (point: Point, graph: Line, ctx: CanvasRenderingContext2D, color?: string, scale: number = 1, angle: number = 0) => {
  ctx.beginPath();
  ctx.lineWidth = graph.width ? graph.width * scale : 1 * scale;
  // ctx.lineCap = 'round';
  ctx.lineTo((graph.x1 + point.x) * scale, (graph.y1 + point.y) * scale);
  ctx.lineTo((graph.x2 + point.x) * scale, (graph.y2 + point.y) * scale);
  // @ts-ignore
  ctx.strokeStyle = color;
  ctx.stroke();
};

export const drawRect = (point: Point, graph: Rect, ctx: CanvasRenderingContext2D, color?: string, scale: number = 1, angle = 0) => {
  ctx.rotate(angle);
  console.log('rect');
  console.log(graph.w * scale);
  console.log(graph.h * scale);
  ctx.beginPath();
  ctx.rect((graph.x + point.x) * scale, (graph.y + point.y) * scale, graph.w * scale, graph.h * scale);
  // @ts-ignore
  ctx.fillStyle = color;

  ctx.fill();
  ctx.rotate(-angle);
};


export const drawCircle = (point: Point, graph: Cicle, ctx: CanvasRenderingContext2D, color?: string, scale: number = 1, angle: number = 0) => {
  ctx.beginPath();
  ctx.arc((graph.x + point.x) * scale, (graph.y + point.y) * scale, graph.radius * scale, 0, 2 * Math.PI, false);
  // @ts-ignore
  ctx.fillStyle = color;
  ctx.fill();
};

const drawMap:any = {
  line: drawLine,
  rect: drawRect,
  circle: drawCircle
};

export const drawItem = (key: string, point: Point, graph: any, ctx: CanvasRenderingContext2D, color?: string, scale: number = 1, angle: number = 0) => {
  const func = drawMap[key];
  func(point, graph, ctx, color, scale, angle);
};


export const drawPin = (point: Point, graph: Point, ctx: CanvasRenderingContext2D, color?: string) => {
  ctx.beginPath();
  ctx.arc(graph.x + point.x, graph.y + point.y, 2, 0, 2 * Math.PI, false);
  // @ts-ignore
  ctx.fillStyle = color;
  ctx.fill();
};


export const extractOutline = (draws: any[]): { w: number, h: number } => {
  let w = 0;
  let h = 0;
  draws.forEach((dr) => {
    console.log(dr);
    w = Math.max(w, dr.x2);
    h = Math.max(h, dr.y2);
  });
  return {w, h};
};


export const calcOffset = (elementSize: { w: number, h: number }, drawSize: { w: number, h: number }): Point => {
  const clearanse = 0.5;
  return {x: (drawSize.w - elementSize.w) / 2 - clearanse, y: (drawSize.h - elementSize.h) / 2 - clearanse};
};


export const drawLayout = (offsetPoint: { x: number; y: number }, layout: any, ctx: CanvasRenderingContext2D, scale: number = 1, angle: number = 0) => {
  layout.copper.forEach((graph: any) => {
    console.log('WR');
    console.log(scale);
    drawItem(graph.type, offsetPoint, graph, ctx, 'red', scale, angle);
  });
};
