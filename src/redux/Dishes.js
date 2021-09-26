import {DISHES} from '../dishes'

export const Dishes = (state = DISHES, action) => {
	switch(action.type)
	{
		case'ADD_DISHES':
			return state;
		default:
			return state;
	}
}