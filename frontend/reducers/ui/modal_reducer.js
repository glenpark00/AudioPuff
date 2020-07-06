import { ENABLE_MODAL_DISPLAY, DISABLE_MODAL_DISPLAY } from '../../actions/ui_actions';

const modalReducer = (state = false, action) => {
  switch (action.type) {
    case ENABLE_MODAL_DISPLAY:
      return { showModal: true, type: action.kind, data: action.data };
    case DISABLE_MODAL_DISPLAY: 
      return { showModal: false };
    default:
      return state;
  }
}

export default modalReducer;
