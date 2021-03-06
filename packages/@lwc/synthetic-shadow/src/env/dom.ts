/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { getOwnPropertyDescriptor } from '../shared/language';

const ShadowRootHostGetter: (this: ShadowRoot) => Element | null =
    typeof (window as any).ShadowRoot !== 'undefined'
        ? getOwnPropertyDescriptor((window as any).ShadowRoot.prototype, 'host')!.get!
        : () => {
              throw new Error('Internal Error: Missing ShadowRoot');
          };

const dispatchEvent =
    'EventTarget' in window ? EventTarget.prototype.dispatchEvent : Node.prototype.dispatchEvent; // IE11

const isNativeShadowRootAvailable = typeof (window as any).ShadowRoot !== 'undefined';

const eventTargetGetter: (this: Event) => EventTarget = getOwnPropertyDescriptor(
    Event.prototype,
    'target'
)!.get!;

const eventCurrentTargetGetter: (this: Event) => EventTarget | null = getOwnPropertyDescriptor(
    Event.prototype,
    'currentTarget'
)!.get!;

const focusEventRelatedTargetGetter: (
    this: FocusEvent
) => EventTarget | null = getOwnPropertyDescriptor(FocusEvent.prototype, 'relatedTarget')!.get!;

export {
    dispatchEvent,
    ShadowRootHostGetter,
    isNativeShadowRootAvailable,
    eventTargetGetter,
    eventCurrentTargetGetter,
    focusEventRelatedTargetGetter,
};
