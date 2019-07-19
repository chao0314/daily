import {assert} from "./utils";
import {exp} from "./expression";
import VNode from "./VNode";

// directive life hook function :init update destroy
export default {
    bind: {
        update(velement, {arg, value}) {
            assert(velement instanceof VNode && arg);
            let result = exp(value, velement.$root.$data);
            if (/value/.test(value)) velement.$el.value = result;
            else velement.$el.setAttribute(arg, result);

        }
    },
    on: {
        init(velement, {name, arg, value}) {
            assert(velement instanceof VNode && arg);
            if (/^[\$a-z_][\$\w]*$/i.test(value)) {
                value = `${value}($event)`;
            }
            //todo remove listener
            velement.$el.addEventListener(arg, function (e) {
                velement.$root.$staic.$event = e;
                exp(value, velement.$root.$data);
            }, false);

        }

    },
    cloak: {
        update(velement, {arg, value}) {
            assert(velement instanceof VNode);
            velement.$el.removeAttribute("v-cloak");
        }
    },
    show: {
        update({$el, $root}, {value}) {
            assert($el && $root);
            let result = exp(value, $root.$data);
            if (result) $el.style.display = '';
            else $el.style.display = 'none';
        }
    },
    "if": {
        init(velement) {
            velement._parent = velement.$el.parentElement;
            velement._holder = document.createComment("if holder");
        },
        update(velement, {value}) {
            let result = exp(value, velement.$root.$data);
            if (result && velement._holder.parentElement) {
                velement._parent.replaceChild(velement.$el, velement._holder);
            } else if (!result && velement.$el.parentElement) {
                velement._parent.replaceChild(velement._holder, velement.$el);
            }

        }

    },
    "else-if": {},
    "else": {},
    html: {
        update(velement, {value}) {
            assert(velement instanceof VNode);
            velement.$el.innerHTML = exp(value, velement.$root.$data);
        }
    },
    text: {
        update(velement, {value}) {
            assert(velement instanceof VNode);
            let oText = document.createTextNode(exp(value, velement.$root.$data));
            velement.$el.innerHTML = '';
            velement.$el.appendChild(oText);

        }
    }


}