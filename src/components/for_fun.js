import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import WordPuzzle from "./word_puzzle";
import TicTacToe from "./tic_tac_toe";
import MineSweeper from "./mine_sweeper";


const tabs = ['Word Puzzle', 'Tic Tac Toe', 'Mine Sweeper'];
function TabPanel(props) {
    const { children, value, index, id } = props;
  
    return (
      <div role="tabpanel" hidden={value !== index}
        id={id}
        className="tab_content"
        aria-labelledby={`full-width-tab-${index}`}
      >
        {value === index && (
          <Box p={3} className="tabpanel_box">
            <Typography component={'span'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

class ForFun extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab_value: 0,

        }
    }

    load_nav_tabs = () => {
        return tabs;
    }

    navChange = (event, newValue) => {
        console.log("navchange:" + newValue);
        this.setState({"tab_value": newValue});
    };

    

    render () {
    return (
        <div className={"ff_content"} >

            <AppBar position="static" style={{ background: '#FFFFFF' }} >
                <Tabs 
                    value={this.state.tab_value}
                    onChange={this.navChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                >
                  {
                    this.load_nav_tabs().map((tab, idx) => (
                      <Tab label={tab}  className={this.state.tab_value === idx ? "active_nav_tab" : "inactive_nav_tab"}/>
                    ))
                  }
                </Tabs>
            </AppBar>

            <SwipeableViews slideStyle={{ overflow: 'hidden'}} axis={'x'} index={this.state.tab_value} onChangeIndex={this.andleChangeIndex} hysteresis={0.01} >
                <TabPanel classes="nav_tab_panel" value={this.state.tab_value} index={0} dir={"rtl"} >
                    <WordPuzzle />
                </TabPanel>
                <TabPanel id="ttt_panel" value={this.state.tab_value} index={1} dir={"rtl"}>
                    <TicTacToe />
                </TabPanel>
                <TabPanel value={this.state.tab_value} index={2} dir={"rtl"}>
                    <MineSweeper />
                </TabPanel>
            </SwipeableViews>

        </div>
    )}
}

export default ForFun;

