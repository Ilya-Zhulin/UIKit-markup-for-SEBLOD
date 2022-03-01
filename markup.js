/**
 * Markup.js has created for helping to transfer SEBLOD 3.x template to UIKit html
 * by Ilya A.Zhulin 2021
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
    let parents = document.querySelectorAll(".ui-sortable");
    parents.forEach((parent) => {
        parent.addEventListener('click', function (event) {
            if (event.target.parentNode.tagName == 'svg') {
                svg = event.target.parentNode;
                if (!svg.parentNode.classList.contains('icon-plus')) {
                    return false;
                }
            }
            if (event.target.parentNode.tagName == 'a') {
                a = event.target.parentNode;
                if (!a.classList.contains('icon-plus')) {
                    return false;
                }
            }
            setTimeout(function () {
                // Кнfопки добавить/удалить
                parent.querySelectorAll('aside').forEach((aside) => {
                    let points = aside.innerHTML.replace(/div/g, 'li');
                    points = points.replace(/<span/g, '<a href="#" onclick="return false"');
                    points = points.replace(/<\/span/g, '</a');
                    aside.outerHTML = '<ul class="uk-float-right uk-iconnav uk-margin-bottom">' + points + '</ul>';
                })
                parent.querySelectorAll('.collection-group-wrap:not([uk-grid]').forEach((iplus) => {
                    iplus.setAttribute("uk-grid", "");
                    iplus.querySelector('.collection-group-form').classList.add("uk-width-expand");
                    // Кнопки
                    replaceTag(iplus.querySelector('span.icon-minus'), 'a');
                    replaceTag(iplus.querySelector('span.icon-plus'), 'a');
                    replaceTag(iplus.querySelector('span.icon-circle'), 'a');
                    minus = iplus.querySelector('.collection-group-button').querySelector('.button-del').innerHTML;
                    plus = iplus.querySelector('.collection-group-button').querySelector('.button-add').innerHTML;
                    drag = iplus.querySelector('.collection-group-button').querySelector('.button-drag').innerHTML;
                    replaceTag(iplus.querySelector('.collection-group-button'), 'ul');
                    iplus.querySelector('.collection-group-button').classList.add("uk-iconnav");
                    iplus.querySelector('.collection-group-button').classList.add("uk-width-auto");
                    iplus.querySelector('.collection-group-button').innerHTML = '<li>' + minus + '</li><li>' + plus + '</li><li>' + drag + '</li>';
                    // File Upload
                    input = iplus.querySelector('input[type="file"]').outerHTML;
                    iplus.querySelector('.collection-group-form').innerHTML = '<div uk-form-custom="target: true" class="uk-width-expand">' + input + '<input class="uk-input uk-width-1-1" type="text" placeholder="Выбрать" disabled>' + '</div>';
                });
                parent.querySelectorAll('a.icon-plus:not([uk-icon]').forEach((iplus) => {
                    iplus.classList.add("uk-text-success");
                    iplus.setAttribute("uk-icon", "icon: plus-circle");
                })
                parent.querySelectorAll('span.icon-minus:not([uk-icon]').forEach((iminus) => {
                    iminus.classList.add("uk-text-danger");
                    iminus.setAttribute("uk-icon", "icon: minus-circle");
                })
                parent.querySelectorAll('a.icon-minus:not([uk-icon], span.icon-minus:not([uk-icon]').forEach((iminus) => {
                    iminus.classList.add("uk-text-danger");
                    iminus.setAttribute("uk-icon", "icon: minus-circle");
                })
                parent.querySelectorAll('a.icon-circle:not([uk-icon], span.icon-circle:not([uk-icon]').forEach((imove) => {
                    imove.classList.add("uk-text-primary");
                    imove.setAttribute("uk-icon", "icon: move");
                })
                parent.querySelectorAll('span.icon-circle:not([uk-icon]').forEach((imove) => {
                    imove.classList.add("uk-text-primary");
                    imove.setAttribute("uk-icon", "icon: move");
                })
                parent.querySelectorAll('span.icon-plus:not([uk-icon]').forEach((imove) => {
                    imove.classList.add("uk-text-success");
                    imove.setAttribute("uk-icon", "icon: plus-circle");
                })
                parent.childNodes.forEach((child) => {
                    child.classList.add("uk-clearfix");
                    child.classList.add("uk-margin");
                })
                parent.querySelectorAll('.cck_cgx.cck_cgx_form:not(.uk-width-1-1)').forEach((wrapform) => {
                    wrapform.classList.add("uk-width-1-1");
                    wrapform.querySelectorAll('.cck_forms.cck_site').forEach((wrapfield) => {
                        let FirstChild = wrapfield.firstElementChild;
                        FirstChild.outerHTML = FirstChild.innerHTML;
                    });
                })
                // Элементы форм
                var fields = new Map([
                    ['input[type=text]', 'uk-input'],
                    ['select', 'uk-select'],
                    ['textarea', 'uk-textarea']
                ]);
                fields.forEach(function (key, value) {
                    parent.querySelectorAll(value).forEach((el) => {
                        el.classList.add(key);
                        el.parentNode.classList.add("uk-form-controls");
                    });
                })
                // Labels
                parent.querySelectorAll('label:not(.uk-form-label)').forEach((el) => {
                    el.classList.add('uk-form-label');
                });
            }, 100);
        });
    });
});