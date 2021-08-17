/**
* Markup.js has created for helping to transfer SEBLOD 3.x template to UIKit html
* by Ilya A.Zhulin 2021
*/
let buttons = document.querySelectorAll("li.cck_button a.icon-plus");
        buttons.forEach((elem) => {
            elem.addEventListener('click', () => {
                setTimeout(function () {
                    parent = elem.closest(".ui-sortable");
                    // Кнопки добавить/удалить
                    parent.querySelectorAll('aside').forEach((aside) => {
                        points = aside.innerHTML.replace(/div/g, 'li');
                        points = points.replace(/<span/g, '<a href="#" onclick="return false"');
                        points = points.replace(/<\/span/g, '</a');
                        aside.outerHTML = '<ul class="uk-float-right uk-iconnav uk-margin-bottom">' + points + '</ul>';
                    })
                    parent.querySelectorAll('a.icon-plus:not([uk-icon]').forEach((iplus) => {
                        iplus.classList.add("uk-text-success");
                        iplus.setAttribute("uk-icon", "icon: plus-circle");
                    })
                    parent.querySelectorAll('a.icon-minus:not([uk-icon]').forEach((iminus) => {
                        iminus.classList.add("uk-text-danger");
                        iminus.setAttribute("uk-icon", "icon: minus-circle");
                    })
                    parent.querySelectorAll('a.icon-circle:not([uk-icon]').forEach((imove) => {
                        imove.classList.add("uk-text-primary");
                        imove.setAttribute("uk-icon", "icon: move");
                    })
                    parent.childNodes.forEach((child) => {
                        child.classList.add("uk-clearfix");
                        child.classList.add("uk-margin");
                    })
                    parent.querySelectorAll('.cck_cgx.cck_cgx_form:not(.uk-width-1-1)').forEach((wrapform) => {
                        wrapform.classList.add("uk-width-1-1");
                        wrapform.querySelectorAll('.cck_forms.cck_site').forEach((wrapfield) => {
                            FirstChild = wrapfield.firstElementChild;
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