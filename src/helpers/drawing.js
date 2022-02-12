export function rect(ctx, x, y, w, h, color, stroke = false, strokeInfo = { width: 1, color: '#000' }) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    if (stroke) {
        ctx.lineWidth = strokeInfo.width;
        ctx.strokeStyle = strokeInfo.color;
        ctx.strokeRect(x, y, w, h);
    }
}

export function text(ctx, str, x, y, color = '#ffffff', size = 25, bold = false) {
    ctx.fillStyle = color;
    if (bold) {
        ctx.font = `bold ${size}px Arial`;
    } else {
        ctx.font = `${size}px Arial`;
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(str, x, y+2);
}
