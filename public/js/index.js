/* global anime */

/**
 * 
 * @param {HTMLElement} item 
 */
function onPropsMouseEnter(item) {
    item.addEventListener('mouseenter', () => {
        anime({
            targets: item.querySelectorAll('.cart-item-props>*:not(.cart-item-count)'),
            opacity: [0, 1],
            duration: 200,
            easing: 'easeInOutQuad'
        });
    });
    item.addEventListener('mouseleave', () => {
        anime({
            targets: item.querySelectorAll('.cart-item-props>*:not(.cart-item-count)'),
            opacity: [1, 0],
            duration: 200,
            easing: 'easeInOutQuad'
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cart-item').forEach(onPropsMouseEnter);
    anime({
        targets: null
    });
});