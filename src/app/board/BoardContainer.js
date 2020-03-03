import React from 'react';
import BoardComponent from './BoardComponent';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        players: state.home.players
    }
}

const mapDispatchToProps = (dispatch) => {

}

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(BoardComponent);
export default BoardContainer;