import {assert} from "./utils";
import {exp} from "./expression";
import {forParser} from "./parser";
import VNode from "./VNode";

// directive life hook function :init update destroy
export default {
    bind: {
        update(velement, {arg, value}) {
            assert(velement instanceof VNode && arg);
            let result = exp(value, velement.$context.$data);
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
                velement.$context.$staic.$event = e;
                exp(value, velement.$context.$data);
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
        update({$el, $context}, {value}) {
            assert($el && $context);
            let result = exp(value, $context.$data);
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
            let result = exp(value, velement.$context.$data);
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
            velement.$el.innerHTML = exp(value, velement.$context.$data);
        }
    },
    text: {
        update(velement, {value}) {
            assert(velement instanceof VNode);
            let oText = document.createTextNode(exp(value, velement.$context.$data));
            velement.$el.innerHTML = '';
            velement.$el.appendChild(oText);
        }
    },
    "for": {
        init(velement, directive) {
            //todo check now only v-for velement,can not handle vcomponent
            directive.meta.parent = velement.$el.parentElement;
            directive.meta.holder = document.createComment("for holder");
            directive.meta.tplVelement = velement;
            directive.meta.parent.replaceChild(directive.meta.holder, velement.$el);
            //todo
            directive.meta.realVelements = [];
            velement.render = function () {
                let {parent, holder, tplVelement, realVelements} = directive.meta;
                //todo remove child
                realVelements.forEach(elm => {
                    parent.removeChild(elm.$el);
                });
                realVelements.length = 0;
                let {iterator, item, index} = forParser(directive.value);
                iterator = exp(iterator, tplVelement.$$data);
                let fg = document.createDocumentFragment();
                if (Array.isArray(iterator)) {
                    for (let i = 0; i < iterator.length; i++) {
                        let element = tplVelement.clone();
                        element.$$data[item] = iterator[i];
                        element.$$data[index] = i;
                        realVelements.push(element);
                        fg.append(element.$el);
                    }
                }
                parent.insertBefore(fg, holder);
                realVelements.forEach(el => el.render());
            }
        },

    }


}