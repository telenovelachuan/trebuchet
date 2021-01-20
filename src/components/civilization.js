import React, { Component } from 'react';
import plain from "../static/images/civ5/plain.png";


const COS30 = Math.sqrt(3) / 2;

class City {
    constructor(tile) {
        this.downtown = tile;
    }
}


class Tile {
    constructor(loc_x, loc_y, terrain, ter_img, edge=30) {
        this.loc_x = loc_x;
        this.loc_y = loc_y;
        this.edge = edge;
        this.left = [loc_x, loc_y, loc_x, loc_y + edge];
        this.left_bot = [loc_x, loc_y + edge, loc_x + edge * COS30, loc_y + edge * 1.5];
        this.right_bot = [loc_x + edge * COS30, loc_y + edge * 1.5, loc_x + edge * COS30 * 2, loc_y + edge];
        this.right = [loc_x + edge * COS30 * 2, loc_y + edge, loc_x + edge * COS30 * 2, loc_y];
        this.right_up = [loc_x + edge * COS30 * 2, loc_y, loc_x + edge * COS30, loc_y - edge * 0.5];
        this.left_up = [loc_x + edge * COS30, loc_y - edge * 0.5, loc_x, loc_y];
        this.edges = [this.left, this.left_bot, this.right_bot, this.right, this.right_up, this.left_up];
        this.terrain = terrain;
        this.ter_img = ter_img;
        this.left_nb = null;
        this.left_bot_nb = null;
        this.right_bot_nb = null;
        this.right_nb = null;
        this.right_up_nb = null;
        this.left_up_nb = null;
    }

    _outline = (ctx) => {
        ctx.beginPath();
        this.edges.map((edge, idx) => {
            if (idx == 0) {
                ctx.moveTo(edge[0], edge[1]);
                ctx.lineTo(edge[2], edge[3]);
            }
            else {
                ctx.lineTo(edge[0], edge[1]);
                ctx.lineTo(edge[2], edge[3]);
            }
        })
        ctx.closePath();
    }

    draw_terrain = (ctx, img_obj) => {
        this._outline(ctx);
        let pattern = ctx.createPattern(img_obj, "repeat");
        ctx.fillStyle = pattern;
        ctx.fill();
    }

    fill_white = (ctx) => {
        this._outline(ctx);
        ctx.fillStyle = "#FFF";
        ctx.fill();
        ctx.fillRect(this.loc_x, this.loc_y, 30, 30);
    }

    toString = () => {
        return "Tile (" + this.loc_x + ", " + this.loc_y + ")";
    }
}

export {City, Tile}


