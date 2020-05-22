import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import ms_mask from "../static/images/games/ms_mask.png";
import ms_mine from "../static/images/games/ms_mine.png";
import ms_flag from "../static/images/games/ms_flag.png";

const MINE_PALETTE = ["RGB(0, 28, 166)", "RGB(44, 104, 35)", "RGB(233, 62, 45)", "RGB(0, 14, 115)", "RGB(112, 24, 16)", "RGB(255, 255, 255)", "RGB(255, 255, 255)", "RGB(255, 255, 255)"];
class MineSweeper extends Component {

    constructor(props) {
        super(props);
        this.height = 10;
        this.width = 15;
        this.mine_count = Math.floor(0.1 * this.height * this.width);
        this.state = {
            checks: [],
            won: false,
            lost: false,
            info: "",
        }
    }

    initialize_checks = () => {
        let results = [];
        for(let i=0; i<this.height; i++) {
            results.push([]);
            for(let j=0; j<this.width; j++) {
                results[i].push({
                    type: 'empty',
                    explored: false,
                    flagged: false,
                })
            } 
        }

        // randomly generate mines
        let mines = [];
        while(mines.length < this.mine_count){
            let r = Math.floor(Math.random() * this.height * this.width);
            if(mines.indexOf(r) === -1) mines.push(r);
        }
        let mines_x = [];
        let mines_y = [];
        mines.map((mine, idx) => {
            mines_x.push(Math.floor(mine / this.width));
            mines_y.push(mine % this.width);
        })
        for(let i=0; i<this.mine_count; i++) {
            results[mines_x[i]][mines_y[i]].type = 'mine';
        }
        return results;


        // let mines_x = [0,1,1,1,1,1,1,2,2,3,3,4,6,7,9];
        // let mines_y = [6,0,3,4,6,11,14,4,8,1,12,7,2,13,5];
        // for(let i=0; i<this.mine_count; i++) {
        //             results[mines_x[i]][mines_y[i]].type = 'mine';
        //         }
        //         console.log(results);
        //         return results;
    }

    get_peripherals = (idx, idy) => {
        let peripherals = [[idx-1,idy-1],[idx,idy-1],[idx+1,idy-1],[idx-1,idy],[idx+1,idy],[idx-1,idy+1],[idx,idy+1],[idx+1,idy+1]];
        return peripherals.filter(item => (item[0] >= 0 && item[0] < this.height && item[1] >= 0 && item[1] < this.width));
    }

    peripheral_all_empty = (idx, idy) => {
        let peripherals = this.get_peripherals(idx, idy);
        for (let i=0; i<peripherals.length; i++) {
            let point = peripherals[i];
            if(this.state.checks[point[0]][point[1]].type !== 'empty') {
                return false;
            }
        }
        return true;
    }

    buttonClick = (e, idx, idy) => {
        if(this.state.checks[idx][idy].flagged) return;
        this.state.checks[idx][idy].explored = true;
        let checks = this.state.checks;
        //checks[idx][idy].explored = true;
        if (checks[idx][idy].type === 'mine') {
            // unveil all mines
            for (let i=0 ;i<this.height; i++) {
                for (let j=0 ;j<this.width; j++) {
                    if(checks[i][j].type === 'mine') {
                        checks[i][j].explored = true;
                    }
                }
            }   
            this.setState({lost: true, checks: checks, info: "You lose :-("});
            return;
        }
        else if (checks[idx][idy].type === 'empty') {
            let new_state = {};
            if(this.peripheral_all_empty(idx, idy)) {
                let peripheral_empties = this.get_peripheral_empties(idx, idy);
                peripheral_empties.map((point, _id) => {
                    checks[point[0]][point[1]].explored = true;
                    checks[point[0]][point[1]].flagged = false;
                })
                new_state['checks'] = checks;
            }
            else {
                new_state['checks'] = checks;
            }

            if (this.check_victory()) {
                new_state['won'] = true;
                new_state['info'] = "Congrats! You win!!";
            }
            this.setState(new_state);
        }
    }

    count_peripheral_mines = (idx, idy) => {
        let peripherals = this.get_peripherals(idx, idy);
        let result = 0;
        peripherals.map((point, id) => {
            if(this.state.checks[point[0]][point[1]].type === 'mine') {
                result += 1;
            }
        })
        return result;
    }

    display_points = (annotation, points_list) => {
        let points_str = points_list.map(point=>`(${point[0]},${point[1]})`);
        console.log(`${annotation}: ${points_str}`);
    }

    dedup_points = (points_list) => {
        let points_str = points_list.map(point=>`(${point[0]},${point[1]})`);
        let points_set = new Set(points_str);
        let result = Array.from(points_set).map(item=>[
            parseInt(item.split(',')[0].split('(')[1]),
            parseInt(item.split(',')[1].split(')')[0])
        ])
        return result;
    }

    get_peripheral_empties = (idx, idy) => {
        let peripherals = this.get_peripherals(idx, idy);
        let filtered_peripherals = peripherals.filter(
            point => this.peripheral_all_empty(point[0], point[1]));
        //let results = new Set(filtered_peripherals);
        filtered_peripherals = this.dedup_points(filtered_peripherals);
        let results = filtered_peripherals;
        let candidates = filtered_peripherals
        //this.display_points('initial candidates', candidates)
        while(candidates.length > 0 ) {
            let new_targets = [];
            candidates.map((cand, _id) => {
                let x = cand[0];
                let y = cand[1];
                //console.log(`looking for candidate (${x},${y})`);
                let peripherals = this.get_peripherals(x, y);
                //this.display_points('peripherals', peripherals);
                let _target = new_targets.concat(peripherals)
                new_targets = this.dedup_points(_target);
            })
            let new_eligibles = new_targets.filter(point => (
                this.peripheral_all_empty(point[0], point[1]) && 
                this.state.checks[point[0]][point[1]].type === 'empty'
                ));
                //this.display_points('after 1st filter', new_eligibles);
            //new_eligibles = new_eligibles.filter(a => !results.includes(a));
            let results_str = results.map(a=>`(${a[0]},${a[1]})`);
            //console.log(`results_str:${results}`);
            new_eligibles = new_eligibles.filter(a => !(results_str.includes(`(${a[0]},${a[1]})`)));
            //this.display_points('new_eligibles after 2nd filter', new_eligibles);
            results = results.concat(new_eligibles);
            results = this.dedup_points(results);
            //results = Array.from(results).concat(new_eligibles);
            //results = new Set(results);
            candidates = new_eligibles;
            //this.display_points('new candidates', candidates);
        }

        // append outskirts of all results
        //results = Array.from(results);
        if (results.length === 0) {
            results = [[idx, idy]];
        }
        //results = results.map(a=>`(${a[0]},${a[1]})`);
        this.display_points('final result', results);
        let outskirts = []
        results.map(result => {
            outskirts = outskirts.concat(this.get_peripherals(result[0], result[1]));
        })
        //this.display_points('outskirtsQ!!!!!!!!!!!!!!!!!!!', outskirts);

        //console.log(`outskirtsQ!!!!!!!!!!!!!!!!!!!${outskirts.map(a=>`(${a[0]},${a[1]})`)}`);
        //outskirts = outskirts.map(a=>`(${a[0]},${a[1]})`);
        //this.display_points('outskirts before concat', outskirts);

        results = results.concat(outskirts);
        results = this.dedup_points(results);
        //this.display_points('after concatenating outskirts and dedup', results);

        //this.display_points('found all empties!!!!!!!!!!!!!!!!!!!!', results);
        return results;
    }

    rightClick = (e, idx, idy) => {
        e.preventDefault();
        if (this.state.won || this.state.lost) {
            return;
        }
        let checks = this.state.checks;
        if (checks[idx][idy].explored === true) {
            return;
        }
        checks[idx][idy].flagged = !checks[idx][idy].flagged;

        let new_state = {checks: checks};
        if (this.check_victory()) {
            new_state['won'] = true;
            new_state['info'] = "Congrats! You win!!";
        }
        this.setState(new_state);
    }

    check_victory = () => {
        //console.log("checking victory...");
        let correctly_flagged = 0;
        let total_flagged = 0;
        let total_explored = 0;
        let num_checks = this.width * this.height;
        let explored = [];
        for(let i=0 ;i<this.height; i++) {
            for(let j=0; j<this.width; j++) {
                if (this.state.checks[i][j].explored) {
                    total_explored += 1;
                    explored.push(`${i},${j}`);
                }
                if (this.state.checks[i][j].flagged) {
                    total_flagged += 1;
                    if (this.state.checks[i][j].type === 'mine') {
                        correctly_flagged += 1;
                    }
                }
            }
        }
        let a  = (correctly_flagged === this.mine_count);
        let b = (total_flagged === this.mine_count);
        let c = (total_explored === (num_checks - this.mine_count));
        let result = a && b && c;
        //console.log(`victory check result:${a},${b},${c},${result}`);
        return result;
    }

    get_button_style = (idx, idy) => {
        let check = this.state.checks[idx][idy];
        if (check.flagged) {
            return {backgroundImage: `url(${ms_flag})`};
        }
        if (!check.explored) {
            return {backgroundImage: `url(${ms_mask})`};
        }
        else if (check.type === 'empty') {
            if (this.peripheral_all_empty(idx, idy)) {
                return {backgroundColor: 'rgb(187, 187, 187)',
                        border: '1px solid darkgrey'};
            }
            else {
                let peripheral_mines = this.count_peripheral_mines(idx, idy);
                return {backgroundColor: 'rgb(187, 187, 187)',
                        color: MINE_PALETTE[peripheral_mines - 1],
                        border: '1px solid darkgrey'};
            }
        }
        else if (check.type === "mine") {
            return {backgroundImage: `url(${ms_mine})`,
                    backgroundColor: 'rgb(187, 187, 187)',
                    border: '1px solid darkgrey'};
        }
        else {
        }
        return {}
    }

    new_game_click = e => {
        let checks = this.initialize_checks();
        let new_state = {
            checks: checks,
            won: false,
            lost: false,
            info: "",
        }
        this.setState(new_state);
    }

    componentWillMount() {
        this.state.checks = this.initialize_checks();
    }

    render () {
    return (
        <div className="content" id="ms_content">
            <Card id={"ms_card"}>
                <CardHeader title="" className="ms_header"
                    titleTypographyProps={{className:"de_headers"}}
                    // subheader={this.state.wp.success_rate}
                />

                <CardContent className="ms_cardcontent">
                    <div id="ms_area">
                    {
                        this.state.checks.map((row, idx) => (
                            <div className="ms_row">
                                {
                                    row.map((cell, idy) => (
                                        <Button className="ms_button" 
                                            style={this.get_button_style(idx, idy)}
                                            onClick={e => this.buttonClick(e, idx, idy)}
                                            disabled={this.state.lost || this.state.won}
                                            onContextMenu={e => this.rightClick(e, idx, idy)}>
                                            {(this.count_peripheral_mines(idx, idy) > 0 && cell.explored === true) ? this.count_peripheral_mines(idx, idy) : ""}
                                        </Button>
                                    ))
                                }
                            </div>
                            
                        ))
                    }
                    </div>
                    <div id="ms_info">{this.state.info}</div>
                    <div id="ms_restart">
                        <Button variant="outlined" color="primary" className="ms_restart_button"
                            onClick={e => this.new_game_click(e)} >NEW GAME
                        </Button>
                    </div>
                </CardContent>
            </Card>

        </div>
    )}
}

export default MineSweeper;

