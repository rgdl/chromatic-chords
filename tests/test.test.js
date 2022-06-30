import {
    AUG_TRIADS,
    MAJOR_CHORDS,
    MINOR_CHORDS,
    SEVENTH_LINKS,
    TRIAD_GROUPS,
} from '../js/chords';
import { DIATONIC_SCALES } from '../js/scales';

test('Scales contain expected chords', () => {
    expect(DIATONIC_SCALES['C'].contains(MAJOR_CHORDS['C']));
    expect(DIATONIC_SCALES['C'].contains(MAJOR_CHORDS['A']));
    expect(DIATONIC_SCALES['B'].contains(MAJOR_CHORDS['Gb']));
});

test('Augmented triads have expected distances', () => {
    expect(AUG_TRIADS['C'].distance(AUG_TRIADS['F'])).toBe(3);
    expect(AUG_TRIADS['F'].distance(AUG_TRIADS['D'])).toBe(3);
    expect(AUG_TRIADS['D'].distance(AUG_TRIADS['G'])).toBe(3);
    expect(AUG_TRIADS['G'].distance(AUG_TRIADS['C'])).toBe(3);

    expect(AUG_TRIADS['C'].distance(AUG_TRIADS['D'])).toBe(6);
    expect(AUG_TRIADS['F'].distance(AUG_TRIADS['G'])).toBe(6);
    expect(AUG_TRIADS['D'].distance(AUG_TRIADS['C'])).toBe(6);
    expect(AUG_TRIADS['G'].distance(AUG_TRIADS['F'])).toBe(6);
});

test('Diverse triads have expected distances', () => {
    expect(MAJOR_CHORDS['C'].distance(MINOR_CHORDS['E'])).toBe(1);
    expect(MAJOR_CHORDS['C'].distance(MAJOR_CHORDS['G'])).toBe(3);
    expect(MAJOR_CHORDS['E'].distance(AUG_TRIADS['C'])).toBe(1);
    expect(AUG_TRIADS['C'].distance(MAJOR_CHORDS['E'])).toBe(1);
});

test(
    'Major and minor triads are 1 semitone away from neighbouring augmented triads',
    () => {
        TRIAD_GROUPS.betweenCAndG[0].map(
            chord => expect(chord.distance(AUG_TRIADS['C'])).toBe(1)
        );
        TRIAD_GROUPS.betweenCAndG[1].map(
            chord => expect(chord.distance(AUG_TRIADS['G'])).toBe(1)
        );
        TRIAD_GROUPS.betweenGAndD[1].map(
            chord => expect(chord.distance(AUG_TRIADS['G'])).toBe(1)
        );
        TRIAD_GROUPS.betweenGAndD[0].map(
            chord => expect(chord.distance(AUG_TRIADS['D'])).toBe(1)
        );
        TRIAD_GROUPS.betweenDAndF[1].map(
            chord => expect(chord.distance(AUG_TRIADS['D'])).toBe(1)
        );
        TRIAD_GROUPS.betweenDAndF[0].map(
            chord => expect(chord.distance(AUG_TRIADS['F'])).toBe(1)
        );
        TRIAD_GROUPS.betweenFAndC[0].map(
            chord => expect(chord.distance(AUG_TRIADS['F'])).toBe(1)
        );
        TRIAD_GROUPS.betweenFAndC[1].map(
            chord => expect(chord.distance(AUG_TRIADS['C'])).toBe(1)
        );
    }
);

test('Seventh links have expected distances', () => {
    Object.keys(SEVENTH_LINKS).map(
        group => SEVENTH_LINKS[group].map(
            pair => {
                expect(pair.length).toBe(2);
                expect(pair[0].distance(pair[1])).toBe(1);
            }
        )
    )
});
