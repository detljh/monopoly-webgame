import CardComponent from './CardComponent';
import { connect } from 'react-redux';
import { gameOperations } from './duck';
import exitCondition from './utilities/exitCondition';

const mapStateToProps = (state) => {
    return {
        card: state.game.card
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        completeCard: () => {
            dispatch(gameOperations.completeCard());
        },
        drawChance: () => {
            dispatch(gameOperations.drawCard(exitCondition.DRAW_CHANCE));
        }
    }
}

const CardContainer = connect(mapStateToProps, mapDispatchToProps)(CardComponent);
export default CardContainer;