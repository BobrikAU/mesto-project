(()=>{"use strict";var t={urlCohort:"https://mesto.nomoreparties.co/v1/plus-cohort-9",token:"7f8d2163-5607-4805-9bb9-bec28100308e"},e="popup_opened",o="photos__item",n="button__icon-like_aktive",c="photos__photo",r="photos__caption",a="button__icon-like",u="button_function_trash",i="photos__nummer-likes",l="popup__input-text_error",s="popup__input-error",p="popup__input-text",d="popup__submit_disabled",_="popup__form",f="popup__submit",h=document.querySelector(".".concat("popup_photo")),m=h.querySelector(".".concat("popup__photo")),v=h.querySelector(".".concat("popup__title_photo")),y=document.querySelector(".".concat("photos__list")),S=document.querySelector("#empty-item").content,b=document.querySelector(".".concat("profile__title")),q=document.querySelector(".".concat("profile__subtitle")),k=document.querySelector(".".concat("profile__avatar")),C=document.querySelector(".".concat("popup__edit-profile")),x=C.querySelector(".".concat("popup__name-field")),g=C.querySelector(".".concat("popup__field-yourself")),E=C.querySelector(".".concat(f)),L=document.querySelector(".".concat("popup__edit-avatar")),T=L.querySelector(".".concat(f)),A=L.querySelector(".".concat("popup__input-text"));function P(t,e,o,n){t.querySelectorAll(".".concat(e)).forEach((function(t){t.textContent=""})),t.querySelectorAll(".".concat(o)).forEach((function(t){t.classList.remove(n)}))}var D=function(t,e){t.classList.add(e),t.setAttribute("disabled","yes")};function z(t){document.removeEventListener("keydown",w),t.classList.remove(e)}function w(t){"Escape"===t.key&&z(document.querySelector(".".concat(e)))}function I(t){t.classList.add(e),document.addEventListener("keydown",w)}var j,B,N,O,J,F,H=function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))},M=fetch("".concat(t.urlCohort,"/users/me"),{headers:{authorization:t.token}}).then(H),U=fetch("".concat(t.urlCohort,"/cards"),{headers:{authorization:t.token}}).then(H);function G(e,l,s,p,d,_,f){var y=S.cloneNode(!0),b=y.querySelector(".".concat(c));b.src=s,b.alt=l,y.querySelector(".".concat(i)).textContent=_,y.querySelector(".".concat(r)).textContent=e;var q=y.querySelector(".".concat(o));q.setAttribute("owners_id",p),q.setAttribute("card_id",d);var k=y.querySelector(".".concat(a));if(f&&k.classList.add(f),k.addEventListener("click",(function(e){!function(e){var c=e.target,r="PUT";c.classList.contains("".concat(n))&&(r="DELETE");var a=e.target.closest(".".concat(o));(function(e,o){return fetch("".concat(t.urlCohort,"/cards/likes/").concat(e.getAttribute("card_id")),{method:o,headers:{authorization:t.token}}).then(H)})(a,r).then((function(t){c.classList.toggle("".concat(n)),a.querySelector(".".concat(i)).textContent=t.likes.length})).catch((function(t){console.log(t)}))}(e)})),b.addEventListener("click",(function(t){!function(t,e){var o=t.target.src,n=t.target.alt;m.src=o,m.alt=n,v.textContent=e,I(h)}(t,e)})),q.getAttribute("owners_id")===t.id){var C=y.querySelector(".".concat(u));C.classList.remove("button_hidden"),C.addEventListener("click",(function(e){!function(e){var n,c=e.target.closest(".".concat(o));(n=c,fetch("".concat(t.urlCohort,"/cards/").concat(n.getAttribute("card_id")),{method:"DELETE",headers:{authorization:t.token}}).then(H)).then((function(){c.remove()})).catch((function(t){console.log(t)}))}(e)}))}return y}function K(t){y.prepend(t)}Promise.all([M,U]).then((function(e){var o;o=e[0],b.textContent=o.name,t.id=o._id,q.textContent=o.about,k.src=o.avatar,k.alt="аватар ".concat(o.name),e[1].forEach((function(e){var o=e.link,n="Изображение ".concat(e.name),c=e.name,r=e.owner._id,a=e.likes.length,u=e._id,i=void 0;e.likes.some((function(e){return e._id===t.id}))&&(i="".concat("button__icon-like_aktive")),K(G(c,n,o,r,u,a,i))}))})).catch((function(t){b.textContent="string"==typeof t?t:"Что-то не так",q.textContent="Попробуйте перезагрузить страницу"})),document.querySelector(".".concat("profile__edit-button")).addEventListener("click",(function(){x.value=b.textContent,g.value=q.textContent,D(E,d),P(C,s,p,l),I(C)})),C.querySelector(".".concat(_)).addEventListener("submit",(function(e){!function(e){var o,n;e.preventDefault(),E.textContent="Сохранение...",(o=x.value,n=g.value,fetch("".concat(t.urlCohort,"/users/me"),{method:"PATCH",headers:{authorization:t.token,"Content-Type":"application/json"},body:JSON.stringify({name:o,about:n})}).then(H)).then((function(t){b.textContent=t.name,q.textContent=t.about,z(C)})).catch((function(t){console.log(t)})).finally((function(){E.textContent="Сохранить"}))}(e)})),j=document.querySelector(".".concat("profile__add-button")),B=document.querySelector(".".concat("popup__add-card")),N=B.querySelector(".".concat("popup__submit")),O=B.querySelector(".".concat(_)),j.addEventListener("click",(function(){D(N,d),O.reset(),P(B,s,p,l),I(B)})),function(e,o,n){o.addEventListener("submit",(function(c){!function(e,o,n,c){var r,a;e.preventDefault(),c.textContent="Сохранение...",(r=n.title.value,a=n.link.value,fetch("".concat(t.urlCohort,"/cards"),{method:"POST",headers:{authorization:t.token,"Content-Type":"application/json"},body:JSON.stringify({name:r,link:a})}).then(H)).then((function(t){K(G(t.name,"Изображение ".concat(t.name),t.link,t.owner._id,t._id,t.likes.length)),z(o)})).catch((function(t){console.log(t)})).finally((function(){c.textContent="Сохранить"}))}(c,e,o,n)}))}(B,O,N),document.querySelectorAll(".".concat("popup")).forEach((function(t){t.addEventListener("click",(function(t){!function(t){(t.target===t.currentTarget||t.target.classList.contains("".concat("button__icon-close")))&&z(t.currentTarget)}(t)}))})),document.querySelector(".".concat("profile__avatar-container")).addEventListener("click",(function(){var t=L.querySelector(".".concat(_));D(T,d),t.reset(),P(L,s,p,l),I(L)})),L.querySelector(".".concat(_)).addEventListener("submit",(function(e){var o;e.preventDefault(),T.textContent="Сохранение...",(o=A.value,fetch("".concat(t.urlCohort,"/users/me/avatar"),{method:"PATCH",headers:{authorization:t.token,"Content-Type":"application/json"},body:JSON.stringify({avatar:o})}).then(H)).then((function(t){k.src=t.avatar,k.onload=z(L)})).catch((function(t){console.log(t)})).finally((function(){T.textContent="Сохранить"}))})),J={classInputTextError:"popup__input-text_error",classInputTextPopups:"popup__input-text",classButtonSubmitDisabled:"popup__submit_disabled",classFromPopup:"popup__form",classButtonSubmit:"popup__submit"},F=function(t){var e=t.target,o=t.target.closest(".".concat(J.classFromPopup)),n=o.querySelector(".popup__input-error-".concat(e.name)),c=o.querySelector(".".concat(J.classButtonSubmit));e.validity.valid?(function(t,e){t.classList.remove(J.classInputTextError),e.textContent=""}(e,n),function(t,e){Array.from(t.querySelectorAll(".".concat(J.classInputTextPopups))).every((function(t){return t.validity.valid}))&&(e.classList.remove(J.classButtonSubmitDisabled),e.removeAttribute("disabled"))}(o,c)):(function(t,e){t.classList.add(J.classInputTextError);var o=t.validationMessage;e.textContent=o}(e,n),D(c,J.classButtonSubmitDisabled))},document.querySelectorAll(".".concat(J.classInputTextPopups)).forEach((function(t){t.addEventListener("input",F)}))})();