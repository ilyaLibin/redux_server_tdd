import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
    describe('setEntries', () => {
        it('adds the entries to the state', () => {
            const state = Map();
            const entries = List.of('ilya', 'libin');
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('ilya', 'libin')
            }));
        });

        it('converts to immutable', () => {
            const state = Map();
            const entries = ['ilya', 'libin'];
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of('ilya', 'libin')
            }));
        });
    });

    describe('next', () => {
        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('ilya', 'libin', 'alexandrovich')
            });
            const nextState = next(state);
            expect(nextState).to.equal(fromJS({
                vote: {
                    pair: ['ilya', 'libin']
                },
                entries: ['alexandrovich']
            }));
        });
    });

    describe('vote', () => {
        it('creates a tally for the movie', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Ilya', 'Libin')
                }),
                entries: List()
            })

            const nextState = vote(state, 'Ilya');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Ilya', 'Libin'),
                    tally: Map({
                        'Ilya': 1
                    })
                }),
                entries: List()
            }));
        });

        it('ads score to the existing tally', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Ilya', 'Libin'),
                    tally: Map({
                        'Ilya': 3,
                        'Libin': 4
                    }),
                    entries: List()
                })
            });

            const nextState = vote(state, 'Ilya');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Ilya', 'Libin'),
                    tally: Map({
                        'Ilya': 4,
                        'Libin': 4
                    }),
                    entries: List() 
                })
            }));
        });
    })
});


