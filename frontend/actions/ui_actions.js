export const ENABLE_MODAL_DISPLAY = 'ENABLE_MODAL_DISPLAY';
export const DISABLE_MODAL_DISPLAY = 'DISABLE_MODAL_DISPLAY';
export const DISPLAY_GLOBAL_AUDIO_PLAYER = 'DISPLAY_GLOBAL_AUDIO_PLAYER';

export const enableModalDisplay = () => ({
  type: ENABLE_MODAL_DISPLAY
});

export const disableModalDisplay = () => ({
  type: DISABLE_MODAL_DISPLAY
});

export const displayGlobalAudioPlayer = () => ({
  type: DISPLAY_GLOBAL_AUDIO_PLAYER
})