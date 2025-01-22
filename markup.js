/**
 * Markup.js has created for helping to transfer SEBLOD 3.x template to UIKit html
 * by Ilya A.Zhulin 2021
 * Last edition 22.01.2025
 */
document.addEventListener('DOMContentLoaded', function () {
    function replaceTag(element, newTag) {
        var elementNew = document.createElement(newTag);
        elementNew.innerHTML = element.innerHTML;
        Array.prototype.forEach.call(element.attributes, function (attr) {
            elementNew.setAttribute(attr.name, attr.value);
        });
        element.parentNode.insertBefore(elementNew, element);
        element.parentNode.removeChild(element);
        return elementNew;
    }
    /**
     * Копируем атрибуты с предыдущего блока
     */
    function copyAttrs(source, target, fieldName, currentIndex, prevIndex) {
        for (var i = 0, atts = source.attributes, n = atts.length; i < n; i++) {
            target.setAttribute(atts[i].nodeName, atts[i].value.replace(fieldName + '_' + prevIndex, fieldName + '_' + currentIndex).replace(fieldName + '[' + prevIndex + ']', fieldName + '[' + currentIndex + ']'));
        }
        return target;
    }
    let observer = new MutationObserver(mutations => {
        for (let mutation of mutations) {
// проверим новые узлы, есть ли что-то, что надо подсветить?
            for (let node of mutation.addedNodes) {
// отслеживаем только узлы-элементы, другие (текстовые) пропускаем
                if (!(node instanceof HTMLElement))
                    continue;
                // проверить, не является ли вставленный элемент примером кода
                if (node.matches('[class*="cck_form_group_x"]') || node.matches('.ui-sortable > div')) {
                    const
                            aside = (node.querySelector('aside')) ? node.querySelector('aside') : node.querySelector('.collection-group-button');
                    ;
                    let
                            prevEl = node.previousElementSibling
                            , wrapId = (node.getAttribute("id")) ? node.getAttribute("id") : node.querySelector("[id]").getAttribute("id")
                            , prevId = (prevEl.getAttribute("id")) ? prevEl.getAttribute("id") : prevEl.querySelector("[id]").getAttribute("id")
                            , fieldName = node.closest(".ui-sortable").parentNode.getAttribute("id").replace(/([^_]*)_(.*)/, "$2")
                            , re = new RegExp(String.raw`.*${fieldName}_+(\d*)`, "gm")
                            , currentIndex = wrapId.replace(re, "$1") * 1
                            , prevIndex = prevId.replace(re, "$1") * 1
                            , re2 = new RegExp(String.raw`\"([^"]*)${fieldName}(_+)${prevIndex}\"`, "g")
                            , vals = {}
                    ;
                    node.querySelectorAll("input, textarea, select").forEach((el) => {
                        vals[el.id] = el.value;
                    });
                    node.innerHTML = prevEl.innerHTML.replace(new RegExp(String.raw`${fieldName}(_+)${prevIndex}`, "g"), fieldName + "$1" + currentIndex);
                    node.querySelectorAll(".cck_forms.cck_upload_image").forEach((el) => {
                        el.remove()
                    });
                    node.querySelectorAll("input[type=file][onchange]").forEach((el) => {
                        el.removeAttribute('onchange');
                    });
                    for (let val in vals) {
                        if (node.querySelector('#' + val)) {
                            node.querySelector('#' + val).value = vals[val];
                        }
//                        else {
//                            console.log("Нет элемента #" + val);
//                        }
                    }
                    for (var i = 0, atts = prevEl.attributes, n = atts.length; i < n; i++) {
                        node.setAttribute(atts[i].nodeName, atts[i].value.replace(re2, "$1" + fieldName + "$2" + currentIndex).replace(fieldName + '[' + prevIndex + ']', fieldName + '[' + currentIndex + ']'));
                    }
                }
            }
        }
    }
    );
    observer.observe(document.documentElement, {
        childList: true, // наблюдать за непосредственными детьми
        subtree: true, // и более глубокими потомками
        characterDataOldValue: false // передавать старое значение в колбэк
    });
});