import { Component } from "react";
import { DISHES } from "../dishes";
import { COMMENTS } from "../comments";
import { LEADERS } from "../leaders";
import { PROMOTIONS } from "../promotions";

export const initialState = {
	dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS,
    selectedDish: null,
}

export const Reducer = (state=initialState, action) => {
	return state;
}