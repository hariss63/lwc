/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const assert = require('assert');
describe('Delegates focus', () => {
    const URL = 'http://localhost:4567/delegate-focus-shift-tab-into-negative-tabindex';

    before(() => {
        browser.url(URL);
    });

    it('should focus the input when clicked', function() {
        browser.keys(['Tab']); // tab into first anchor
        browser.keys(['Tab']); // tab into second anchor
        browser.keys(['Tab']); // tab over integration-child
        browser.keys(['Shift', 'Tab', 'Shift']); // tab backwards over integration-child
        const active = browser.execute(function() {
            return document.querySelector(
                'integration-delegate-focus-shift-tab-into-negative-tabindex'
            ).shadowRoot.activeElement;
        });
        assert.equal(active.getText(), 'Anchor 2');
    });
});
