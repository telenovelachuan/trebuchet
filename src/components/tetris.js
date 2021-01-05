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
]

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
    constructor(comps) {
        this.components = comps;
        this.landed = false;
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
    descend = (base_dict) => {
        if (this.has_landed(base_dict)) {
            if (this.landed) return;
            this.landed = true;
            return;
        }
        console.log("descending");
        for (let i=0; i<this.all_components.length; i++) {
            let comp = this.all_components[i];  // descend all components!
            comp.descend();
        }
        if (this.has_landed(base_dict)) {
            if (this.landed) return;
            this.landed = true;
        }
    }
    has_landed = (base_dict) => {
        // check if any component hits the ground
        let str = ""
        for (let i=0; i<this.components.length; i++) {
            let comp = this.components[i]
            let x_id = comp.loc_x / comp.edge;
            let ground = base_dict[x_id];
            if ((comp.loc_y + comp.edge) >= ground) { return true; }
        }
        return false;
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
    budge = (direction, ctx) => {
        this.clear(ctx);
        for (let i=0; i<this.all_components.length; i++) {
            this.all_components[i].budge(direction)
        }
    }
}

class T extends Shape {
    constructor(loc_x, loc_y, edge=20) {
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
    constructor(loc_x, loc_y, {rotation="left", edge=20}) {
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
        this.components = this.morphs["m" + (this.current_morph % 4).toString()];
    }
}


class Tetris extends Component {

    constructor(props) {
        super(props);
        this.canvas = null;
        this.ctx = null;
        this.edge = 20;
        this.height = 20
        this.width = 10;
        this.base = {};
        for (let i=0; i<this.width; i++) {
            this.base[i] = this.height * this.edge;
        }
        this.state = {
            tick: 0,
        };
        let first_shape = new L(100, 0, {rotation: "right"});
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
            this.base[x_id] = shape_base[x_id];
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
        let new_shape = new L(100, 0, {rotation: "right"});
        this.shapes.push(new_shape);
        this.shape_in_play = new_shape;
    }

    check_lose = () => {
        for (let x_id in this.base) {
            if (this.base[x_id] <= 0) return true;
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

