/**
 * Markup.js has created for helping to transfer SEBLOD 3.x template to UIKit html
 * by Ilya A.Zhulin 2021
 * Last edition 10.05.2023
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
    let observer = new MutationObserver(mutations => {
        for (let mutation of mutations) {
            // проверим новые узлы, есть ли что-то, что надо подсветить?
            for (let node of mutation.addedNodes) {
                // отслеживаем только узлы-элементы, другие (текстовые) пропускаем
                if (!(node instanceof HTMLElement))
                    continue;
                // проверить, не является ли вставленный элемент примером кода
                if (node.matches('[class*="cck_form_group_x"]') || node.matches('.ui-sortable > div')) {
                    const aside = node.querySelector('aside');
                    if (aside) {
                        let points = aside.innerHTML.replace(/div/g, 'li');
                        points = points.replace(/<span/g, '<a href="#" ');
                        points = points.replace(/<\/span/g, '</a');
                        aside.outerHTML = '<ul class="uk-float-right uk-iconnav uk-margin-bottom">' + points + '</ul>';
                    }
                    let collection_wrap = node.querySelector('.collection-group-wrap:not([uk-grid]');
                    if (collection_wrap) {
                        collection_wrap.setAttribute("uk-grid", "");
                        collection_wrap.querySelector('.collection-group-form').classList.add("uk-width-expand");
                        // Кнопки
                        replaceTag(collection_wrap.querySelector('span.icon-minus'), 'a');
                        replaceTag(collection_wrap.querySelector('span.icon-plus'), 'a');
                        replaceTag(collection_wrap.querySelector('span.icon-circle'), 'a');
                        minus = collection_wrap.querySelector('.collection-group-button').querySelector('.button-del').innerHTML;
                        plus = collection_wrap.querySelector('.collection-group-button').querySelector('.button-add').innerHTML;
                        drag = collection_wrap.querySelector('.collection-group-button').querySelector('.button-drag').innerHTML;
//                        replaceTag(collection_wrap.querySelector('.collection-group-button'), 'ul');
                        collection_wrap.querySelector('.collection-group-button').classList.add("uk-iconnav", "uk-width-auto", "uk-padding", "uk-padding-remove-right");
                        collection_wrap.querySelector('.collection-group-button').classList.add();
                        collection_wrap.querySelector('.collection-group-button').innerHTML = '<div>' + minus + '</div><div>' + plus + '</div><div>' + drag + '</div>';
                        // File Upload
                        if (collection_wrap.querySelector('input[type="file"]')) {
                            const new_input = document.createElement('input');
                            new_input.classList.add("uk-input", "uk-with-1-1")
                            new_input.setAttribute('type', 'text');
                            new_input.setAttribute('placeholder', 'Выбрать');
                            new_input.setAttribute("disabled", "");
                            new_input.setAttribute("aria-label", "Custom controls");
                            collection_wrap.querySelector('input[type="file"]').after(new_input);
                            const input = collection_wrap.querySelector('input[type="file"]').parentElement.innerHTML;
                            collection_wrap.querySelector('.collection-group-form').innerHTML = '<div uk-grid><div uk-form-custom="target: true" class="uk-width-expand">' + input + '' + '</div></div>';
                        }
                    }
                    node.querySelector('.icon-plus').classList.add("uk-text-success");
                    node.querySelector('.icon-plus').setAttribute("uk-icon", "icon: plus-circle");
                    node.querySelector('.icon-plus').setAttribute("onclick", "return false;");
                    node.querySelector('.icon-minus').classList.add("uk-text-danger");
                    node.querySelector('.icon-minus').setAttribute("uk-icon", "icon: minus-circle");
                    node.querySelector('.icon-minus').setAttribute("onclick", "return false;");
                    node.querySelector('.icon-circle').classList.add("uk-text-primary");
                    node.querySelector('.icon-circle').setAttribute("uk-icon", "icon: move");
                    node.querySelector('.icon-circle').setAttribute("onclick", "return false;");
                    node.classList.add("uk-clearfix");
                    node.classList.add("uk-margin");
                    let wrapform = node.querySelector('.cck_cgx.cck_cgx_form:not(.uk-width-1-1)');
                    if (wrapform) {
                        wrapform.classList.add("uk-width-1-1");
                        wrapform.querySelectorAll('.cck_forms.cck_site').forEach((wrapfield) => {
                            let FirstChild = wrapfield.firstElementChild;
                            FirstChild.outerHTML = FirstChild.innerHTML;
                        });
                    } // Элементы форм
                    var fields = new Map([
                        ['input[type=text]', 'uk-input'],
                        ['select', 'uk-select'],
                        ['textarea', 'uk-textarea']
                    ]);
                    fields.forEach(function (key, value) {
                        node.querySelectorAll(value).forEach((el) => {
                            el.classList.add(key);
                            el.parentNode.classList.add("uk-form-controls");
                        });
                    })
                    // Labels
                    node.querySelectorAll('label:not(.uk-form-label)').forEach((el) => {
                        el.classList.add('uk-form-label');
                    });
                }
            }
        }

    });
    observer.observe(document.documentElement, {
        childList: true, // наблюдать за непосредственными детьми
        subtree: true, // и более глубокими потомками
        characterDataOldValue: false // передавать старое значение в колбэк
    });
});