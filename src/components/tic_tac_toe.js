import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import ttt_o_logo from "../static/images/games/ttt_o.png";
import ttt_x_logo from "../static/images/games/ttt_x.png";

const PLAYER_PATTERN = 'o';
const AI_PATTERN = 'x';

class TicTacToe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checks: [],
            won: false,
            lost: false,
            drawn: false,
        }
        this.win_state = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    }

    initialize_checks = () => {
        let results = [];
        for(let i=0; i<9; i++) {
            results[i] = {
                text: '',
                bgi: '',
            }
        }
        return results;
    }

    check_player_win = player_text => {
        for(let i=0; i<this.win_state.length; i++) {
            let win_state = this.win_state[i];
            let won = true;
            for(let j=0; j<win_state.length; j++) {
                if(this.state.checks[win_state[j]].text !== player_text) {
                    won = false;
                }
            }
            if (won === true) {
                return true;
            }
        }
        return false;
    }

    check_draw = () => {
        for(let i=0; i<this.state.checks.length; i++) {
            if(this.state.checks[i].text === '') {
                return false;
            }
        }
        return true;
    }

    get_all_checks = player_text => {
        let result = [];
        for(let i=0; i<9; i++) {
            if (this.state.checks[i].text === player_text) {
                result.push(i);
            }
        }
        return result;
    }

    fill_fatality = (idx1, idx2) => {
        for(let i=0; i<this.win_state.length; i++) {
            let win_state = this.win_state[i];
            if(win_state.includes(idx1) && win_state.includes(idx2)) {
                let saver = win_state.reduce((a, b) => a + b, 0) - idx1 - idx2;
                if (this.state.checks[saver].text === '') {
                    return saver;
                }
            }
        }
        return -1;
    }

    generate_ai_loc = () => {
        // attack fatality
        let my_checks = this.get_all_checks(AI_PATTERN);
        for(let i=0; i<my_checks.length; i++) {
            for(let j=0; j<my_checks.length; j++) {
                if (i === j) { continue; }
                let fatal_pos = this.fill_fatality(my_checks[i], my_checks[j]);
                if( fatal_pos > 0) {
                    return fatal_pos;
                }
            }
        }

        // check for fatality
        let player_checks = this.get_all_checks(PLAYER_PATTERN);
        for(let i=0; i<player_checks.length; i++) {
            for(let j=0; j<player_checks.length; j++) {
                if (i === j) { continue; }
                let fatal_pos = this.fill_fatality(player_checks[i], player_checks[j]);
                if( fatal_pos > 0) {
                    return fatal_pos;
                }
            }
        }
        
        // randomly gets one
        let available_locs = [];
        this.state.checks.map((check, idx) => {
            if (check.text === '') {
                available_locs.push(idx);
            }
        })
        let random_idx = Math.floor(Math.random() * available_locs.length);
        return available_locs[random_idx];
    }

    checkClicked = (e, idx) => {
        let checks = this.state.checks;
        checks[idx].text = PLAYER_PATTERN;
        checks[idx].bgi = PLAYER_PATTERN === 'o' ? ttt_o_logo : ttt_x_logo;
        this.setState({checks: checks});

        // check if player wins
        if(this.check_player_win(PLAYER_PATTERN)) {
            this.setState({won: true});
            return;
        }
        else if (this.check_draw()) {
            this.setState({drawn: true});
            return;
        }

        setTimeout(function() {
            let ai_check_loc = this.generate_ai_loc();
            checks = this.state.checks;
            checks[ai_check_loc].text = AI_PATTERN;
            checks[ai_check_loc].bgi = PLAYER_PATTERN === 'o' ? ttt_x_logo : ttt_o_logo;
            this.setState({checks: checks});
            if (this.check_player_win(AI_PATTERN)) {
                this.setState({lost: true});
            }
            else if (this.check_draw()) {
                this.setState({drawn: true});
                return;
            }
        }.bind(this), 1000);
    }

    new_game_click = e => {
        this.setState({
            checks: this.initialize_checks(),
            won: false,
            lost: false,
            drawn: false,
        })
    }

    componentWillMount() {
        this.state.checks = this.initialize_checks();
    }

    render () {
    return (
        <div className="content" id="ttt_content">
            <Card id={"ttt_card"}>
                <CardHeader title="TIC TAC TOE" className="ttt_header"
                    titleTypographyProps={{className:"de_headers"}}
                    // subheader={this.state.wp.success_rate}
                />

                <CardContent className="ttt_cardcontent">
                    <div id="ttt_area">
                        <div id="ttt_info">
                            <div id="ttt_game_result">
                                {
                                    this.state.won && <div id="ttt_won">Congratulations! You won!!</div>
                                }
                                {
                                    this.state.lost && <div id="ttt_lost">Sorry, you lose :-(</div>
                                }
                                {
                                    this.state.drawn && <div id="ttt_drawn">Game Drawn!</div>
                                }
                            </div>
                        </div>
                        <div id="ttt_square">
                            {
                                this.state.checks.map((check, idx) => (
                                <Button className="ttt_button" onClick={e => this.checkClicked(e, idx)}
                                    style={{backgroundImage: `url(${check.bgi})`}}
                                    disabled={this.state.won || this.state.lost || this.state.drawn}
                                ></Button>
                                ))
                            }
                        </div>
                        <div id="ttt_restart">
                            <Button variant="outlined" color="primary" className="wp_restart_button"
                                    onClick={e => this.new_game_click(e)} >
                                NEW GAME
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )}
}

export default TicTacToe;

