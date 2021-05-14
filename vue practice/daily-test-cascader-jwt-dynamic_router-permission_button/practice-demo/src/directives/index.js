const clickOut = {
    inserted(el, binding) {
        el._listener = function (e) {
            if (!el.contains(e.target)) binding.value();

        };
        document.addEventListener('click', el._listener);
    },
    unbind(el) {
        document.removeEventListener('click', el._listener);
    }
};

export default {
    "click-out": clickOut
}