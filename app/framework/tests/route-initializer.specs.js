const expect = require('chai').expect;
const sinon = require('sinon');

describe.skip('RouteInitializer', () => {

    describe('fileFilter', ()=>{
        it('accepts files ending with -controller.js');
        it('rejects files not ending on -controller.js');
    });

    describe('buildRoutes', () => {
       it('calls constructor on models with route prefix');
       it('calls buildRoutes on controller instances');
    });
});
