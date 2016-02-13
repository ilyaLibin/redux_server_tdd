import {expect} from 'chai'
import {List, Map} from 'immutable';

describe('immutability', () => {

    describe('a number', () => {
        function increment(currentState) {
            return currentState + 1;
        }

        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });
    });

    describe('A list', () => {
        function addMovie(currentState, movie) {
            return currentState.push(movie);
        }

        it('is immutable', () => {
            let state = List.of('ilya', 'libin');
            let nextState = addMovie(state, 'alexandrovich');

            expect(nextState).to.equal(List.of(
                'ilya',
                'libin',
                'alexandrovich'
            ));

            expect(state).to.equal(List.of(
                'ilya',
                'libin'
            ))
        });
    });

    describe('a tree', () => {
        function addMovie(currentState, movie) {
            return currentState.update('movies', movies => movies.push(movie));
        }

        it('is immutable', () => {
            let state = Map({
                movies: List.of('ilya', 'libin')
            });

            let nextState = addMovie(state, 'Sunshine');

            expect(nextState).to.equal(Map({
                movies: List.of('ilya', 'libin', 'Sunshine')
            }));

            expect(state).to.equal(Map({
                movies: List.of('ilya', 'libin')
            }))
        });
    })
});