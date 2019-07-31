import {assert} from "./utils";
import {exp} from "./expression";
import {forParser} from "./parser";
import VNode from "./VNode";

// directive life hook function :init update destroy
export default {
    bind: {
        update(velement, directive) {
            assert(velement instanceof VNode && directive);
            let {arg, value, meta} = directive;
            let result = exp(value, velement.$data);
            if (meta._oldValue !== result) {
                if (/value/.test(value)) velement.$el.value = result;
                else velement.$el.setAttribute(arg, result);
                directive.meta._oldValue = result;
            }


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
                velement.$context.$static.$event = e;
                exp(value, velement.$data);
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
                let {parent, holder, tplVelement, _lastVelements = [], _lastIterator = []} = directive.meta;
                //todo remove child
                _lastVelements.forEach(elm => {
                    parent.removeChild(elm.$el);
                });
                let {iterator, item, index} = forParser(directive.value);
                let fg = document.createDocumentFragment();
                iterator = exp(iterator, tplVelement.$data);
                let realVelements = Array(iterator.length);
                //todo only array at present
                if (Array.isArray(iterator)) {
                    for (let i = 0; i < iterator.length; i++) {
                        let n = _lastIterator.findIndex(v => iterator[i] === v);
                        if (n !== -1) {
                            realVelements[i] = _lastVelements[n];
                            _lastVelements.splice(n, 1);
                            _lastIterator.splice(n, 1);
                        } else
                            realVelements[i] = null;

                    }
                    realVelements = realVelements.map((v, i) => {
                        if (!v) {
                            if (_lastVelements.length > 0) v = _lastVelements.pop();
                            else v = tplVelement.clone();
                        }
                        v._set(item, iterator[i]);
                        v._set(index, i);
                        fg.append(v.$el);
                        return v;
                    })

                }
                directive.meta._lastIterator = [...iterator];
                directive.meta._lastVelements = [...realVelements];
                parent.insertBefore(fg, holder);
                realVelements.forEach(el => el.render());
            }
        },

    }


}

