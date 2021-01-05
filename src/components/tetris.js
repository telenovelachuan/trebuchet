import React, { Component, useRef, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

// import ttt_o_logo from "../static/images/games/ttt_o.png";
// import ttt_x_logo from "../static/images/games/ttt_x.png";

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

}

class Shape {
    constructor(comps) {
        this.components = comps;
        this.landed = false;
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
    descend = (base_dict) => {
        if (this.has_landed(base_dict)) {
            if (this.landed) return;
            this.landed = true;
            return;
        }
        for (let i=0; i<this.components.length; i++) {
            let comp = this.components[i];
            comp.descend();
        }
    }
    has_landed = (base_dict) => {
        // check if any component hits the ground
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
}

class T extends Shape {
    constructor(loc_x, loc_y, edge=20) {
        let top = new Rect(loc_x, loc_y, edge);
        let left = new Rect(loc_x - edge, loc_y + edge, edge);
        let bot = new Rect(loc_x, loc_y + edge, edge);
        let right = new Rect(loc_x + edge, loc_y + edge, edge);
        let components = [top, left, bot, right];
        super(components);
        this.components = components;
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
        this.shape_t = new T(100, 100);
        this.shape_t2 = new T(100, 100);
    }

    update_base = (shape) => {
        if (shape.landed) return;
        let shape_base = shape.get_base();
        for (let i=0; i<shape.components.length; i++) {
            let comp = shape.components[i];
            let x_id = comp.loc_x / comp.edge;
            this.base[x_id] = shape_base[x_id];
        }
        console.log(this.base)
    }

    timer_tick = () => {
        this.shape_t.clear(this.ctx);
        if (this.shape_t.has_landed(this.base)) {
            this.shape_t2.clear(this.ctx);
        }
        this.state.tick += this.edge;
        this.shape_t.descend(this.base);
        if (this.shape_t.has_landed(this.base)) {
            this.update_base(this.shape_t);
            this.shape_t2.descend(this.base);
            this.shape_t2.draw(this.ctx);
        }
        // else {
        //     this.shape_t2.descend(this.edge);
        //     this.shape_t2.draw(this.ctx);
        // }
        
        this.shape_t.draw(this.ctx);
    }

    componentWillMount() {
        //this.state.checks = this.initialize_checks();
    }

    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = "40px Courier";
        this.ctx.beginPath();

        this.ctx.moveTo(0, this.height * this.edge);
        this.ctx.lineTo(this.width * this.edge, this.height * this.edge);
        this.ctx.stroke();
        this.interval = setInterval(this.timer_tick, 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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

