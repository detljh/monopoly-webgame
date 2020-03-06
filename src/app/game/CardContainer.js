import CardComponent from './CardComponent';
import { connect } from 'react-redux';
import { gameOperations } from './duck';

const mapStateToProps = (state) => {
    return {
        card: state.game.card
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        completedCard: () => {
            dispatch(gameOperations.completedCard());
        }
    }
}

const CardContainer = connect(mapStateToProps, mapDispatchToProps)(CardComponent);
export default CardContainer;