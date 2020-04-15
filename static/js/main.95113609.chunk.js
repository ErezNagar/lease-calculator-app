(this["webpackJsonplease-calculator-app"]=this["webpackJsonplease-calculator-app"]||[]).push([[0],{104:function(e,t,a){e.exports=a(192)},109:function(e,t,a){},192:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(31),s=a.n(l),i=a(13),c=a(11),o=a(12),m=a(27),u=a(23),h=a(28),f=(a(109),a(197)),d=a(196),p=a(202),g=a(203),E=a(102),k=function(e){var t=e.show,a=e.fadeInOnly,l=e.isInline,s=e.children,i=Object(n.useState)(t),c=Object(E.a)(i,2),o=c[0],m=c[1];Object(n.useEffect)((function(){t&&m(!0)}),[t]);return o&&r.a.createElement("div",{className:l?"fade-inline":null,style:{animation:t?"fadeIn ".concat("500ms"):a?"none":"fadeOut ".concat("500ms")},onAnimationEnd:function(){t||m(!1)}},s)};k.defaultProps={fadeInOnly:!1,isInline:!1};var y=k,v=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(l)))).state={value:0,isNextDisabled:!0,show:!0,usePercentRV:!0,isRVField:"rv"===a.props.fieldName,isMSRPField:"msrp"===a.props.fieldName},a.handleChange=function(e){a.setState({value:e,isNextDisabled:!e})},a.handleKeyUp=function(e){27===e.keyCode&&a.handleClickBack(),39===e.keyCode&&a.handleClickNext()},a.handleClickBack=function(){a.setState({show:!1},(function(){setTimeout((function(){a.props.onClickBack()}),500)}))},a.handleClickNext=function(){a.state.isNextDisabled||a.setState({show:!1},(function(){setTimeout((function(){var e={field:a.props.fieldName,value:a.state.value};a.state.isRVField&&(e.isRVPercent=a.state.usePercentRV),a.props.onClickNext(e)}),500)}))},a.handleToggleRV=function(){a.setState({usePercentRV:!a.state.usePercentRV})},a.getPrefix=function(){return!a.state.isRVField||a.state.isRVField&&!a.state.usePercentRV?r.a.createElement("span",{style:{fontSize:"1.5em",marginRight:"10px"}},a.props.prefix):null},a.getSuffix=function(){return!a.state.isRVField||a.state.isRVField&&a.state.usePercentRV?r.a.createElement("span",{style:{fontSize:"1.5em",marginLeft:"10px"}},a.props.suffix):null},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"pageContainer"},r.a.createElement("div",{className:"section section--description flex-vertical-center"},r.a.createElement(y,{show:this.state.show},r.a.createElement("div",{className:"title"},this.props.title),r.a.createElement("div",{className:"description"},this.props.description))),r.a.createElement("div",{className:"section section--input"},r.a.createElement("div",{className:"sub-section-input flex-vertical-center"},r.a.createElement(y,{show:this.state.show},this.getPrefix(),r.a.createElement(f.a,{placeholder:this.props.placeholder,parser:this.props.parser,onChange:this.handleChange,onPressEnter:this.handleClickNext,onKeyUp:this.handleKeyUp,size:"large",type:"number",min:0,autoFocus:!0}),this.getSuffix(),this.state.isRVField&&r.a.createElement("span",{className:"padding-left"},r.a.createElement(d.a,{type:"primary",size:"large",onClick:this.handleToggleRV},this.state.usePercentRV?"Use Value":"Use %")))),r.a.createElement("div",{className:"sub-section-navigation"},r.a.createElement("div",{className:"button-container button-left"},r.a.createElement(d.a,{type:"primary",onClick:this.handleClickBack,disabled:this.state.isMSRPField},r.a.createElement(p.a,null),"Back")),r.a.createElement("div",{className:"button-container button-right"},r.a.createElement(d.a,{type:"primary",onClick:this.handleClickNext,disabled:this.state.isNextDisabled},"Next",r.a.createElement(g.a,null))))))}}]),t}(r.a.Component);v.defaultProps={description:null,placeholder:0,prefix:"$",suffix:"",parser:function(e){return e.replace(/\$\s?|(,*)/g,"")},onClickNext:function(){},onClickBack:function(){}};var x=function(e){return r.a.createElement(v,{title:"MSRP",description:"Manufacturer Suggested Retail Price. No one really pays the full MSRP of a vehicle, don't be the one that does.",fieldName:"msrp",onClickNext:e.onClickNext})};x.defaultProps={onClickNext:function(){},onClickBack:function(){}};var N=x,C=function(e){return r.a.createElement(v,{title:"Selling Price",description:"The negotiated price of the vehicle, not including dealer rebates and manufacturer incentives. Aim for a minimum of 10% off MSRP.",fieldName:"sellingPrice",onClickNext:e.onClickNext,onClickBack:e.onClickBack})};C.defaultProps={onClickNext:function(){},onClickBack:function(){}};var P=C,b=function(e){return r.a.createElement(v,{title:"Months",description:"The length of the lease. More than 36 is less than ideal since usually the manufacturer warranty is for 3 years.",fieldName:"months",placeholder:36,prefix:"",suffix:"",onClickNext:e.onClickNext,onClickBack:e.onClickBack})};b.defaultProps={onClickNext:function(){},onClickBack:function(){}};var w=b,R=a(204),S=function(e){var t=e.href;return r.a.createElement(d.a,{type:"link",target:"_blank",rel:"noopener noreferrer",href:t,className:"description-link"},"Read more",r.a.createElement(R.a,null))},V=function(e){return r.a.createElement(v,{title:"Money Factor",description:r.a.createElement(r.a.Fragment,null,r.a.createElement("span",null,"The interest rate on the deal. Same as APR, only using a decimel unit instead. The lower, the better."),r.a.createElement(S,{href:"http://bit.ly/LeaseMFRV"})),fieldName:"mf",placeholder:.00123,prefix:"",suffix:"",onClickNext:e.onClickNext,onClickBack:e.onClickBack})};V.defaultProps={onClickNext:function(){},onClickBack:function(){}};var T=V,M=function(e){return r.a.createElement(v,{title:"Residual Value",description:r.a.createElement(r.a.Fragment,null,r.a.createElement("span",null,"The value of the vehicle at the end of the lease. The higher, the better."),r.a.createElement(S,{href:"http://bit.ly/LeaseMFRV"})),fieldName:"rv",suffix:"%",onClickNext:e.onClickNext,onClickBack:e.onClickBack})};M.defaultProps={onClickNext:function(){},onClickBack:function(){}};var O=M,B=function(e){return r.a.createElement(v,{title:"Down Payment",description:r.a.createElement(r.a.Fragment,null,r.a.createElement("span",null,"Cash payment due at lease signing. Don't give away free money to the dealer. Never put a down payment."),r.a.createElement(S,{href:"http://bit.ly/LeaseDownPayment"})),fieldName:"downPayment",onClickNext:e.onClickNext,onClickBack:e.onClickBack})};B.defaultProps={onClickNext:function(){},onClickBack:function(){}};var F=B,D=function(e){return r.a.createElement(v,{title:"Rebates",description:"Total of dealer discounts and manufacturer incentives.",fieldName:"rebates",onClickNext:e.onClickNext,onClickBack:e.onClickBack})};D.defaultProps={onClickNext:function(){},onClickBack:function(){}};var j=D,z=function(e){return r.a.createElement(v,{title:"Fees",description:r.a.createElement(r.a.Fragment,null,r.a.createElement("span",null,"Total amount of fees: acquisition fee, dealer and government fees."),r.a.createElement(S,{href:"http://bit.ly/LeaseFees"})),fieldName:"totalFees",onClickNext:e.onClickNext,onClickBack:e.onClickBack})};z.defaultProps={onClickNext:function(){},onClickBack:function(){}};var I=z,L=function(e){return r.a.createElement(v,{title:"Sales Tax",description:"Your state's sales tax, if applicable.",fieldName:"salesTax",onClickNext:e.onClickNext,onClickBack:e.onClickBack,placeholder:6.25,prefix:"",suffix:"%",parser:function(e){return e.replace("%","")}})};L.defaultProps={onClickNext:function(){},onClickBack:function(){}};var $=L,A=a(193),_=a(198),U=a(200),K=a(194),Y=a(199),J=a(201),q=a(207),H=a(208),W=a(209),G=a(210),Q=a(211),X=a(93),Z=a.n(X),ee=function(){function e(){var t=this;Object(c.a)(this,e),this._MFToAPR=function(){return 2400*t.mf},this.getRVPercentage=function(){return Math.round(t.RVPercent)},this.getRVValue=function(){return Number.parseFloat(t.RVValue.toFixed(2))}}return Object(o.a)(e,[{key:"_validateData",value:function(){var e=["MSRP","Selling Price","Residual Value","Money Factor"];[this.msrp,this.sellingPrice,this.rv,this.mf].forEach((function(t,a){if(!t||0===t)throw new Error("Invalid Input: ".concat(e[a]))}))}},{key:"_calculateRV",value:function(){this.isRVPercent?(this.RVValue=this.msrp*(this.rv/100),this.RVPercent=this.rv):(this.RVValue=this.rv,this.RVPercent=this.rv/this.msrp*100)}},{key:"calculate",value:function(e){var t=e.msrp,a=e.sellingPrice,n=e.rv,r=e.isRVPercent,l=void 0===r||r,s=e.mf,i=e.leaseTerm,c=void 0===i?36:i,o=e.salesTax,m=void 0===o?0:o,u=e.totalFees,h=void 0===u?0:u,f=e.rebates,d=void 0===f?0:f,p=e.tradeIn,g=void 0===p?0:p,E=e.downPayment,k=void 0===E?0:E;this.msrp=t,this.sellingPrice=a,this.rv=n,this.isRVPercent=l,this.mf=s,this.leaseTerm=c,this.salesTax=m,this.totalFees=h,this.rebates=d,this.tradeIn=g,this.downPayment=k,this._validateData(),this._calculateRV();var y=this.sellingPrice+this.totalFees-(this.downPayment+this.rebates+this.tradeIn),v=(y-this.RVValue)/this.leaseTerm,x=(y+this.RVValue)*this.mf;this.apr=this._MFToAPR(),this.monthlyPaymentPreTax=v+x,this.monthlyPayment=this.monthlyPaymentPreTax*(1+this.salesTax/100)}},{key:"getMonthlyPaymentPreTax",value:function(){return Math.round(100*this.monthlyPaymentPreTax)/100}},{key:"getMonthlyPayment",value:function(){return Math.round(100*this.monthlyPayment)/100}},{key:"getDiscountOffMsrpPercentage",value:function(){var e=(this.msrp-this.sellingPrice)/this.msrp*100;return Math.round(100*e)/100}},{key:"getMonthlyPaymentToMsrpPercentage",value:function(){var e=this.monthlyPayment/this.msrp*100;return Math.round(100*e)/100}},{key:"getTotalLeaseCost",value:function(){return this.monthlyPayment*this.leaseTerm+this.totalFees}},{key:"getAPR",value:function(){return Math.round(100*this.apr)/100}}]),e}(),te=a(205),ae=a(206),ne=function(e){var t=e.text,a=e.isAboveThreshold;return e.isError?"-":r.a.createElement(r.a.Fragment,null,t,a?r.a.createElement(te.a,{twoToneColor:"#52c41a",className:"threshold-icon"}):r.a.createElement(ae.a,{twoToneColor:"#eb2f96",className:"threshold-icon"}))};ne.defaultProps={isAboveThreshold:!1,isError:!1};var re=ne,le=new ee,se=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={data:Object(i.a)({},a.props.data,{leaseTerm:a.props.data.months}),results:{},isLoading:!1,isShowData:!0,isError:!1},a.calculateLease=function(e){try{le.calculate(e)}catch(n){return}var t=le.getMonthlyPaymentToMsrpPercentage(),a=le.getDiscountOffMsrpPercentage();return{msrpPercentage:t,offMsrp:a,RVValue:le.getRVValue(),apr:le.getAPR(),totalCost:le.getTotalLeaseCost(),monthlyPaymentPreTax:le.getMonthlyPaymentPreTax(),monthlyPayment:le.getMonthlyPayment(),isMsrpPercentageThreshold:t<=1,isOffMsrpThreshold:a>=10}},a.handleChange=function(e,t){a.setState({isLoading:!0,isShowData:!1},(function(){a.debounce(e,t)}))},a.debounce=Z.a.debounce((function(e,t){var n=Object(i.a)({},a.state);n.data[t]=e,a.setState(n,(function(){var e=a.calculateLease(a.state.data);e?a.setState(Object(i.a)({},a.state,{results:Object(i.a)({},e),isShowData:!0,isLoading:!1,isError:!1})):a.setState({isError:!0,isLoading:!1})}))}),1e3),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this.calculateLease(this.props.data);this.setState({results:Object(i.a)({},e)})}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"pageContainer"},this.state.isLoading&&r.a.createElement("div",{className:"spinner"},r.a.createElement(A.a,{indicator:r.a.createElement(q.a,null)})),r.a.createElement("div",{className:"section section--description results flex-vertical-center"},r.a.createElement("div",{className:"monthly-payment desktop"},r.a.createElement("div",{className:"title"},"Monthly Payment"),r.a.createElement(y,{show:this.state.isShowData,fadeInOnly:!0},r.a.createElement("div",{className:"description"},this.state.isError?r.a.createElement("span",{className:"input-error"},"-"):r.a.createElement(_.a,{value:this.state.results.monthlyPayment,precision:2,prefix:"$",valueStyle:{color:"white",fontSize:40}}),r.a.createElement("div",{style:{marginTop:"25px"}},this.state.isError?"Something went wrong. Please try again.":"Here's your monthly payment. You can change the lease numbers on the right to see how they affect the payment.")),r.a.createElement("div",{className:"footer desktop"},r.a.createElement("div",{className:"footer-disclaimer desktop"},"This calculator is in beta version. Use for estimation purposes only. Let us know of you find any discrepancies, thanks!"),r.a.createElement(U.a,{size:"medium"},r.a.createElement(K.a,{className:"divider"}),r.a.createElement(d.a,{className:"footer-icon desktop",type:"link",href:"https://www.facebook.com/groups/1914738435321873",target:"_blank",rel:"noopener noreferrer"},r.a.createElement(H.a,null)),r.a.createElement(d.a,{className:"footer-icon desktop",type:"link",href:"https://www.facebook.com/groups/1914738435321873",target:"_blank",rel:"noopener noreferrer"},r.a.createElement(W.a,null)),r.a.createElement(d.a,{className:"footer-icon desktop",type:"link",href:"mailto: erez.nagar@gmail.com",target:"_blank",rel:"noopener noreferrer"},r.a.createElement(G.a,null)))))),r.a.createElement("div",{className:"monthly-payment mobile"},r.a.createElement("span",{className:"title"},"Monthly Payment:"),r.a.createElement(y,{show:this.state.isShowData,fadeInOnly:!0,isInline:!0},r.a.createElement("span",{className:"description"},this.state.isError?r.a.createElement("span",{className:"input-error"},"-"):r.a.createElement(_.a,{className:"inline",value:this.state.results.monthlyPayment,precision:2,prefix:"$",valueStyle:{color:"white",fontSize:20,fontWeight:"400"}}))))),r.a.createElement("div",{className:"section section--results"},r.a.createElement("div",{className:"interactive-desc mobile"},this.state.isError?"Something went wrong. Please try again.":"You can change the lease numbers to see how they affect the payment"),r.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},r.a.createElement(J.a,{span:10,className:"text-align-right"},"MSRP:"),r.a.createElement(J.a,{className:"text-align-left"},r.a.createElement(f.a,{defaultValue:this.props.data.msrp,formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")},onChange:function(t){return e.handleChange(t,"msrp")},onPressEnter:this.handleClick,size:"large"}))),r.a.createElement(Y.a,{gutter:[8,0],type:"flex",align:"middle"},r.a.createElement(J.a,{span:10,className:"text-align-right"},"Selling Price:"),r.a.createElement(J.a,{span:10,className:"text-align-left"},r.a.createElement(f.a,{defaultValue:this.props.data.sellingPrice,formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")},onChange:function(t){return e.handleChange(t,"sellingPrice")},onPressEnter:this.handleClick,size:"large"}))),r.a.createElement(Y.a,{gutter:[16,16],type:"flex",align:"middle"},r.a.createElement(J.a,{span:10}),r.a.createElement(J.a,null,r.a.createElement(y,{show:this.state.isShowData,fadeInOnly:!0},r.a.createElement(re,{text:"".concat(this.state.results.offMsrp,"% off MSRP"),isAboveThreshold:this.state.results.isOffMsrpThreshold,isError:this.state.isError})))),r.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},r.a.createElement(J.a,{span:10,className:"text-align-right"},"Months:"),r.a.createElement(J.a,{className:"text-align-left"},r.a.createElement(f.a,{defaultValue:this.props.data.months,onChange:function(t){return e.handleChange(t,"months")},onPressEnter:this.handleClick,size:"large"}))),r.a.createElement(Y.a,{gutter:[8,0],type:"flex",align:"middle"},r.a.createElement(J.a,{span:10,className:"text-align-right"},"Money Factor:"),r.a.createElement(J.a,{span:10,className:"text-align-left"},r.a.createElement(f.a,{defaultValue:this.props.data.mf,formatter:this.props.formatter,parser:this.props.parser,onChange:function(t){return e.handleChange(t,"mf")},onPressEnter:this.handleClick,size:"large"}))),r.a.createElement(Y.a,{gutter:[16,16],type:"flex",align:"middle"},r.a.createElement(J.a,{span:10}),r.a.createElement(J.a,null,r.a.createElement(y,{show:this.state.isShowData,fadeInOnly:!0},this.state.isError?"-":"".concat(this.state.results.apr,"% APR")))),r.a.createElement(Y.a,{gutter:[8,0],type:"flex",align:"middle"},r.a.createElement(J.a,{span:10,className:"text-align-right"},"Residual:"),r.a.createElement(J.a,{span:10,className:"text-align-left"},r.a.createElement(f.a,{defaultValue:this.props.data.rv,formatter:function(e){return"".concat(e,"%")},parser:function(e){return e.replace("%","")},onChange:function(t){return e.handleChange(t,"rv")},onPressEnter:this.handleClick,size:"large"}))),r.a.createElement(Y.a,{gutter:[16,16],type:"flex",align:"middle"},r.a.createElement(J.a,{span:10}),r.a.createElement(J.a,null,r.a.createElement(y,{show:this.state.isShowData,fadeInOnly:!0},this.state.isError?"-":"$".concat(this.state.results.RVValue)))),r.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},r.a.createElement(J.a,{span:10,className:"text-align-right"},"Down Payment:"),r.a.createElement(J.a,{span:10,className:"text-align-left"},r.a.createElement(f.a,{defaultValue:this.props.data.downPayment,formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")},onChange:function(t){return e.handleChange(t,"downPayment")},onPressEnter:this.handleClick,size:"large"}))),r.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},r.a.createElement(J.a,{span:10,className:"text-align-right"},"Rebates:"),r.a.createElement(J.a,{className:"text-align-left"},r.a.createElement(f.a,{defaultValue:this.props.data.rebates,formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")},onChange:function(t){return e.handleChange(t,"rebates")},onPressEnter:this.handleClick,size:"large"}))),r.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},r.a.createElement(J.a,{span:10,className:"text-align-right"},"Fees:"),r.a.createElement(J.a,{className:"text-align-left"},r.a.createElement(f.a,{defaultValue:this.props.data.totalFees,formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")},onChange:function(t){return e.handleChange(t,"totalFees")},onPressEnter:this.handleClick,size:"large"}))),r.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},r.a.createElement(J.a,{span:10,className:"text-align-right"},"Sales Tax:"),r.a.createElement(J.a,{className:"text-align-left"},r.a.createElement(f.a,{defaultValue:this.props.data.salesTax,formatter:function(e){return"".concat(e,"%")},parser:function(e){return e.replace("%","")},onChange:function(t){return e.handleChange(t,"salesTax")},onPressEnter:this.handleClick,size:"large"}))),r.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},r.a.createElement(J.a,{span:10,className:"text-align-right"},"Monthly Pre-Tax:"),r.a.createElement(J.a,{className:"text-align-left"},r.a.createElement(y,{show:this.state.isShowData,fadeInOnly:!0},this.state.isError?r.a.createElement("span",{className:"input-error"},"-"):r.a.createElement(_.a,{value:this.state.results.monthlyPaymentPreTax,precision:2,prefix:"$"})))),r.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},r.a.createElement(J.a,{span:10,className:"text-align-right"},"% of MSRP:"),r.a.createElement(J.a,{className:"text-align-left"},r.a.createElement(y,{show:this.state.isShowData,fadeInOnly:!0},r.a.createElement(r.a.Fragment,null,r.a.createElement(re,{text:"".concat(this.state.results.msrpPercentage,"%"),isAboveThreshold:this.state.results.isMsrpPercentageThreshold,isError:this.state.isError}),r.a.createElement("a",{href:"http://bit.ly/Lease1PercentRule",target:"_blank",rel:"noopener noreferrer"},r.a.createElement(Q.a,{className:"threshold-icon"})))))),r.a.createElement(Y.a,{gutter:[8,8],type:"flex",align:"middle"},r.a.createElement(J.a,{span:10,className:"text-align-right"},"Total Cost:"),r.a.createElement(J.a,{className:"text-align-left"},r.a.createElement(y,{show:this.state.isShowData,fadeInOnly:!0},this.state.isError?r.a.createElement("span",{className:"input-error"},"-"):r.a.createElement(_.a,{value:this.state.results.totalCost,precision:2,prefix:"$"}))))),r.a.createElement("div",{className:"footer mobile"},r.a.createElement("div",{className:"divider"},r.a.createElement(K.a,null)),r.a.createElement("div",{className:"footer-content"},r.a.createElement("div",{className:"footer-disclaimer mobile"},"This calculator is in beta version. Use for estimation purposes only. Let us know of you find any discrepancies, thanks!"),r.a.createElement(U.a,{size:"medium"},r.a.createElement(K.a,{className:"divider"}),r.a.createElement(d.a,{className:"footer-icon mobile",type:"link",href:"https://github.com/ErezNagar/lease-calcuator-app",target:"_blank",rel:"noopener noreferrer"},r.a.createElement(H.a,null)),r.a.createElement(d.a,{className:"footer-icon mobile",type:"link",href:"https://www.facebook.com/groups/1914738435321873",target:"_blank",rel:"noopener noreferrer"},r.a.createElement(W.a,null)),r.a.createElement(d.a,{className:"footer-icon mobile",type:"link",href:"mailto: erez.nagar@gmail.com",target:"_blank",rel:"noopener noreferrer"},r.a.createElement(G.a,null)))))))}}]),t}(r.a.Component);se.defaultProps={data:{downPayment:0,rebates:0,totalFees:0,salesTax:0}};var ie=a(195),ce=[N,P,w,T,O,F,j,I,$],oe=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={currentScreen:0,isLastScreen:!1,leaseData:{}},a.handleClickBack=function(){a.setState({currentScreen:a.state.currentScreen-1})},a.handleClickNext=function(e){var t=a.state.currentScreen,n=Object(i.a)({},a.state.leaseData);n[e.field]=e.value;var r=t+1===ce.length;r||(t+=1),a.setState({leaseData:n,isLastScreen:r,currentScreen:t})},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=ce[this.state.currentScreen];return this.state.isLastScreen?r.a.createElement(se,{data:this.state.leaseData}):r.a.createElement(r.a.Fragment,null,r.a.createElement(ie.a,{percent:this.state.currentScreen/ce.length*100,showInfo:!1,size:"small",className:"progress"}),r.a.createElement(e,{progress:this.state.currentScreen/ce.length,onClickNext:this.handleClickNext,onClickBack:this.handleClickBack}))}}]),t}(r.a.Component);s.a.render(r.a.createElement(oe,null),document.getElementById("root"))}},[[104,1,2]]]);
//# sourceMappingURL=main.95113609.chunk.js.map