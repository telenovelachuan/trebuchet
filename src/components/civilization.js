import React, { Component } from 'react';
import plain from "../static/images/civ5/plain.png";


const COS30 = Math.sqrt(3) / 2;

class City {
    constructor(tile) {
        this.downtown = tile;
        this.tiles = tile.get_neighbors();
        this.tiles.push(tile);
    }

    outline = (ctx) => {    // draw the outline of the city boundary
        let color = "#c42f27";
        let width = 3;
        this.tiles.map(tile => {
            if (!tile.left_nb.is_in(this.tiles)) {tile.draw_edge(ctx, "left", color, width);}
            if (!tile.left_bot_nb.is_in(this.tiles)) {tile.draw_edge(ctx, "left_bot", color, width);}
            if (!tile.right_bot_nb.is_in(this.tiles)) {tile.draw_edge(ctx, "right_bot", color, width);}
            if (!tile.right_nb.is_in(this.tiles)) {tile.draw_edge(ctx, "right", color, width);}
            if (!tile.right_up_nb.is_in(this.tiles)) {tile.draw_edge(ctx, "right_up", color, width);}
            if (!tile.left_up_nb.is_in(this.tiles)) {tile.draw_edge(ctx, "left_up", color, width);}
        })
    }

    toString = () => {
        let result = "";
        this.tiles.map(tile => {
            result += " " + tile.toString();
        })
        return result;
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

    get_neighbors = () => {
        return [this.left_nb, this.left_bot_nb, this.right_bot_nb, this.right_nb, this.right_up_nb, this.left_up_nb];
    }

    equal = (_tile) => {
        return (this.loc_x == _tile.loc_x) && (this.loc_y == _tile.loc_y);
    }

    is_in = (_tiles) => {
        for (let i=0; i<_tiles.length; i++) {
            if (this.equal(_tiles[i])) {
                return true;
            }
        }
        return false;
    }

    draw_edge = (ctx, edge_name, color='grey', width=1) => {
        ctx.beginPath();
        let edge;
        if (edge_name == "left") {
            edge = this.left;
        }
        if (edge_name == "left_bot") {
            edge = this.left_bot;
        }
        if (edge_name == "right_bot") {
            edge = this.right_bot;
        }
        if (edge_name == "right") {
            edge = this.right;
        }
        if (edge_name == "right_up") {
            edge = this.right_up;
        }
        if (edge_name == "left_up") {
            edge = this.left_up;
        }
        ctx.moveTo(edge[0], edge[1]);
        ctx.lineTo(edge[2], edge[3]);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
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

    draw_logo = (ctx, logo_obj) => {
        this._outline(ctx);
        ctx.drawImage(logo_obj, this.loc_x, this.loc_y  - this.edge / 3, this.edge * 1.5, this.edge * 1.5);
        // let pattern = ctx.createPattern(logo_obj, "repeat");
        // ctx.fillStyle = pattern;
        // ctx.fill();
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


