import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";

document.addEventListener("DOMContentLoaded", () => {
	let preloadedState;
	if (window.currentUser) {
		preloadedState = {
			entities: {
				users: {
					[window.currentUser.profileUrl]: window.currentUser
				}
			},
			session: {
				currentUserUrl: window.currentUser.profileUrl
			},
			errors: {
				session: []
			}
		};
	}
	const store = configureStore(preloadedState);

	// TESTING
	window.getState = store.getState;

	const root = document.getElementById("root");
	ReactDOM.render(<Root store={store}/>, root);
})