import React, { Component, useRef, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const L_LEFT_SHAPE = [
    [0, 3, 4, 5],
    [1, 4, 6, 7],
    [0, 1, 2, 5],
    [1, 2, 4, 7]
];
const L_RIGHT_SHAPE = [
    [2, 3, 4, 5],
    [0, 1, 4, 7],
    [3, 4, 5, 6],
    [1, 4, 7, 8]
];
const Z_LEFT_SHAPE = [
    [0, 1, 4, 5],
    [2, 4, 5, 7]
];
const Z_RIGHT_SHAPE = [
    [1, 2, 3, 4],
    [1, 4, 5, 8]
];
const DEFAULT_EDGE = 20;

class Rect {
    constructor(loc_x, loc_y, edge) {
        this.loc_x = loc_x;
        this.loc_y = loc_y;
        this.edge = edge;
        this.border = 1;
    }

    set_loc = (x, y) => {
        this.loc_x = x;
        this.loc_y = y;
    }
    get_loc = () => {
        return [this.loc_x, this.loc_y];
    }
    draw = (ctx) => {
        ctx.fillStyle = '#000';
        ctx.fillRect(this.loc_x, this.loc_y, this.edge, this.edge);
        ctx.fillStyle = '#FFF';
        ctx.fillRect(this.loc_x + this.border, this.loc_y + this.border, this.edge - 2 * this.border, this.edge - 2 * this.border);
    }
    clear = (ctx) => {
        ctx.fillStyle = '#FFF';
        ctx.fillRect(this.loc_x, this.loc_y, this.edge, this.edge);  
    }
    descend = () => {
        this.set_loc(this.loc_x, this.loc_y + this.edge);
    }
    budge = (direction) => {
        if (direction == "left") {
            this.set_loc(this.loc_x - this.edge, this.loc_y);
        }
        else {
            this.set_loc(this.loc_x + this.edge, this.loc_y);
        }
    }

}

class Shape {
    constructor(comps, edge=DEFAULT_EDGE) {
        this.components = comps;
        this.landed = false;
        this.edge = edge;
        this.base_updated = false;
    }
    draw = (ctx) => {
        for (let i=0; i<this.components.length; i++) {
            this.components[i].draw(ctx);
        }
        ctx.stroke();
    }
    clear = (ctx) => {
        for (let i=0; i<this.all_components.length; i++) {
            this.all_components[i].clear(ctx);
        }
        ctx.stroke();
    }
    descend = (base) => {
        if (this.has_landed(base)) {
            if (this.landed) return;
            this.landed = true;
            return;
        }
        console.log("descending");
        for (let i=0; i<this.all_components.length; i++) {
            let comp = this.all_components[i];  // descend all components!
            comp.descend();
        }
        if (this.has_landed(base)) {
            if (this.landed) return;
            this.landed = true;
        }
    }
    has_landed = (base) => {
        // check if any component hits the ground
        let bottom_comps = this.get_bottom_comp();
        console.log(base);
        for (let i=0; i<bottom_comps.length; i++) {
            let comp = bottom_comps[i];
            let y_id = comp.loc_y / comp.edge + 1;  // check the cell beneath the bottom comp
            let x_id = comp.loc_x / comp.edge;
            console.log("y_id:" + y_id + ", x_id:" + x_id);
            console.log(base[y_id])
            if (y_id == (base.length) || base[y_id][x_id] == true) {return true;}
        }
        return false;

        // for (let i=0; i<this.components.length; i++) {
        //     let comp = this.components[i]
        //     let x_id = comp.loc_x / comp.edge;
        //     let ground = base_dict[x_id];
        //     if ((comp.loc_y + comp.edge) >= ground) { return true; }
        // }
        // return false;
    }
    get_base = () => {
        let results = {};
        for (let i=0; i<this.components.length; i++) {
            let comp = this.components[i];
            let x_id = comp.loc_x / comp.edge;
            if (!(x_id in results)) {
                results[x_id] = comp.loc_y;
            }
            else if (comp.loc_y < results[x_id]) {
                results[x_id] = comp.loc_y;
            }
        }
        return results;
    }
    get_bottom = () => {
        let result = -1;
        for (let i=0; i<this.components.length; i++) {
            if (this.components[i].loc_y > result) {
                result = this.components[i].loc_y;
            }
        }
        return result + this.edge;
    }
    get_top = () => {
        let result = Infinity;
        for (let i=0; i<this.components.length; i++) {
            if (this.components[i].loc_y < result) {
                result = this.components[i].loc_y;
            }
        }
        return result;
    }
    get_bottom_comp = () => {
        let bottom = this.get_bottom();
        let results = [];
        for (let i=0; i<this.components.length; i++) {
            if ((this.components[i].loc_y + this.edge) == bottom)
                results.push(this.components[i]);
        }
        return results;
    }
    budge = (direction, ctx) => {
        this.clear(ctx);
        for (let i=0; i<this.all_components.length; i++) {
            this.all_components[i].budge(direction)
        }
    }
}

class T extends Shape {
    constructor(loc_x, loc_y, edge=DEFAULT_EDGE) {
        let top = new Rect(loc_x, loc_y, edge);
        let left = new Rect(loc_x - edge, loc_y + edge, edge);
        let mid = new Rect(loc_x, loc_y + edge, edge);
        let right = new Rect(loc_x + edge, loc_y + edge, edge);
        let bot = new Rect(loc_x, loc_y + edge * 2, edge);
        let components = [top, left, mid, right];
        super(components);
        this.components = components;
        this.all_components = [top, left, mid, right, bot];
        this.top = top;
        this.left = left;
        this.mid = mid;
        this.right = right;
        this.bot = bot;
        this.morphs = this.construct_morph();
        this.current_morph = 0;
    }

    construct_morph = () => {
        let morphs = {
            "m0": [this.top, this.left, this.mid, this.right],
            "m1": [this.top, this.left, this.mid, this.bot],
            "m2": [this.left, this.mid, this.right, this.bot],
            "m3": [this.top, this.mid, this.right, this.bot]
        };
        return morphs;
    }

    change_morph = () => {
        this.current_morph += 1;
        this.components = this.morphs["m" + (this.current_morph % 4).toString()];
    }
}

class L extends Shape {
    constructor(loc_x, loc_y, {rotation="left", edge=DEFAULT_EDGE}) {
        let all_components = [];
        for (let j=0; j<3; j++)
            for (let i=-1; i<2; i++) {
                let cell = new Rect(loc_x + i * edge, loc_y + j * edge, edge);
                all_components.push(cell);
            }
        let components;
        if (rotation == "left") 
            components = [all_components[0], all_components[3], all_components[4], all_components[5]];
        else
            components = [all_components[2], all_components[3], all_components[4], all_components[5]];
        super(components);
        this.components = components;
        this.rotation = rotation;
        this.all_components = all_components;
        this.morphs = this.construct_morph();
        this.current_morph = 0;
    }

    construct_morph = () => {
        let morph_indices = this.rotation == "left" ? L_LEFT_SHAPE : L_RIGHT_SHAPE;
        let morphs = {};
        for (let i=0; i<morph_indices.length; i++) {
            let morph_arr = [];
            for (let j=0; j<morph_indices[i].length; j++) {
                let idx = morph_indices[i][j];
                morph_arr.push(this.all_components[idx]);
            }
            morphs["m" + i.toString()] = morph_arr;
        }
        return morphs;
    }

    change_morph = () => {
        this.current_morph += 1;
        this.components = this.morphs["m" + (this.current_morph % L_LEFT_SHAPE.length).toString()];
    }
}

class Square extends Shape {
    constructor(loc_x, loc_y, edge=DEFAULT_EDGE) {
        let components = [
            new Rect(loc_x, loc_y, edge),
            new Rect(loc_x + edge, loc_y, edge),
            new Rect(loc_x, loc_y + edge, edge),
            new Rect(loc_x + edge, loc_y + edge, edge)
        ];
        super(components);
        this.components = components;
        this.all_components = components;
        this.morphs = {"m0": components};
        this.current_morph = 0;
    }
    change_morph = () => {};
}

class Z extends Shape {
    constructor(loc_x, loc_y, {rotation="left", edge=DEFAULT_EDGE}) {
        let all_components = [];
        for (let j=0; j<3; j++)
            for (let i=-1; i<2; i++) {
                let cell = new Rect(loc_x + i * edge, loc_y + j * edge, edge);
                all_components.push(cell);
            }
        let components;
        if (rotation == "left") 
            components = [all_components[0], all_components[1], all_components[4], all_components[5]];
        else
            components = [all_components[1], all_components[2], all_components[3], all_components[4]];
        super(components);
        this.components = components;
        this.rotation = rotation;
        this.all_components = all_components;
        this.morphs = this.construct_morph();
        this.current_morph = 0;
    }

    construct_morph = () => {
        let morph_indices = this.rotation == "left" ? Z_LEFT_SHAPE : Z_RIGHT_SHAPE;
        let morphs = {};
        for (let i=0; i<morph_indices.length; i++) {
            let morph_arr = [];
            for (let j=0; j<morph_indices[i].length; j++) {
                let idx = morph_indices[i][j];
                morph_arr.push(this.all_components[idx]);
            }
            morphs["m" + i.toString()] = morph_arr;
        }
        return morphs;
    }

    change_morph = () => {
        this.current_morph += 1;
        this.components = this.morphs["m" + (this.current_morph % Z_LEFT_SHAPE.length).toString()];
    }
}

class I extends Shape {
    constructor(loc_x, loc_y, edge=DEFAULT_EDGE) {
        let c1 = new Rect(loc_x, loc_y, edge);
        let c2 = new Rect(loc_x + edge, loc_y, edge);
        let c3 = new Rect(loc_x - edge, loc_y, edge);
        let c4 = new Rect(loc_x + edge * 2, loc_y, edge);
        let c1_ = new Rect(loc_x, loc_y - edge, edge);
        let c3_ = new Rect(loc_x, loc_y + edge, edge);
        let c4_ = new Rect(loc_x, loc_y + 2 * edge, edge);
        let components = [c1, c2, c3, c4];
        super(components);
        this.components = components;
        this.all_components = [c1, c2, c3, c4, c1_, c3_, c4_];
        this.morphs = {"m0": components};
        this.c1 = c1;
        this.c1_ = c1_;
        this.c3_ = c3_;
        this.c4_ = c4_;
        this.loc_x = loc_x;
        this.loc_y = loc_y;
        this.edge = edge;
        this.construct_morph();
        this.current_morph = 0;

    }

    construct_morph = () => {
        this.morphs["m1"] = [this.c1_, this.c1, this.c3_, this.c4_];
    }

    change_morph = () => {
        this.current_morph += 1;
        this.components = this.morphs["m" + (this.current_morph % 2).toString()];
    }
}


class Tetris extends Component {

    constructor(props) {
        super(props);
        this.canvas = null;
        this.ctx = null;
        this.edge = DEFAULT_EDGE;
        this.height = 10
        this.width = 10;
        this.base = [];
        for (let i=0; i<this.height; i++) {
            let _row = [];
            for (let j=0; j<this.width; j++)
                _row.push(false);
            this.base[i] = _row;
        }
        
        this.state = {
            tick: 0,
        };
        let first_shape = new I(this.width * this.edge / 2, 0);
        this.shapes = [first_shape];
        this.shape_in_play = first_shape;
    }

    clear_all_shapes = () => {
        for (let i=0; i<this.shapes.length; i++) {
            this.shapes[i].clear(this.ctx);
        }
    }
    drwa_all_shapes = () => {
        for (let i=0; i<this.shapes.length; i++) {
            this.shapes[i].draw(this.ctx);
        }
    }

    update_base = (shape) => {
        if (shape.base_updated) return;
        let shape_base = shape.get_base();
        for (let i=0; i<shape.components.length; i++) {
            let comp = shape.components[i];
            let x_id = comp.loc_x / comp.edge;
            let y_id = comp.loc_y / comp.edge;
            this.base[y_id][x_id] = true;
        }
        shape.base_updated = true;
        console.log(this.base)
    }

    handleKeyPress = e => {
        console.log(e.keyCode);
        if (e.keyCode == 38) {  // up keydown
            this.shape_in_play.change_morph();
        }
        else if (e.keyCode == 37) {
            this.shape_in_play.budge("left", this.ctx);
        }
        else if (e.keyCode == 39) {
            this.shape_in_play.budge("right", this.ctx);
        }
    }

    init_new_shape = () => {
        let new_shape = new I(100, 0);
        this.shapes.push(new_shape);
        this.shape_in_play = new_shape;
    }

    check_lose = () => {
        for (let i=0; i<this.shapes.length; i++) {
            if (this.shapes[i].get_top() <= 0) return true;
        }
        return false;
    }

    timer_tick = () => {
        this.shape_in_play.clear(this.ctx);
        this.state.tick += this.edge;
        this.shape_in_play.descend(this.base);
        if (this.shape_in_play.landed == true && this.shape_in_play.base_updated == false) {
            this.update_base(this.shape_in_play);
            this.init_new_shape();
        }
        this.drwa_all_shapes();
        if (this.check_lose()) {
            console.log("lost!!");
            clearInterval(this.interval);
        }

    }

    componentWillMount() {
        document.addEventListener("keydown", this.handleKeyPress.bind(this));
    }

    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = "40px Courier";
        this.ctx.beginPath();
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, 50, 50)

        this.ctx.moveTo(0, this.height * this.edge);
        this.ctx.lineTo(this.width * this.edge, this.height * this.edge);
        this.ctx.stroke();
        this.interval = setInterval(this.timer_tick, 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        document.removeEventListener("keydown", this.handleKeyPress.bind(this));
      }

    render () {
    return (
        <div className="content" id="tetris_content">
            tetris
            <canvas ref="canvas" width={this.width * this.edge} height={this.height * this.edge} />
        </div>
    )}
}

export default Tetris;

