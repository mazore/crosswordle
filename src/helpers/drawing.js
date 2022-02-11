export function rect(ctx, x, y, w, h, color, stroke = false, strokeInfo = { width: 1, color: '#000' }) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    if (stroke) {
        ctx.lineWidth = strokeInfo.width;
        ctx.strokeStyle = strokeInfo.color;
        ctx.strokeRect(x, y, w, h);
    }
}