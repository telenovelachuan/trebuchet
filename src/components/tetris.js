import React, { Component } from 'react';
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
const CELL_COLOR1 = "#4698c2"
const CELL_COLOR2 = "white"
const BORDER_COLOR = "black"

class Rect {
    constructor(loc_x, loc_y, edge) {
        this.loc_x = loc_x;
        this.loc_y = loc_y;
        this.edge = edge;
        this.border = 1;
        this.id = "c" + Date.now() + Math.random();
    }

    set_loc = (x, y) => {
        this.loc_x = x;
        this.loc_y = y;
    }
    get_loc = () => {
        return [this.loc_x, this.loc_y];
    }
    draw = (ctx) => {
        let grd = ctx.createLinearGradient(
            this.loc_x + this.border, this.loc_y + this.border,
            this.loc_x + this.edge - this.border, this.loc_y + this.edge - this.border);
        grd.addColorStop(0, CELL_COLOR1);
        grd.addColorStop(1, CELL_COLOR2);
        ctx.fillStyle = BORDER_COLOR;
        ctx.fillRect(this.loc_x, this.loc_y, this.edge, this.edge);
        ctx.fillStyle = grd;
        ctx.fillRect(this.loc_x + this.border, this.loc_y + this.border, this.edge - 2 * this.border, this.edge - 2 * this.border);
    }
    clear = (ctx) => {
        ctx.fillStyle = '#FFF';
        ctx.fillRect(this.loc_x, this.loc_y, this.edge, this.edge);  
    }
    descend = (level=1) => {
        this.set_loc(this.loc_x, this.loc_y + this.edge * level);
    }
    budge = (direction) => {
        if (direction == "left") {
            this.set_loc(this.loc_x - this.edge, this.loc_y);
        }
        else {
            this.set_loc(this.loc_x + this.edge, this.loc_y);
        }
    }
    toString = () => {
        return "(" + this.loc_x / this.edge + "," + this.loc_y / this.edge + ")";
    }

}

class Shape {
    constructor(comps, edge=DEFAULT_EDGE) {
        this.components = comps;
        this.landed = false;
        this.edge = edge;
        this.base_updated = false;
        this.id = "s" + Date.now() + Math.random();
        this.accelerate_level = 1;
    }
    draw = (ctx) => {
        for (let i=0; i<this.components.length; i++) {
            this.components[i].draw(ctx);
        }
        ctx.stroke();
    }
    clear = (ctx) => {
        for (let i=0; i<this.components.length; i++) {
            this.components[i].clear(ctx);
        }
        ctx.stroke();
    }
    accelerate_descend = () => {
        if (this.accelerate_level == 1) {
            this.accelerate_level += 1;
        }
    }
    get_highest_obstacle = (base) => {
        let result = base.length + 1;
        for (let i=0; i<this.components.length; i++) {
            let comp = this.components[i];
            let x_id = comp.loc_x / comp.edge;
            let y_id = comp.loc_y / comp.edge;
            // get the closest obstacle beneath the comp in this column
            let _obstacle_y_id;
            for (let j=y_id; j<base.length; j++) {
                if (base[j][x_id] == true) {
                    _obstacle_y_id = j;
                    break;
                }
            }
            if (_obstacle_y_id < result) {
                result = _obstacle_y_id;
            }
        }
        return result;
    }
    descend = (base, ctx) => {
        if (this.has_landed(base)) {
            if (this.landed) return;
            this.landed = true;
            return;
        }
        this.clear(ctx);
        let descend_speed = this.accelerate_level;
        let highest_obstacle = this.get_highest_obstacle(base);
        console.log("bot:" + this.get_bottom()/ this.edge + "descend_speed:"+descend_speed+"obs:"+highest_obstacle);
        if (this.get_bottom() / this.edge + descend_speed >= highest_obstacle) { // check possible collision
            descend_speed = 1;
        }

        for (let i=0; i<this.all_components.length; i++) {
            let comp = this.all_components[i];  // descend all components!
            comp.descend(descend_speed);
        }
        this.draw(ctx);
        if (this.has_landed(base)) {
            if (this.landed) return;
            this.landed = true;
        }
    }
    has_landed = (base) => {
        // check if any component hits the ground
        let bottom_comps = this.get_bottom_comp();
        for (let i=0; i<bottom_comps.length; i++) {
            let comp = bottom_comps[i];
            let y_id = comp.loc_y / comp.edge + 1;  // check the cell beneath the bottom comp
            let x_id = comp.loc_x / comp.edge;
            if (y_id === base.length || base[y_id][x_id] === true) { console.log("landed"); return true;}
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
    get_left = () => {
        let result = Infinity;
        for (let i=0; i<this.components.length; i++) {
            if (this.components[i].loc_x < result) {
                result = this.components[i].loc_x;
            }
        }
        return result;
    }
    get_right = () => {
        let result = -1;
        for (let i=0; i<this.components.length; i++) {
            if (this.components[i].loc_x > result) {
                result = this.components[i].loc_x;
            }
        }
        return result + this.edge;
    }
    get_bottom_comp = () => {
        let results = {};
        for (let i=0; i<this.components.length; i++) {
            let comp = this.components[i];
            let x_id = comp.loc_x / comp.edge;
            if (!(x_id in results)) {
                results[x_id] = comp;
            }
            else if (comp.loc_y > results[x_id].loc_y) {
                results[x_id] = comp;
            }
        }
        return Object.values(results);
    }
    budge = (direction, base, ctx) => {
        if (direction == "left" && this.get_left() <= 0) return;
        if (direction == "right" && this.get_right() >= ctx.canvas.width) return;
        let pos_after_budge;
        if (direction == "left") {
            pos_after_budge = this.components.map(c => [c.loc_x / c.edge - 1, c.loc_y / c.edge]);
        }
        else {
            pos_after_budge = this.components.map(c => [c.loc_x / c.edge + 1, c.loc_y / c.edge]);
        }
        if (this.check_collide(base, pos_after_budge) == true) {
            return;
        }
        this.clear(ctx);
        for (let i=0; i<this.all_components.length; i++) {
            this.all_components[i].budge(direction)
        }
        this.draw(ctx);
    }
    get_comp_by_id = (id) => {
        return this.components.filter(c => c.id == id)[0];
    }
    remove_components = (id_list, ctx) => {
        for (let i=0; i<id_list.length; i++) {
            let comp = this.get_comp_by_id(id_list[i]);
            comp.clear(ctx);
        }

        this.components = this.components.filter(c => !id_list.includes(c.id));
        this.all_components = this.all_components.filter(c => !id_list.includes(c.id));
    }
    check_collide = (base, positions) => {
        for (let i=0; i<positions.length; i++) {
            let x_id = positions[i][0];
            let y_id = positions[i][1];
            if (y_id < 0) continue;
            if (base[y_id][x_id] == true || y_id >= base.length || x_id < 0 || x_id >= base[0].length) return true;  // collided
        }
        return false;
    }
    change_morph = (base, ctx) => {
        let morph_idx = (this.current_morph + 1) % this.morph_num;
        let morph_comps = this.morphs["m" + morph_idx.toString()];
        let morph_comps_pos = morph_comps.map(c => [c.loc_x / c.edge, c.loc_y / c.edge]);
        if (this.check_collide(base, morph_comps_pos) == true) {
            return;
        }
        this.clear(ctx);
        this.current_morph += 1;
        this.components = this.morphs["m" + (this.current_morph % this.morph_num).toString()];
        this.draw(ctx);
    }
    toString = () => {
        let str = "Shape" + this.id + ": ";
        if (this.components.length == 0) return str + "(empty)"
        for (let i=0; i<this.components.length; i++) {
            str += " " + this.components[i].toString();
        }
        return str;
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
        this.type = "T";
        this.morph_num = 4;
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
        this.type = "L";
        this.morph_num = 4;
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
        this.type = "square";
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
        this.type = "Z";
        this.morph_num = 2;
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
        this.morphs = {"m0": components};
        this.c1 = c1;
        this.c2 = c2;
        this.c3 = c3;
        this.c1_ = c1_;
        this.c3_ = c3_;
        this.c4 = c4;
        this.c4_ = c4_;
        this.all_components = [this.c1, this.c2, this.c3, this.c4, this.c1_, this.c3_, this.c4_];
        this.loc_x = loc_x;
        this.loc_y = loc_y;
        this.edge = edge;
        this.construct_morph();
        this.current_morph = 0;
        this.type = "I";
        this.morph_num = 2;
    }

    construct_morph = () => {
        this.morphs["m1"] = [this.c1_, this.c1, this.c3_, this.c4_];
    }
}

const SHAPE_OPTIONS = [T, Square, L, Z, I];
const ROTATE_OPTIONS = ["left", "right"];
const FLICKER_CNT = 2;
const SINGLE_ROW_SCORE = 10;
const GAME_SPEED = 100;
class Tetris extends Component {

    constructor(props) {
        super(props);
        this.canvas = null;
        this.ctx = null;
        this.edge = DEFAULT_EDGE;
        this.height = 20
        this.width = 10;
        this.base = this.init_base();
        
        this.state = {
            tick: 0,
            score: 0
        };
        this.shapes = [];
        this.comps_to_remove = [];
        this.flicker_cnt = 0;
        this.full_rows = [];
        this.info = "";
        this.lost = false;
        this.events_bound = false;
        this.paused = false;
    }

    init_base = () => {
        let result = [];
        for (let i=0; i<this.height; i++) {
            let _row = [];
            for (let j=0; j<this.width; j++)
                _row.push(false);
            result[i] = _row;
        }
        return result;
    }

    clear_all_shapes = () => {
        for (let i=0; i<this.shapes.length; i++) {
            this.shapes[i].clear(this.ctx);
        }
    }
    draw_all_shapes = () => {
        for (let i=0; i<this.shapes.length; i++) {
            this.shapes[i].draw(this.ctx);
        }
    }

    update_base = (shape) => {
        if (shape.base_updated) return;
        for (let i=0; i<shape.components.length; i++) {
            let comp = shape.components[i];
            let x_id = comp.loc_x / comp.edge;
            let y_id = comp.loc_y / comp.edge;
            this.base[y_id][x_id] = true;
        }
        shape.base_updated = true;
    }

    handleKeyPress = e => {
        if (this.paused == false) {
            if (e.keyCode == 38) {  // up keydown
                this.shape_in_play.change_morph(this.base, this.ctx);
                e.preventDefault();
                return;
            }
            if (e.keyCode == 37) {
                this.shape_in_play.budge("left", this.base, this.ctx);
                e.preventDefault();
                return;
            }
            if (e.keyCode == 39) {
                this.shape_in_play.budge("right", this.base, this.ctx);
                e.preventDefault();
                return;
            }
            if (e.keyCode == 40) {  // down key
                e.preventDefault();
                if (this.flicker_cnt > 0 || this.full_rows.length > 0) return;
                this.shape_in_play.accelerate_descend();
                this.shape_in_play.descend(this.base, this.ctx);
                
                return;
            }
        }
        
        if (e.keyCode == 32) { // space for pause
            if (this.paused == false)
                this.paused = true;
            else this.paused = false;
            e.preventDefault();
            return;
        }
        e.preventDefault();
    }

    generate_new_shape = () => {
        let shape_type = SHAPE_OPTIONS[Math.floor(Math.random() * SHAPE_OPTIONS.length)]
        //let shape_type = I;
        let new_shape;
        if (shape_type == Z || shape_type == L) {
            let _rotation = ROTATE_OPTIONS[Math.floor(Math.random() * ROTATE_OPTIONS.length)]
            new_shape = new shape_type(100, 0, {rotation: _rotation});
        }
        else {
            new_shape = new shape_type(100, 0);
        }
        return new_shape;
    }

    init_new_shape = () => {
        let new_shape = this.generate_new_shape();
        this.shapes.push(new_shape);
        this.shape_in_play = new_shape;
    }

    check_lose = () => {
        for (let i=0; i<this.shapes.length; i++) {
            let _shape = this.shapes[i];
            if (_shape.get_top() <= 0 && _shape.base_updated == true) return true;
        }
        return false;
    }

    rebuild_base = () => {
        let base = this.init_base();
        for (let i=0; i<this.shapes.length; i++) {
            for (let j=0; j<this.shapes[i].components.length; j++) {
                let comp = this.shapes[i].components[j];
                let x_id = comp.loc_x / comp.edge;
                let y_id = comp.loc_y / comp.edge;
                base[y_id][x_id] = true;
            }
        }
        this.base = base;
    }

    get_full_rows = () => {
        let full_rows = [];
        for (let i=this.base.length - 1; i>=0; i--) {
            let _row_full = true;
            for (let j=0; j<this.base[i].length; j++) {
                if (this.base[i][j] === false) {
                    _row_full = false;
                    break;
                }
            }
            if (_row_full === true) full_rows.push(i);
        }
        return full_rows;
    }

    tidy_up_shapes = () => {
        // remove shapes that contain empty components
        for(let i=0;i<this.shapes.length;i++) console.log(this.shapes[i].toString())
        this.shapes = this.shapes.filter(s => s.components.length > 0);
        for(let i=0;i<this.shapes.length;i++) console.log(this.shapes[i].toString())
    }

    descend_comps_above = (y_id) => {
        // descend all components above the y id
        for (let i=0; i<this.shapes.length; i++) {
            let _shape = this.shapes[i];
            for (let j=0; j<_shape.components.length; j++) {
                let _comp = _shape.components[j];
                if ((_comp.loc_y / _comp.edge) < y_id) {
                    _comp.clear(this.ctx);
                    _comp.descend();
                }
            }
        }
    }

    remove_comps_n_descend_above = (y_id) => {
        // remove all components on a given y id from corresponding shapes
        for (let i=0; i<this.shapes.length; i++) {
            let _shape = this.shapes[i];
            let comp_to_remove = [];
            for (let j=0; j<_shape.components.length; j++) {
                let _comp = _shape.components[j];
                if ((_comp.loc_y / _comp.edge) == y_id) {
                    comp_to_remove.push(_comp.id);
                    this.comps_to_remove.push(_comp);
                }
            }
            this.shapes[i].remove_components(comp_to_remove, this.ctx);
        }
        this.tidy_up_shapes();
    }

    remove_full_rows = () => {
        let full_rows = this.get_full_rows().sort();
        this.full_rows = full_rows;
        this.comps_to_remove = [];
        console.log("full_rows:" + full_rows);
        for (let i=0; i<full_rows.length; i++) {
            let y_id = full_rows[i];
            // remove the corresponding components from these shapes and descend all the above components
            this.remove_comps_n_descend_above(y_id);
            if (this.comps_to_remove.length > 0) {
                // flicker to remove
                this.flicker_cnt = FLICKER_CNT;
            }

            // update global base
            this.rebuild_base();
        }
    }

    timer_tick = () => {
        // skip if paused;
        if (this.paused === true) return;

        let tick = this.state.tick + 1;
        this.state.tick = tick;
        
        // flicker mode
        console.log("flicker:" + this.flicker_cnt);
        if (this.flicker_cnt > 0) {
            if (this.flicker_cnt % 2 == 0) {
                for (let i=0; i<this.comps_to_remove.length; i++) {
                    this.comps_to_remove[i].draw(this.ctx);
                }
            }
            else {
                for (let i=0; i<this.comps_to_remove.length; i++) {
                    this.comps_to_remove[i].clear(this.ctx);
                }
            }
            this.flicker_cnt -= 1;
            return;
        }
        // descend cells after flicker
        if (this.full_rows.length > 0) {
            for (let i=0; i<this.full_rows.length; i++) {
                this.descend_comps_above(this.full_rows[i]);
                let new_score = this.state.score + SINGLE_ROW_SCORE;
                this.setState({score: new_score, "info": "Current Score: " + new_score})
            }
            this.rebuild_base();
            this.full_rows = [];
            this.init_new_shape();
            return;
        }
        
        if (tick % 5 == 0) {

            this.shape_in_play.descend(this.base, this.ctx);
            if (this.shape_in_play.landed == true && this.shape_in_play.base_updated == false) {
                this.update_base(this.shape_in_play);
                // this.init_new_shape();
            }
            this.draw_all_shapes();

            // check and remove full rows
            this.remove_full_rows();
            if (this.comps_to_remove.length == 0 && this.shape_in_play.landed == true && this.shape_in_play.base_updated == true) {
                // no comps to remove
                this.init_new_shape();
            }
            if (this.check_lose()) {
                console.log("lost!!");
                this.setState({lost: true});
                document.removeEventListener("keydown", this.handleKeyPress.bind(this));
                clearInterval(this.interval);
                this.events_bound = false;
            }
        }
    }

    draw_border = () => {
        this.ctx.strokeStyle = '#D3D3D3';
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, this.height * this.edge);
        this.ctx.stroke();
        this.ctx.moveTo(this.width * this.edge, 0);
        this.ctx.lineTo(this.width * this.edge, this.height * this.edge);
        this.ctx.stroke();
    }

    new_game_click = e => {
        this.clear_all_shapes();
        this.base = this.init_base();
        this.setState({tick: 0, score: 0});

        let first_shape = this.generate_new_shape();
        this.shapes = [first_shape];
        this.shape_in_play = first_shape;

        this.comps_to_remove = [];
        this.flicker_cnt = 0;
        this.full_rows = [];
        this.info = "";
        this.lost = false;
        this.paused = false;

        if (this.events_bound == false) {
            document.addEventListener("keydown", this.handleKeyPress.bind(this));
            this.interval = setInterval(this.timer_tick, GAME_SPEED);
            this.events_bound = true;
        }
        
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = "40px Courier";
        this.draw_border();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        document.removeEventListener("keydown", this.handleKeyPress.bind(this));
      }

    render () {
    return (
        <div className="content" id="tetris_content">
            <div id="ttt_game_result">(press up key to rotate)</div>
            <div id="ttt_game_result">Current Score: {this.state.score}</div>
            {
                this.state.lost && <div id="ttt_game_result">Sorry, you've lost :-(</div>
            }
            
            <div id="tetris_canvas_div">
                <canvas id="tetris_canvas" ref="canvas" width={this.width * this.edge} height={this.height * this.edge} />
            </div>
            <br /><br />
            <div id="tetris_start">
                <Button variant="outlined" color="primary" className="tetris_start_button"
                        onClick={e => this.new_game_click(e)} >NEW GAME
                </Button>
            </div>
        </div>
    )}
}

export default Tetris;

