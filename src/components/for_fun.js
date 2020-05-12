import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import WordGenerator from '@ciro.spaciari/word.generator';

import "../static/css/for_fun.css";

class ForFun extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wp: {
                played: false,
                key: "",
                key_array: [],
                current: [],
                last_pressed: "",
                all_pressed: [],
                chances_remain: 10,
                won: false,
            }
        }
    }

    getOccurrence = (array, value) => {
        return array.filter(x => x === value).length;
    }


    handleKeyPress = e => {
        let key_pressed = String.fromCharCode(e.keyCode).toLowerCase();
        if (e.keyCode < 65 || (e.keyCode > 90 && e.keyCode < 97) || e.keyCode > 122 ) {
            return;
        }
        console.log("pressed!" + key_pressed);
        let wp = this.state.wp;
        wp.played = true;
        wp.last_pressed = key_pressed;
        if (!this.state.wp.key_array.includes(key_pressed) && !wp.all_pressed.includes(key_pressed)) {
            wp.chances_remain -= 1;
        }
        if (!wp.all_pressed.includes(key_pressed)) {
            wp.all_pressed.push(key_pressed);
        }
        for(var i=0; i<this.state.wp.key.length; i++) {
            if (this.state.wp.key[i] === key_pressed) {
                wp.current[i] = key_pressed;
            }
        }
        
        if (wp.current.join("") === wp.key) {
            wp.won = true;
        }
        if (wp.chances_remain <= 0) {
            wp.current = wp.key_array;
        }
        this.word_min_length = 7;
        this.setState({wp: wp});
    }

    get_letter_class_name = () => {
        if (this.state.wp.chances_remain <= 0) {
            return "wp_letter_lose";
        }
        else if (this.state.wp.won === true) {
            return "wp_letter_won";
        }
        return "wp_letter_span";
    }

    new_game_click = e => {
        let random_word = WordGenerator.generate(1, this.word_min_length).words[0];
        let wp = {
            played: false,
            key: "",
            key_array: [],
            current: [],
            last_pressed: "",
            all_pressed: [],
            chances_remain: 10,
            won: false,
        }
        let key = random_word;
        wp.key = key;
        wp.key_array = key.split("");
        wp.current = "_".repeat(key.length).split("");
        this.setState({wp: wp});
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress.bind(this));
    }    

    componentWillMount() {
        let random_word = WordGenerator.generate(1, this.word_min_length).words[0];
        let key = random_word;
        this.state.wp.key = key;
        this.state.wp.key_array = key.split("");
        this.state.wp.current = "_".repeat(key.length).split("");
        document.addEventListener("keydown", this.handleKeyPress.bind(this));
    }

    render () {
    return (
        <div className={"ff_content"} >
            <div id="word_puzzle" onKeyDown={this.handleKeyPress}>
            
                <Card className={"game_intro_card"}>
                    <CardHeader title="WORD PUZZLE" className="de_intro_header"
                                titleTypographyProps={{className:"de_headers"}}
                            />
                    <CardContent className="wp_cardcontent">
                        <div id="wp_info_area">
                            <div>
                                {this.state.wp.chances_remain} chances remaining
                                {this.state.wp.chances_remain <= 0 && (<span>, you lose :-(</span>)}
                            </div>
                            {
                                (this.state.wp.last_pressed && this.state.wp.chances_remain >= 0 && !this.state.wp.won) &&
                                (<div id="wp_key_pressed">you pressed: {this.state.wp.last_pressed}</div>)
                            }
                            {
                                this.state.wp.key_array.includes(this.state.wp.last_pressed && !this.state.wp.won) && 
                                    (<div id="wp_letter_count">There {this.getOccurrence(this.state.wp.key_array, this.state.wp.last_pressed) > 1 ? "are" : "is"} {this.getOccurrence(this.state.wp.key_array, this.state.wp.last_pressed)}
                                        '{this.state.wp.last_pressed}'
                                        </div>)
                                
                            }
                            {
                                (!this.state.wp.key_array.includes(this.state.wp.last_pressed) && this.state.wp.played && this.state.wp.chances_remain > 0 && !this.state.wp.won) &&
                                (<div id="wp_no_letter">There is no '{this.state.wp.last_pressed}'</div>)
                            }

                            {
                                this.state.wp.chances_remain <= 0 && (<span>The answer is: </span>)
                            }

                            {
                                this.state.wp.won && (<div>Bingo! The answer is: </div>)
                            }
                            
                        </div>
                        <div id="wp_word_area">
                            {
                                this.state.wp.current.map((letter, idx) => {
                                    let length = this.state.wp.key.length;
                                    let total_width = 940;
                                    let width = total_width / length;
                                    let ratio = 0.9;
                                    let square_edge = width * ratio;
                                    let padding_left = `${(1 - ratio) * 100}%`;
                                    return (
                                    <div className="wp_letter_box" style={{height: square_edge, width: width}}>
                                        <div className="wp_letter_square" style={{height: square_edge, width: square_edge, marginLeft: padding_left}}>
                                            <div className={this.get_letter_class_name()}>{letter}</div>
                                            
                                        </div>
                                    </div>
                                )})
                            }
                        </div>
                        <div id="wp_bottom_area">

                            <div className="wp_restart">
                                    <Button variant="outlined" color="primary" className="wp_restart_button"
                                        onClick={e => this.new_game_click(e)} >
                                        NEW GAME
                                    </Button>
                            </div>
                            
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )}
}

export default ForFun;

