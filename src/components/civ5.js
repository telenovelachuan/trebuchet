import React, { Component } from 'react';
import {City, Tile} from "./civilization";
import plain from "../static/images/civ5/plain.png";

const COS30 = Math.sqrt(3) / 2;
const SNOW_IMG = "https://lh3.googleusercontent.com/pw/ACtC-3ftmEu5WdiXM6Fx45IaCQX-rPi0vLYNBI9PwOgfKD3prTmEhmLdL1VnGipIcjwAnSWQnNFhDt9Tpk7p50y6-dUVHDkPMyemOlrxdY5u7LaMHp1R8NOeYjRHc6hDEyslZ2QvHhiUVekHERPJsvs8sp4=w352-h344-no?.jpg";
const TUNDRA_IMG = "https://lh3.googleusercontent.com/pw/ACtC-3d9LW_K5L-b_VifxOLl5G5twu-wf1hbJ60kNDzvTeQB3J2ok2T0BJCTxDlJEWyV_y9WLml4i4_Iy3vBEOhCGLWkcgDiLsINvc2n8NgkJvf3RlaQ0I1lnLEZg90H3Lyohb-JXU2NBzU6DQ6J4xN1hH0=w368-h356-no?.jpg";
const PLAIN_IMG = "https://lh3.googleusercontent.com/pw/ACtC-3f5MPoUyqoHlWgkuo9aVvKBFcTcfCOudevsoOwbGtaTauZDH1pfrn81ioRkFvbRm69dNyUjTcmMFHNNk2iHiOgReRqHmUNlyipXBUgNbDvxqTTB7t3xRS3_VgFCF27i2RQ10g9fvNGztLiGe2WybPU=w292-h280-no?.jpg";
const GRASS_IMG = "https://lh3.googleusercontent.com/pw/ACtC-3fNjOFjJfjJ_o9WUehxOlw-kpJd2WVULkId0erLocoF7AMlaNC2F0m3Uzo-0KY9R6RW4Y8x4-nXve8inCIXT0YWCRp9Vtuz-YJhsKfcGT85weyNK78SMvmDehNL-DTEpzvAU3HB5nG9OFQGLa5ELRs=w348-h340-no?.jpg";
const DESERT_IMG = "https://lh3.googleusercontent.com/pw/ACtC-3fb4pQWK_-XpRbPwDPF5SVWKc7eHptoTEKSLUh5q0txuaqUJ7Pn-hlCOkwCxecZBDUpZh7Nzuk7v8MR9RQVUaKxGSdEGlPX2MgOBSCV6L5heY-FMv5AQZT_jO6U9QqQB5n7Azkyj70SA4okWRVVAoQ=w416-h410-no?.jpg";
const TERRAINS = {
    "tundra": TUNDRA_IMG,
    "plain": PLAIN_IMG,
    "grass": GRASS_IMG,
    "desert": DESERT_IMG
};

class Civ5 extends Component {

    constructor(props) {
        super(props);
        this.canvas = null;
        this.ctx = null;
        this.width = 50;
        this.height = 25;
        this.edge = 30;
        this.tiles = [];
        this.state = {
        }
    }

    get_tiles_of_terrain_type = ter_type => {
        let results = [];
        this.tiles.map(row => {
            row.map(_tile => {

            })
        })
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
            row_idx += 1;
        }
    }

    load_terrains = () => {
        let tiles = this.tiles;
        let _ctx = this.ctx;
        for (let ter in TERRAINS) {
            let _url = TERRAINS[ter];
            let _img = new Image();
            _img.onload = function() {
                // load all terrain images of this type
                for (let i=0; i<tiles.length; i++) {
                    let _row = tiles[i];
                    for (let j=0; j<_row.length; j++) {
                        let _tile = _row[j];
                        if (_tile.terrain == ter) {
                            _tile.draw_terrain(_ctx, _img);
                        }
                    }
                }

                _ctx.fillStyle = '#FFF';
                //this.ctx.fillRect(tile.loc_x, tile.loc_y, 30, 30);
                _ctx.fillRect(50, 50, 100, 100);
            }
            _img.src = _url;
        }

        // Object.keys(TERRAINS).map(ter => {
        //     let _url = TERRAINS[ter];
        //     let _img = new Image();
        //     _img.onload = function() {
        //         // load all terrain images of this type
        //         tiles.map(row => {
        //             row.map(_tile => {
        //                 if (_tile.terrain == ter) {
        //                     _tile.draw_terrain(_ctx, _img);
        //                 }
        //             })
        //         })
        //     }
        //     _img.src = _url;
        // })

        
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
        this.canvas = this.refs.civ5_canvas;
        this.ctx = this.canvas.getContext("2d");
        //let tile = new Tile(50, 50, this.edge);
        this.pave_tiles();
        this.load_terrains();
        //this.terrain_hist();
        let tile = this.tiles[3][5];
        console.log("chosen tile:" + tile.toString());
        //tile.fill_white(this.ctx);
        
    }

    render () {
        return (
            <div className="content" id="civ5_content">

                <div id="civ5_canvas_div">
                    <div>CIVILIZATION V</div>
                    <canvas id="civ5_canvas" ref="civ5_canvas" width={this.width * this.edge} height={this.height * this.edge} />

                </div>
                
            </div>
        )
    }
}

export default Civ5;

