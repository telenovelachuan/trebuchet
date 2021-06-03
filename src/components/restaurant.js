import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Wheel from './wheel';


const OPTIONS = [
    "Shake Shack",
    "Chipotle",
    "Panda Express",
    "Cheesecake Factory",
    "Wendy's",
    "Pizzahut",
    "Enjoy Pure Food",
    "QDOBA",
    "Sushi House",
    "Joy Wok",
    "Bibibop",
    "Crushed Red",
    "Olive Garden"
]
const CHARS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f'];

class Restaurant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            added_text: "",
            options: OPTIONS,
            colors: []
        }

        for (let i=0; i<this.state.options.length; i++) {
            this.state.colors.push(this.getRandomColor());
        }
        console.log("colors:"+this.state.colors);
    }

    choose(choices) {
        var index = Math.floor(Math.random() * choices.length);
        return choices[index];
      }

    getRandomColor() {
        let result = "#";
        for(let i=0; i<6; i++) {
          result += this.choose(CHARS);
        }
        return result;
      }

    check_add_valid = () => {
        if (this.state.added_text == "") {
            return false;
        }
        else if (this.state.options.includes(this.state.added_text)) {
            return false;
        }
        return true;
    }

    add_click = (e) => {
        let _options = this.state.options;
        _options.push(this.state.added_text);

        let _colors = this.state.colors;
        _colors.push(this.getRandomColor());
        this.setState({options: _options, colors: _colors});
    }

    handle_text_changed = (e) => {
        this.setState({"added_text": e.target.value});
    }

    componentDidMount() {

    }

    render () {
        let Row = ({ index, style }) => (
            // <div style={style}>{this.state.options[index]}</div>
            <ListItem button style={style} key={index} className="res_list_item">
                <ListItemText primary={this.state.options[index]} />
            </ListItem>
          );
        return (
            <div className="content" id="rest_content">

                <div id="rest_left">
                    <div id="rest_left_content">
                        <div id="rest_left_top">
                            <FixedSizeList className="rest_left_list" height={400} width={300} itemSize={46} itemCount={this.state.options.length}>
                                {Row}
                            {/* {
                                this.state.options.map(option =>(
                                    <ListItem button>
                                        <ListItemText primary={option} style={{display:'flex', justifyContent:'center'}} />
                                    </ListItem>
                                ))
                            } */}
                            </FixedSizeList>
                        </div>
                        <div id="rest_left_bot">
                            <div className="res_left_bot_comp">
                                <TextField className="add_res_text" label="add a place" multiline style = {{width: '50%'}}
                                    rows={1} defaultValue="" variant="outlined"  
                                    // onFocus={this.reply_text_focused} onBlur={this.reply_text_blurred} 
                                    value={this.state.added_text} onChange={this.handle_text_changed}
                                />
                            </div>
                            <div className="res_left_bot_comp" id="res_add_button_div">
                                <Button variant="outlined" color="primary" className="add_res_button"
                                    onClick={this.add_click} disabled={!this.check_add_valid()} > 
                                    ADD
                                </Button>
                            </div>
                            
                        </div>
                        
                    </div>

                </div>
                <div id="rest_right">
                    <Wheel items={this.state.options} colors={this.state.colors} />
                </div>
                
            </div>
        )
    }
}

export default Restaurant;

