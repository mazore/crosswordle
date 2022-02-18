export function rect(ctx, x, y, w, h, color, stroke = false, strokeInfo = { width: 1, color: '#000000' }) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    if (stroke) {
        ctx.lineWidth = strokeInfo.width;
        ctx.strokeStyle = strokeInfo.color;
        ctx.strokeRect(x, y, w, h);
    }
}

export function roundedRect(ctx, x, y, w, h, radius, color, stroke = false, strokeInfo = { width: 1, color: '#000000' }) {
    let r = radius;
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    if (stroke) {
        ctx.lineWidth = strokeInfo.width;
        ctx.strokeStyle = strokeInfo.color;
        ctx.stroke();
    }
    return ctx;
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
    ctx.fillText(str, x, y + 2);
}
