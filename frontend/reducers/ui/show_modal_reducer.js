import { ENABLE_MODAL_DISPLAY, DISABLE_MODAL_DISPLAY } from '../../actions/ui_actions';

const showModalReducer = (state = false, action) => {
  switch (action.type) {
    case ENABLE_MODAL_DISPLAY:
      return true;
    case DISABLE_MODAL_DISPLAY: 
      return false;
    default:
      return state;
  }
}

export default showModalReducer;
