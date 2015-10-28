describe('date format filter', function () {
    var filter;

    beforeEach(module('blipApp'));

    beforeEach(inject(function ($filter) {
        filter = $filter;
    }));

    it('should filter by beneficiary name', function () {
        expect(filter('dateFormat')('2015-10-28T18:16:07+02:00')).toBe('28th October 2015');
    });
});
