const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const script = fs.readFileSync(path.resolve(__dirname, './script.js'), 'utf8');
const { document } = new JSDOM(html, { runScripts: 'outside-only' }).window;
eval(script); 

const mockFormSubmit = jest.fn();
const mockCloseBtnClick = jest.fn();

document.getElementById = jest.fn((id) => {
    switch (id) {
        case 'taxForm':
            return {
                addEventListener: mockFormSubmit,
                querySelector: jest.fn(() => ({ addEventListener: mockCloseBtnClick }))
            };
        case 'modal':
            return { style: { display: 'block' } };
        case 'close':
            return { addEventListener: mockCloseBtnClick };
        case 'result':
            return { innerHTML: '' };
        default:
            return null;
    }
});

document.querySelectorAll = jest.fn((selector) => {
    if (selector === '.error-icon') {
        return [{ style: { display: 'none' } }];
    }
});


describe('Script', () => {
    test('Form submit event', () => {
        expect(mockFormSubmit).toHaveBeenCalled();
    });

});
