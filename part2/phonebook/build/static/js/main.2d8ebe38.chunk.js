(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),l=t(13),u=t.n(l),o=(t(19),t(2)),c=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("br",null),r.a.createElement("hr",null))},i=function(e){var n=e.filter,t=e.handleFilterChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",null,r.a.createElement("label",{className:"text"},"Filter shown with:\xa0\xa0"),r.a.createElement("input",{value:n,onChange:t})))},m=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{style:{margin:8,padding:"8px 10px 12px 10px",color:"#281713",fontSize:16,fontFamily:"Arial sans-serif",border:"3px solid #C40000",borderRadius:4,background:"#D7BDBB"}},n)},s=function(e){var n=e.handleAddPerson,t=e.handlePersonChange,a=e.handleNumberChange,l=e.newNumber,u=e.newPerson;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h3",null,"Add a new:"),r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,r.a.createElement("label",null,"Name:\xa0\xa0"),r.a.createElement("input",{value:u,onChange:t})),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement("label",null,"Number:\xa0\xa0"),r.a.createElement("input",{value:l,onChange:a})),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Add Person"))))},d=function(e){var n=e.filteredPersons,t=e.handlePersonRemoval;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h3",null,"Numbers"),r.a.createElement("ul",null,n.map((function(e){var n="/".concat(e.id),a="#/".concat(e.id);return r.a.createElement("li",{key:e.name},r.a.createElement("p",{id:n},e.name),r.a.createElement("p",null,r.a.createElement("a",{href:a},e.number)),r.a.createElement("p",null,r.a.createElement("button",{onClick:t(e)},"delete")))}))))},f=t(3),h=t.n(f),b="/api/persons",E=function(e){return e.data},p=function(e){return h.a.post(b,e).then(E)},v=function(){return h.a.get(b).then(E)},g=function(e){return h.a.delete("".concat(b,"/").concat(e)).then(E)},w=function(e,n){return h.a.put("".concat(b,"/").concat(e),n).then(E)},C=function(e){return e.split("")[0].toUpperCase()+e.slice(1).toLowerCase()},O=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],l=n[1],u=Object(a.useState)(""),f=Object(o.a)(u,2),h=f[0],b=f[1],E=Object(a.useState)(""),O=Object(o.a)(E,2),j=O[0],k=O[1],P=Object(a.useState)(""),y=Object(o.a)(P,2),F=y[0],N=y[1],x=Object(a.useState)(null),S=Object(o.a)(x,2),A=S[0],L=S[1];Object(a.useEffect)((function(){v().then((function(e){return l(e)}))}),[]);var T=function(e){L("Oops an error occured while trying to save your data!"),setTimeout((function(){return L(null)}),5e3)},B=""===F?t:t.filter((function(e){return e.name.toLowerCase().includes(F)}));return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(m,{message:A}),r.a.createElement(i,{filter:F,handleFilterChange:function(e){var n=e.target.value.toLowerCase();N(n)}}),r.a.createElement(c,null),r.a.createElement(s,{handleAddPerson:function(e){e.preventDefault(),b(""),k("");var n=h.trim().split(" ").map(C).join(" "),a={name:n,number:j},r=t.find((function(e){return e.name.toLowerCase()===n.toLowerCase()}));if(r&&window.confirm("".concat(n," is already on phonebook, replace old number with new one?")))return w(r.id,a).then((function(e){l(t.map((function(n){return n.id===r.id?e:n}))),L("Number changed: ".concat(a.number)),setTimeout((function(){return L(null)}),5e3)})).catch((function(e){return T()}));return p(a).then((function(e){var n=t.concat(e);l(n),L("Added: ".concat(a.name)),setTimeout((function(){return L(null)}),5e3)})).catch((function(e){return T()}))},handleNumberChange:function(e){k(e.target.value)},handlePersonChange:function(e){b(e.target.value)},newNumber:j,newPerson:h}),r.a.createElement(c,null),r.a.createElement(d,{filteredPersons:B,handlePersonRemoval:function(e){return function(){window.confirm("Delete ".concat(e.name," from phonebook?"))&&g(e.id).then((function(n){l(t.filter((function(n){return n.id!==e.id}))),L("Removed: ".concat(e.name)),setTimeout((function(){return L(null)}),5e3)})).catch((function(n){L("Oops, looks like ".concat(e.name," is already removed from server!!")),setTimeout((function(){return L(null)}),5e3)}))}}}))};u.a.render(r.a.createElement(O,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.2d8ebe38.chunk.js.map