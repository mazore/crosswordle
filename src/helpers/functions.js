/** Returns r, g, and b channels (strings) from 'rgb(r, g, b)' string */
export function getRGB(str) {
    return str.match(/\d+/g);
}

/** Takes in two colors in rgb(r, g, b) format and returns a 50% average of them */
export function combineColors(color1, color2) {
    const [r1, g1, b1] = getRGB(color1);
    const [r2, g2, b2] = getRGB(color2);
    const r = (parseInt(r1, 10) + parseInt(r2, 10)) / 2;
    const g = (parseInt(g1, 10) + parseInt(g2, 10)) / 2;
    const b = (parseInt(b1, 10) + parseInt(b2, 10)) / 2;
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

/** Changes rgb values of `color` each by `change`, can be negative to darken */
export function lighten(color, change) {
    let [r, g, b] = getRGB(color);
    r = parseInt(r, 10) + change;
    g = parseInt(g, 10) + change;
    b = parseInt(b, 10) + change;
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}
