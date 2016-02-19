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

        it('moves the winner back to the entries stack', () => {
            const state = fromJS({
                vote: {
                    pair: ['ilya', 'libin'],
                    tally: {
                        'ilya': 4,
                        'libin': 2
                    },
                },
                entries: ['alexandrovich', 'shnizel', 'kartoshka']
            });

            const nextState = next(state);

            expect(nextState).to.equal(fromJS({
                vote: {
                    pair: ['alexandrovich', 'shnizel']
                },
                entries: ['kartoshka', 'ilya']
            }));
        });

        it('puts back from tire back to entries', () => {
            const state = fromJS({
                vote: {
                    pair: ['ilya', 'libin'],
                    tally: {
                        'ilya': 3,
                        'libin': 3
                    }
                },
                entries: ['alexandrovich', 'shnizel', 'kartoshka']
            });

            const nextState = next(state);

            expect(nextState).to.equal(fromJS({
                vote: {
                    pair: ['alexandrovich', 'shnizel']
                },
                entries: ['kartoshka', 'ilya', 'libin']
            }));
        });

        it('marks winner when just one entry left', () => {
            const state = fromJS({
                vote: {
                    pair: ['ilya', 'libin'],
                    tally: {
                        'ilya': 4,
                        'libin': 2
                    }
                },
                entries: []
            });

            const nextState = next(state);

            expect(nextState).to.equal(fromJS({
                winner: 'ilya'
            }));
        });
    });

    describe('vote', () => {
        it('creates a tally for the voted entry', () => {
            const state = Map({
                pair: List.of('Ilya', 'Libin')
            })

            const nextState = vote(state, 'Ilya');
            expect(nextState).to.equal(Map({
                pair: List.of('Ilya', 'Libin'),
                tally: Map({
                    'Ilya': 1
                })
            }));
        });

        it('adds score to the existing tally', () => {
            const state = Map({
                pair: List.of('Ilya', 'Libin'),
                tally: Map({
                    'Ilya': 3,
                    'Libin': 2
                })
            });

            const nextState = vote(state, 'Ilya');
            expect(nextState).to.equal(Map({
                pair: List.of('Ilya', 'Libin'),
                tally: Map({
                    'Ilya': 4,
                    'Libin': 2
                })
            }));
        });
    });
});


