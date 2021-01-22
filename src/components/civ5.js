import React, { Component } from 'react';
import {City, Tile} from "./civilization";
import plain from "../static/images/civ5/plain.png";
import tundra from "../static/images/civ5/tundra.png";
import grass from "../static/images/civ5/grass.png";
import desert from "../static/images/civ5/desert.png";
import pikeman from "../static/images/civ5/pikeman.png";

const COS30 = Math.sqrt(3) / 2;
const TERRAINS = {
    "tundra": tundra,
    "plain": plain,
    "grass": grass,
    "desert": desert
};

class Civ5 extends Component {

    constructor(props) {
        super(props);
        this.canvas = null;
        this.ctx0 = null;
        this.ctx1 = null;
        this.width = 50;
        this.height = 25;
        this.edge = 30;
        this.tiles = [];
        this.state = {
        }
    }

    pave_tiles = () => {
        let row_idx = 0;
        for (let i=this.edge / 2; i<this.height * this.edge; i+=this.edge * 1.5) {
            let j = (i * 2 / this.edge) % 2 == 0 ? this.edge * COS30 : 0;
            let _row = [];
            let previous_left = null;
            let col_idx = 0;
            for (;j<this.width * this.edge; j+=this.edge * COS30 * 2) {
                let ter_options = Object.keys(TERRAINS);
                let terrain = ter_options[Math.floor(Math.random() * ter_options.length)]
                let _tile = new Tile(j, i, terrain, this.edge);
                _tile.left_nb = previous_left;
                if (!!previous_left) {  // previous not null, set its right neighbor
                    previous_left.right_nb = _tile;
                }
                _row.push(_tile);
                previous_left = _tile;

                // set upper and lower neighbors
                if (row_idx != 0) {
                    //console.log("row_idx:" + row_idx + ", row:" + this.tiles[row_idx - 1] + ", j:" + j);
                    let upper1 = this.tiles[row_idx - 1][col_idx];
                    let upper2, upper0;
                    if (col_idx == this.tiles[row_idx - 1].length) upper2 = null;
                    else upper2 = this.tiles[row_idx - 1][col_idx + 1];
                    if (col_idx == 0) upper0 = null;
                    else upper0 = this.tiles[row_idx - 1][col_idx - 1];

                    if ((i * 2 / this.edge) % 2 == 0) { // even rows
                        _tile.left_up_nb = upper1;
                        _tile.right_up_nb = upper2;
                        upper1.right_bot_nb = _tile;
                        if (!!upper2) upper2.left_bot_nb = _tile;
                    }
                    else {  // odd rows
                        _tile.left_up_nb = upper0;
                        _tile.right_up_nb = upper1;
                        if (!!upper0) upper0.right_bot_nb = _tile;
                        upper1.left_bot_nb = _tile;
                    }
                }
                col_idx += 1;
            }
            this.tiles.push(_row);
            if (row_idx == 0) {
                console.log("first tile neighbors:" + this.tiles[0][0].neighbors);
            }
            row_idx += 1;
        }
    }

    load_terrains = () => {
        let tiles = this.tiles;
        let ctx0 = this.ctx0;

        Object.keys(TERRAINS).map(ter => {
            let img_obj = TERRAINS[ter];
            let _img = new Image();
            _img.onload = function() {
                // load all terrain images of this type
                tiles.map(row => {
                    row.map(_tile => {
                        if (_tile.terrain == ter) {
                            _tile.draw_terrain(ctx0, _img);
                        }
                    })
                })
            }
            _img.src = img_obj;
        })

    }

    terrain_hist = () => {
        let results = {};
        for (let i=0; i<this.tiles.length; i++) {
            let _row = this.tiles[i];
            for (let j=0; j<_row.length; j++) {
                let _tile = _row[j];
                if (!(_tile.terrain in results)) {
                    results[_tile.terrain] = 1;
                }
                else {
                    results[_tile.terrain] += 1;
                }
            }
        }
        console.log(results);
    }

    componentDidMount() {
        this.canvas0 = this.refs.civ5_canvas0;
        this.canvas1 = this.refs.civ5_canvas1;
        this.ctx0 = this.canvas0.getContext("2d");
        this.ctx1 = this.canvas1.getContext("2d");
        this.pave_tiles();
        this.load_terrains();
        //this.terrain_hist();

        let tile = this.tiles[3][5];
        let tile2 = this.tiles[2][7];
        let city = new City(tile);
        city.tiles.push(tile2);
        city.outline(this.ctx1);

        let _img = new Image();
        let ctx1 = this.ctx1;
        _img.onload = function() {
            tile2.draw_logo(ctx1, _img);
        }
        _img.src = pikeman;
        
    }

    render () {
        return (
            <div className="content" id="civ5_content">

                <div>
                    <div>CIVILIZATION V</div>
                    <div id="civ5_canvas_div">
                        <canvas id="civ5_canvas0" className="civ5_canvas" ref="civ5_canvas0" width={this.width * this.edge} height={this.height * this.edge} />
                        <canvas id="civ5_canvas1" className="civ5_canvas" ref="civ5_canvas1" width={this.width * this.edge} height={this.height * this.edge} />

                        {/* <canvas id="civ5_canvas0" className="civ5_canvas" ref="civ5_canvas0" width="1500px" height="300px" />
                        <canvas id="civ5_canvas1" className="civ5_canvas" ref="civ5_canvas1" width="1500px" height="300px" /> */}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Civ5;

